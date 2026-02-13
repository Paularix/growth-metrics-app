import { supabase } from '../supabase';
import { Metric } from '../../types/metrics';

export const metricsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Metric[];
  },

  async create(metrics: { name: string; value: number }) {
    const { data, error } = await supabase
      .from('metrics')
      .insert([metrics])
      .select();

    if (error) throw error;
    return data ? (data[0] as Metric) : null;
  }
};
