import { FEATURES_IN_PROD } from '../constants/metrics';

import { Metric } from '@/src/types/metrics';

// --- INTERFACES ---

export interface LineChartData {
  name: string;
  data: [number, number][];
}

export interface PieChartData {
  name: string;
  y: number;
  drilldown?: string;
}

export interface PieChartSeries {
  name: string;
  data: PieChartData[];
  innerSize?: string;
}

export interface DrilldownSeries {
  id: string;
  name: string;
  data: [string, number][];
}

export interface BarChartPoint {
  name: string;
  y: number;
  drilldown: string | null;
}

export interface BarDrilldownSeries {
  id: string;
  name: string;
  data: [string, number][];
}

export interface BarChartData {
  data: BarChartPoint[];
  drilldownSeries: BarDrilldownSeries[];
}

// --- LOGIC ---

export const getMainChartsData = (
  rawMetrics: Metric[],
  activeFeature: string,
  featuresConfig: typeof FEATURES_IN_PROD
) => {
  const featureConfig = featuresConfig.find((f) => f.id === activeFeature);
  const lineGroups: Record<string, [number, number][]> = {};
  const pieTotals: Record<string, number> = {};
  const drilldownGroups: Record<string, Record<string, number>> = {};

  rawMetrics.forEach((m) => {
    if (!m.created_at) return;
    const isIncluded = activeFeature === 'all' ||
      (featureConfig?.metrics as readonly string[] | undefined)?.includes(m.name);

    if (isIncluded) {
      if (!lineGroups[m.name]) lineGroups[m.name] = [];
      lineGroups[m.name].push([new Date(m.created_at).getTime(), m.value]);
      pieTotals[m.name] = (pieTotals[m.name] || 0) + m.value;

      const categoryLabel = m.category || 'General';
      if (!drilldownGroups[m.name]) drilldownGroups[m.name] = {};
      drilldownGroups[m.name][categoryLabel] = (drilldownGroups[m.name][categoryLabel] || 0) + m.value;
    }
  });

  return {
    lineSeries: Object.entries(lineGroups).map(([name, data]) => ({
      name,
      data: data.sort((a, b) => a[0] - b[0])
    })),
    pieSeries: [{
      name: 'Metrics',
      innerSize: '60%',
      data: Object.entries(pieTotals).map(([name, y]) => ({ name, y, drilldown: name }))
    }],
    drilldownSeries: Object.entries(drilldownGroups).map(([id, cats]) => ({
      id,
      name: `${id} Details`,
      data: Object.entries(cats) as [string, number][]
    }))
  };
};

export const getSalesBarData = (
  rawMetrics: Metric[],
  timeRange: 'month' | 'year'
): BarChartData => {
  const salesData = rawMetrics.filter(m => m.name === 'Sales' && m.created_at);
  const mainGroups: Record<string, number> = {};
  const weeklyDrilldown: Record<string, Record<string, number>> = {};

  salesData.forEach(m => {
    const d = new Date(m.created_at);
    const mainKey = timeRange === 'year'
      ? d.getFullYear().toString()
      : d.toLocaleString('default', { month: 'short', year: '2-digit' });

    const weekKey = `Week ${Math.ceil(d.getDate() / 7)}`;

    mainGroups[mainKey] = (mainGroups[mainKey] || 0) + m.value;
    if (!weeklyDrilldown[mainKey]) weeklyDrilldown[mainKey] = {};
    weeklyDrilldown[mainKey][weekKey] = (weeklyDrilldown[mainKey][weekKey] || 0) + m.value;
  });

  return {
    data: Object.entries(mainGroups).map(([name, y]) => ({
      name,
      y,
      drilldown: timeRange === 'month' ? `drill-${name}` : null
    })),
    drilldownSeries: Object.entries(weeklyDrilldown).map(([key, weeks]) => ({
      id: `drill-${key}`,
      name: `${key} Weeks`,
      data: Object.entries(weeks) as [string, number][]
    }))
  };
};
