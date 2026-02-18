'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

import { CategoryDefinition, Metric, UseMetricsOptions } from '../types/metrics';
import { metricsService } from '../services/metricsService';

/**
 * Hook that manages metrics and categories data, providing safe polling
 * and exposing error states for robust UI handling.
 */

export function useMetricsData(options: UseMetricsOptions = { enabled: true }) {
  const [rawMetrics, setRawMetrics] = useState<Metric[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryDefinition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { enabled = true } = options;

  const loadData = useCallback(async () => {
    if (!enabled) return;

    try {
      const [metrics, categories] = await Promise.all([
        metricsService.getAll(),
        metricsService.getCategories()
      ]);

      if (enabled) {
        setRawMetrics(metrics);
        setAllCategories(categories);
        setIsError(false);
      }
    } catch (error) {
      if (enabled) setIsError(true);
    } finally {
      if (enabled) {
        setIsLoading(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(loadData, 5000);
      }
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    loadData();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, loadData]);

  return {
    rawMetrics,
    allCategories,
    isLoading,
    isError,
    refetch: loadData
  };
}
