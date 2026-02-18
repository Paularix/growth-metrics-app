'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

import { CategoryDefinition, Metric } from '../types/metrics';
import { metricsService } from '../services/metricsService';

/**
 * Hook that manages metrics and categories data, providing safe polling
 * and exposing error states for robust UI handling.
 */

export function useMetricsData() {
  const [rawMetrics, setRawMetrics] = useState<Metric[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    try {
      const [metrics, categories] = await Promise.all([
        metricsService.getAll(),
        metricsService.getCategories()
      ]);
      setRawMetrics(metrics);
      setAllCategories(categories);
      setIsError(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      timeoutRef.current = setTimeout(loadData, 5000);
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loadData]);

  return {
    rawMetrics,
    allCategories,
    isLoading,
    isError,
    refetch: loadData
  };
}
