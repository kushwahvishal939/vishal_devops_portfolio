'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/homepage', icon: 'HomeIcon' },
    { name: 'About', href: '/about', icon: 'UserIcon' },
    { name: 'Skills', href: '/skills', icon: 'CogIcon' },
    { name: 'Experience', href: '/experience', icon: 'BriefcaseIcon' },
    { name: 'Portfolio', href: '/portfolio', icon: 'FolderIcon' },
  ];

  const moreItems = [{ name: 'Contact', href: '/contact', icon: 'EnvelopeIcon' }];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-premium'
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/homepage"
            className="flex items-center space-x-3 group transition-smooth focus-ring rounded-lg"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center transform-3d group-hover:scale-110 transition-smooth">
                <span className="text-background font-bold text-lg font-mono">V</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-smooth"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient">Vishal</h1>
              <p className="text-xs text-muted-foreground font-mono">DevOps Portfolio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-smooth focus-ring group ${
                  isActiveRoute(item.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    name={item.icon as any}
                    size={16}
                    className={`transition-smooth ${
                      isActiveRoute(item.href) ? 'text-accent' : 'group-hover:text-foreground'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActiveRoute(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full"></div>
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth focus-ring flex items-center space-x-2"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Icon name="EllipsisHorizontalIcon" size={16} />
                <span>More</span>
              </button>

              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-premium-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                        isActiveRoute(item.href)
                          ? 'text-accent bg-accent/10'
                          : 'text-popover-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={item.icon as any} size={16} />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-sm transition-smooth hover:shadow-neon focus-ring magnetic-hover"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth focus-ring"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {[...navigationItems, ...moreItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActiveRoute(item.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-border">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-sm transition-smooth hover:shadow-neon"
              >
                Hire Me
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
