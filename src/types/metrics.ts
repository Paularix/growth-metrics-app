import { MetricName } from '@/src/constants/metrics';

/**
 * Metrics type definitions including core Metric interfaces, database row structures,
 * and relational category definitions for the application.
 */

export interface Metric {
  id?: number | string;
  name: MetricName;
  value: number;
  category: string;
  category_id: number | null;
  created_at: string;
}

export interface MetricRow {
  id: number;
  name: string;
  value: number;
  created_at: string;
  category_id: number | null;
  metric_categories: { name: string } | null;
}

export interface CategoryDefinition {
  id: number;
  name: string;
  metric_type: MetricName;
}
