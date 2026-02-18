'use client';

import { useState, useRef } from 'react';
import { Plus, Upload, Download } from 'lucide-react';

import { styles } from './Home.styles';

import { useTranslations } from '@/src/hooks/useTranslations';
import { useMetricsData } from '@/src/hooks/useMetricsData';
import MetricsDashboard from '@/src/components/features/MetricsDashboard/MetricsDashboard';
import { CustomDialog } from '@/src/components/ui/CustomDialog/CustomDialog';
import { MetricsForm } from '@/src/components/features/MetricsForm/MetricsForm';
import { Button } from '@/src/components/ui/Button/Button';
import { csvService } from '@/src/services/csvService';
import { MetricsFormHandle } from '@/src/components/features/MetricsForm/MetricsForm.types';

export default function HomePage() {
  const { t } = useTranslations();
  const { rawMetrics, refetch } = useMetricsData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<MetricsFormHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => formRef.current?.submit();
  const handleExport = () => csvService.exportToCsv(rawMetrics);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = csvService.parseCsv(text);
      if (data.length > 0) {
        await refetch();
      } else {
        alert(t.invalidCsvFormat);
      }
    } catch (error) {
      console.error('Import error:', error);
      alert(t.errorImportingData);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className='flex justify-between items-end mb-10'>
          <div className='pb-1'>
            <h1 className={styles.title}>
              {t.growthMetricsDashboard}
              <span className={styles.dot}>.</span>
            </h1>
          </div>
          <div className='flex items-center gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50 shadow-sm'>
            <input
              type='file'
              accept='.csv'
              className='hidden'
              ref={fileInputRef}
              onChange={handleImport}
            />
            <div className='flex items-center gap-1 p-0.5'>
              <Button
                variant='outline'
                size='sm'
                icon={<Download size={14} />}
                onClick={handleExport}
                className='border-none shadow-none hover:bg-slate-50 text-slate-500'
                title={t.exportCsv || 'Export CSV'}
              />
              <div className='h-4 w-px bg-slate-100' />
              <Button
                variant='outline'
                size='sm'
                icon={<Upload size={14} />}
                onClick={() => fileInputRef.current?.click()}
                className='border-none shadow-none hover:bg-slate-50 text-slate-500'
                title={t.importCsv || 'Import CSV'}
              />
            </div>
            <Button
              variant='primary'
              size='md'
              icon={<Plus size={18} strokeWidth={2.5} />}
              label={t.add}
              onClick={() => setIsFormOpen(true)}
              className='px-5 shadow-lg shadow-red-200/60'
            />
          </div>
        </header>

        <MetricsDashboard />

        <CustomDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title={t.add}
          onConfirm={handleConfirm}
          confirmDisabled={!isFormValid}
          buttonLabels={{ confirm: t.confirm, cancel: t.cancel }}
        >
          <MetricsForm
            ref={formRef}
            onApply={() => setIsFormOpen(false)}
            onValidationChange={setIsFormValid}
          />
        </CustomDialog>
      </div>
    </main>
  );
}
