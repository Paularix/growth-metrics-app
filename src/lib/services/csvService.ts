import { MetricName, METRIC_OPTIONS } from '../constants/metrics';

import { Metric } from '@/src/types/metrics';

/**
 * Service to handle CSV export and import operations.
 */
export const csvService = {
  exportToCsv: (data: Metric[]) => {
    if (!data || data.length === 0) return;

    const headers = ['date', 'name', 'category', 'value'];
    const csvContent = [
      headers.join(','),
      ...data.map(m => `${m.created_at},${m.name},${m.category},${m.value}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', `metrics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  parseCsv: (text: string): Partial<Metric>[] => {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length <= 1) return [];

    return lines.slice(1).map(line => {
      const [date, name, category, value] = line.split(',');

      const rawName = name?.trim();
      const validatedName = METRIC_OPTIONS.includes(rawName as MetricName)
        ? (rawName as MetricName)
        : METRIC_OPTIONS[0];

      return {
        created_at: date ? new Date(date).toISOString() : new Date().toISOString(),
        name: validatedName,
        category: category?.trim() || 'General',
        value: Number(value) || 0
      };
    });
  }
};
