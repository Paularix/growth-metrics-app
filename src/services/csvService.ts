import { Metric } from '@/src/types/metrics';

const CSV_HEADERS = ['date', 'name', 'category', 'value'] as const;

/**
 * Provides utility functions to export metric data to CSV files.
 * Optimized for memory management and data safety.
 */
export const csvService = {
  exportToCsv: (data: Metric[]) => {
    if (!data?.length) return;

    const csvContent = [
      CSV_HEADERS.join(','),
      ...data.map(m =>
        `${m.created_at || ''},${m.name || ''},${m.category || ''},${m.value ?? 0}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    const dateTag = new Date().toISOString().split('T')[0];

    link.href = url;
    link.download = `metrics_${dateTag}.csv`;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};
