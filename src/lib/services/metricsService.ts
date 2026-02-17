import { supabase } from '../supabase/client';
import { CategoryDefinition, Metric, MetricRow } from '../../types/metrics';
import { MetricName } from '../constants/metrics';


export const metricsService = {
  /**
   * Fetches all metrics and maps the relational 'metric_categories' name to the 'category' field.
   */
  async getAll(): Promise<Metric[]> {
    const { data, error } = await supabase
      .from('metrics')
      .select(`
        id,
        name,
        value,
        created_at,
        category_id,
        metric_categories (
          name
        )
      `)
      .order('created_at', { ascending: true });

    if (error) throw error;

    const rows = (data as unknown as MetricRow[]) || [];

    return rows.map((m): Metric => ({
      id: m.id,
      name: m.name as MetricName,
      value: Number(m.value),
      created_at: m.created_at,
      category_id: m.category_id,
      category: m.metric_categories?.name || 'General'
    }));
  },

  async create(metric: Omit<Metric, 'id'>): Promise<void> {
    const { error } = await supabase.from('metrics').insert([metric]);
    if (error) throw error;
  },

  async getCategories(): Promise<CategoryDefinition[]> {
    const { data, error } = await supabase
      .from('metric_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return (data as unknown as CategoryDefinition[]) || [];
  }
};
