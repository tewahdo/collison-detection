import { AlertTriangle, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Submission } from '@/types/submission';
import { useLanguage } from '@/i18n/LanguageContext';

interface Props {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'approved') return <CheckCircle className="h-4 w-4 text-approved" />;
  if (status === 'rejected') return <XCircle className="h-4 w-4 text-rejected" />;
  return <Clock className="h-4 w-4 text-pending" />;
}

export default function SubmissionDetailDialog({ submission, open, onClose }: Props) {
  const { t } = useLanguage();
  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {submission.sectorName}
          </DialogTitle>
          <DialogDescription>
            {t('detail.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {submission.hasCollision && submission.collisionDetails && (
            <div className="rounded-md bg-collision/10 border border-collision/20 p-3 text-sm text-collision">
              <AlertTriangle className="h-4 w-4 inline mr-1.5" />
              <strong>{t('manager.collision.details')}:</strong> {submission.collisionDetails}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">{t('manager.field.type')}:</span>{' '}
              <span className="capitalize font-medium">{t(`sector.${submission.sectorType}`)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('manager.field.status')}:</span>{' '}
              <span className="inline-flex items-center gap-1">
                <StatusIcon status={submission.status} />
                {t(`status.${submission.status}`)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('manager.field.submitted')}:</span>{' '}
              <span className="font-medium">{new Date(submission.submittedAt).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{t('manager.field.points')}:</span>{' '}
              <span className="font-medium">{submission.coordinates.length}</span>
            </div>
          </div>

          {submission.coordinates.length > 0 && (
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">{t('form.coordinates')}:</span>
              <div className="bg-muted/50 rounded-md p-2 max-h-32 overflow-y-auto">
                {submission.coordinates.map((c, i) => (
                  <div key={i} className="text-xs font-mono text-foreground">
                    #{i + 1}: {c.lat.toFixed(6)}, {c.lng.toFixed(6)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {submission.managerMessage && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <strong>{t('manager.field.prev.message')}:</strong> {submission.managerMessage}
            </div>
          )}

          {submission.hasCollision && (
            <div className="rounded-md bg-destructive/5 border border-destructive/10 p-3 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 inline mr-1.5 text-collision" />
              {t('detail.collision.note')}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
