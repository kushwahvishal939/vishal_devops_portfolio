'use client';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  return (
    <div className={`inline-block ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
