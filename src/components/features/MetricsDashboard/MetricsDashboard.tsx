'use client';

import { useMemo, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Widget } from '../../ui/Widget/Widget';
import { useMetricsData } from '../../../hooks/useMetricsData';
import MetricsSelectorBar from '../MetricsSelectorBar/MetricsSelectorBar';

import { getLineChartConfig } from './chartsConfig/lineChart.config';
import { getPieChartConfig } from './chartsConfig/pieChart.config';
import { getBarChartConfig } from './chartsConfig/barChart.config';

import { useTranslations } from '@/src/hooks/useTranslations';
import { FEATURES_IN_PROD } from '@/src/lib/constants/metrics';
import { getMainChartsData, getSalesBarData } from '@/src/lib/utils/metricsUtils';

export default function MetricsDashboard() {
  const [activeOption, setActiveOption] = useState('all');
  const [isHighchartsReady, setIsHighchartsReady] = useState(false);
  const [isBarDrilled, setIsBarDrilled] = useState(false);

  const { isLoading, rawMetrics } = useMetricsData();
  const { t } = useTranslations();

  useEffect(() => {
    const initModules = async () => {
      if (typeof window !== 'undefined') {
        const DrilldownModule = (await import('highcharts/modules/drilldown')).default;
        if (typeof DrilldownModule === 'function') {
          (DrilldownModule as (hc: typeof Highcharts) => void)(Highcharts);
        }
        setIsHighchartsReady(true);
      }
    };
    initModules();
  }, []);

  const { lineSeries, pieSeries, drilldownSeries } = useMemo(() =>
    getMainChartsData(rawMetrics, activeOption, FEATURES_IN_PROD),
  [rawMetrics, activeOption]
  );

  const salesBarData = useMemo(() =>
    getSalesBarData(rawMetrics, 'month'),
  [rawMetrics]
  );

  const barOptions = useMemo(() => {
    const baseConfig = getBarChartConfig(salesBarData.data, salesBarData.drilldownSeries);
    return {
      ...baseConfig,
      chart: {
        ...baseConfig.chart,
        events: {
          drilldown: () => setIsBarDrilled(true),
          drillup: () => setIsBarDrilled(false),
        }
      }
    };
  }, [salesBarData]);

  if (!isHighchartsReady) return (
    <div className='h-96 flex items-center justify-center text-slate-400 animate-pulse'>
      Loading Dashboard...
    </div>
  );

  return (
    <div className='flex flex-col gap-8'>

      <MetricsSelectorBar
        activeId={activeOption}
        onChange={setActiveOption}
        icon='📈'
        title='Growth Lens'
        subtitle={t.selectPerspective}
        options={FEATURES_IN_PROD.map(f => ({ id: f.id, label: f.name }))}
      />

      <div className='grid grid-cols-12 gap-8'>
        <Widget title={t.lineChart} className='col-span-12 lg:col-span-8' isLoading={isLoading} isExpanded>
          <HighchartsReact highcharts={Highcharts} options={getLineChartConfig(lineSeries)} />
        </Widget>

        <Widget title={t.pieChart} className='col-span-12 lg:col-span-4' isLoading={isLoading} isExpanded>
          <HighchartsReact highcharts={Highcharts} options={getPieChartConfig(pieSeries, drilldownSeries)} />
        </Widget>
      </div>

      <Widget title={t.salesPerformance} isCollapsible isExpanded={false} isLoading={isLoading}>
        <div className='w-full pb-4'>
          <HighchartsReact
            highcharts={Highcharts}
            options={barOptions}
            allowChartUpdate={!isBarDrilled}
            callback={(chart: Highcharts.Chart) => {
              if (!isBarDrilled) setTimeout(() => chart.reflow(), 150);
            }}
          />
        </div>
      </Widget>
    </div>
  );
}
