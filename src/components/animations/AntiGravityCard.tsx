'use client';

interface AntiGravityCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function AntiGravityCard({
  children,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: AntiGravityCardProps) {
  return (
    <div
      className={`terminal-card ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
