'use client';

import { useCallback, useState, useEffect } from 'react';

import { CategoryDefinition, Metric } from '../types/metrics';
import { metricsService } from '../services/metricsService';

/**
 * Hook that manages the fetching and synchronization of metrics and categories,
 * providing real-time updates via polling and exposing data states for the dashboard.
 */
export function useMetricsData() {
  const [rawMetrics, setRawMetrics] = useState<Metric[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    try {
      const [metricsData, categoriesData] = await Promise.all([
        metricsService.getAll(),
        metricsService.getCategories()
      ]);
      setRawMetrics(metricsData);
      setAllCategories(categoriesData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [loadData]);

  return {
    rawMetrics,
    allCategories,
    isLoading,
    refetch: loadData
  };
}
