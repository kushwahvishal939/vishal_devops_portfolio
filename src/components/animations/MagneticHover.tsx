'use client';

interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticHover({ children, className = '' }: MagneticHoverProps) {
  return <div className={className}>{children}</div>;
}
