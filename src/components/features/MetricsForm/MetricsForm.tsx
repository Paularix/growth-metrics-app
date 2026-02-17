'use client';

import React, { useState, useImperativeHandle, forwardRef, useEffect, useMemo } from 'react';

import { MetricsFormHandle, MetricsFormProps } from './MetricsForm.types';

import { METRIC_OPTIONS, MetricName } from '@/src/lib/constants/metrics';
import { metricsService } from '@/src/lib/services/metricsService';
import { useMetricsData } from '@/src/hooks/useMetricsData';
import { useTranslations } from '@/src/hooks/useTranslations';

const styles = {
  container: 'w-full',
  label: 'block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1',
  input: 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff585d]/20 focus:border-[#ff585d] transition-all',
  grid: 'grid grid-cols-2 gap-4'
};

/**
 * Enhanced form component for creating and categorizing business metrics.
 * Utilizes forwardRef to allow parent components to trigger submission.
 * Features dynamic relational filtering for categories based on the selected metric type.
 */
export const MetricsForm = forwardRef<MetricsFormHandle, MetricsFormProps>(({
  onApply,
  onValidationChange
}, ref) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<MetricName | ''>('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('General');
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { refetch, allCategories } = useMetricsData();
  const { t } = useTranslations();

  const filteredCategories = useMemo(() => {
    if (!name) return [];
    return allCategories.filter((cat) => cat.metric_type === name);
  }, [name, allCategories]);

  const isValid = name !== '' && value !== '' && Number(value) > 0;

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  useEffect(() => {
    setCategory('General');
    setCategoryId(null);
  }, [name]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setCategory(selectedName);
    const found = filteredCategories.find(c => c.name === selectedName);
    setCategoryId(found ? found.id : null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await metricsService.create({
        created_at: new Date(date).toISOString(),
        name: name as MetricName,
        value: Number(value),
        category: category,
        category_id: categoryId,
      });
      await refetch();
      onApply?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({ submit: handleSubmit }));

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className='space-y-5'>
        <div>
          <label className={styles.label}>{t.select}</label>
          <select className={styles.input} value={name} onChange={(e) => setName(e.target.value as MetricName)} required>
            <option disabled value=''>{t.select}</option>
            {METRIC_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div>
          <label className={styles.label}>{t.category}</label>
          <select className={styles.input} value={category} onChange={handleCategoryChange} disabled={!name} required>
            <option value='General'>General / Other</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.grid}>
          <div>
            <label className={styles.label}>{t.date}</label>
            <input className={styles.input} type='date' value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label className={styles.label}>{t.value}</label>
            <input className={styles.input} type='number' value={value} onChange={(e) => setValue(e.target.value)} placeholder='0.00' required />
          </div>
        </div>
      </div>
      <button type='submit' className='hidden' disabled={loading} />
    </form>
  );
});

MetricsForm.displayName = 'MetricsForm';
