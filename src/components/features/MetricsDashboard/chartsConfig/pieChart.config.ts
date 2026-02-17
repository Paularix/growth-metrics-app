import { Options, SeriesPieOptions } from 'highcharts';

import { PieChartSeries, DrilldownSeries } from '@/src/lib/utils/metricsUtils';

/**
 * Generates the configuration for the distribution Piechart.
 * * @param seriesData - Main series data (Overview)
 * @param drilldownSeriesData - Breakdown series data (Category details)
 * @returns Highcharts Options object
 */
export const getPieChartConfig = (
  seriesData: PieChartSeries[],
  drilldownSeriesData: DrilldownSeries[]
): Options => ({
  chart: {
    type: 'pie',
    height: 400,
    style: { fontFamily: 'inherit' }
  },
  title: { text: '' },
  credits: { enabled: false },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: { enabled: false },
      showInLegend: true,
      innerSize: '60%',
      borderWidth: 0,
    }
  },
  series: seriesData.map((s): SeriesPieOptions => ({
    type: 'pie',
    name: s.name,
    innerSize: s.innerSize || '60%',
    data: s.data.map(d => ({
      name: d.name,
      y: d.y,
      drilldown: d.drilldown
    }))
  })),
  drilldown: {
    activeDataLabelStyle: {
      color: '#ff585d',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    breadcrumbs: {
      floating: true,
      position: {
        align: 'right',
        verticalAlign: 'top',
        y: -20
      },
      showFullPath: true
    },
    series: drilldownSeriesData.map((s): SeriesPieOptions => ({
      type: 'pie',
      id: s.id,
      name: s.name,
      data: s.data.map(d => ({
        name: d[0],
        y: d[1]
      }))
    }))
  },
  colors: ['#ff585d', '#2dd4bf', '#fbbf24', '#818cf8', '#f472b6']
});
