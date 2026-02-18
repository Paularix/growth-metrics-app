import { Options, SeriesAreaOptions } from 'highcharts';

import { LineChartData } from '@/src/utils/metricsUtils';

/**
 * Generates the configuration for the Line Chart.
 * Uses an 'area' type with low fill opacity to show evolution over time without clutter.
 * * @param seriesData - Array of objects containing the metric name and timestamp-value pairs
 * @returns Highcharts Options object
 */
export const getLineChartConfig = (seriesData: LineChartData[]): Options => ({
  chart: {
    type: 'area',
    height: 400,
    style: { fontFamily: 'inherit' }
  },
  title: { text: '' },
  credits: { enabled: false },
  plotOptions: {
    area: {
      fillOpacity: 0.1,
      lineWidth: 3,
      marker: { enabled: false }
    }
  },
  series: seriesData.map((s): SeriesAreaOptions => ({
    type: 'area',
    name: s.name,
    data: s.data
  })),
  xAxis: { type: 'datetime', gridLineColor: '#f1f5f9' },
  yAxis: { title: { text: '' }, gridLineColor: '#f1f5f9' },
});
