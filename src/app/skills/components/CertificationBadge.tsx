import Icon from '@/components/ui/AppIcon';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  badgeIcon: string;
  status: 'active' | 'expired' | 'pending';
}

interface CertificationBadgeProps {
  certification: Certification;
}

export default function CertificationBadge({ certification }: CertificationBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'from-success to-success/80';
      case 'expired':
        return 'from-error to-error/80';
      case 'pending':
        return 'from-warning to-warning/80';
      default:
        return 'from-muted to-muted/80';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="glass-card p-4 hover:shadow-premium transition-smooth magnetic-hover group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-lg">{certification.badgeIcon}</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm group-hover:text-accent transition-smooth">
              {certification.name}
            </h4>
            <p className="text-xs text-muted-foreground">{certification.issuer}</p>
          </div>
        </div>

        <div
          className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(certification.status)}`}
        >
          {getStatusText(certification.status)}
        </div>
      </div>

      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Issued:</span>
          <span className="font-mono">{certification.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>ID:</span>
          <span className="font-mono text-accent">{certification.credentialId}</span>
        </div>
      </div>

      <a
        href={certification.verificationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 mt-3 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-xs font-medium transition-smooth focus-ring"
      >
        <Icon name="CheckBadgeIcon" size={14} />
        <span>Verify</span>
        <Icon name="ArrowTopRightOnSquareIcon" size={12} />
      </a>
    </div>
  );
}
