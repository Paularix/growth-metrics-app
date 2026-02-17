'use client';

import { useCallback, useState, useEffect } from 'react';

import { CategoryDefinition, Metric } from '../types/metrics';
import { metricsService } from '../lib/services/metricsService';

/**
 * Custom hook for managing the lifecycle of dashboard metrics and category definitions.
 * Handles initial data fetching, state management for loading indicators,
 * and implements a real-time polling mechanism to keep data synchronized with the server.
 * * @returns {Object} An object containing:
 * - rawMetrics: Array of processed metric records.
 * - allCategories: Array of relational category definitions for form filtering.
 * - isLoading: Boolean flag indicating the initial fetch status.
 * - refetch: Function to manually trigger a data refresh.
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
