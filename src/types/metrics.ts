import { MetricName } from '@/src/lib/constants/metrics';

export interface Metric {
  id?: number | string;
  name: MetricName;
  value: number;
  category: string;
  category_id: number | null;
  created_at: string;
}
/**
 * Interface representing the database row structure for Metrics with joined Categories.
 */
export interface MetricRow {
  id: number;
  name: string;
  value: number;
  created_at: string;
  category_id: number | null;
  metric_categories: {
    name: string;
  } | null;
}

/**
 * Clean interface for Category definitions used across the app.
 */
export interface CategoryDefinition {
  id: number;
  name: string;
  metric_type: MetricName;
}
