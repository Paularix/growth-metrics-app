import { Options, SeriesColumnOptions, SeriesOptionsType } from 'highcharts';

import { BarChartPoint, BarDrilldownSeries } from '../../../../lib/utils/metricsUtils';

/**
 * Generates the configuration for the Sales Performance column chart with Drilldown support.
 * * @param data - Main series data (Months or Years)
 * @param drilldownSeries - Child series data (Weeks)
 */
export const getBarChartConfig = (
  data: BarChartPoint[],
  drilldownSeries: BarDrilldownSeries[]
): Options => ({
  chart: {
    type: 'column',
    height: 400,
    style: { fontFamily: 'inherit' },
    marginBottom: 80,
    spacingBottom: 20,
    reflow: true
  },
  title: { text: '' },
  credits: { enabled: false },
  xAxis: {
    type: 'category',
    gridLineColor: 'transparent',
    labels: {
      style: { fontSize: '11px', color: '#64748b' }
    }
  },
  yAxis: {
    title: { text: '' },
    gridLineColor: '#f1f5f9',
    labels: { style: { color: '#94a3b8' } }
  },
  legend: { enabled: false },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      groupPadding: 0.1,
      borderRadius: 6,
      cursor: 'pointer'
    }
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: '#ff585d',
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    series: drilldownSeries as SeriesOptionsType[]
  },
  series: [{
    type: 'column',
    name: 'Sales Volume',
    color: '#ff585d',
    data: data
  } as SeriesColumnOptions]
});
