import { useState } from 'react';
import { Sparkles, Loader2, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Submission, SectorType } from '@/types/submission';
import { toast } from 'sonner';

const SECTOR_TYPES: SectorType[] = ['airport', 'asphalt', 'railway', 'pipeline', 'powerline', 'building', 'other'];

interface Props {
  submissions: Submission[];
}

export default function AILocationRecommendation({ submissions }: Props) {
  const { t } = useLanguage();
  const [sectorType, setSectorType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleRecommend = async () => {
    setLoading(true);
    setRecommendation(null);
    try {
      const { data, error } = await supabase.functions.invoke('ai-recommend-location', {
        body: {
          sectorType: sectorType || undefined,
          coordinates: null,
        },
      });

      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setRecommendation(data.recommendation);
    } catch (err: any) {
      toast.error(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          {t('ai.title')}
        </CardTitle>
        <CardDescription>{t('ai.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 space-y-1.5">
            <Label>{t('form.type')}</Label>
            <Select value={sectorType} onValueChange={setSectorType}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.type.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {SECTOR_TYPES.map(st => (
                  <SelectItem key={st} value={st}>{t(`sector.${st}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRecommend} disabled={loading} className="shrink-0">
            {loading ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('ai.loading')}</>
            ) : (
              <><Sparkles className="h-4 w-4 mr-2" /> {t('ai.recommend')}</>
            )}
          </Button>
        </div>

        {recommendation && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm font-semibold text-foreground">{t('ai.result')}</span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {recommendation}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
