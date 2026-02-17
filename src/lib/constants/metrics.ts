export const METRIC_OPTIONS = [
  'Users',
  'Engagement',
  'Visits',
  'Clicks',
  'Sales'
] as const;

export type MetricName = (typeof METRIC_OPTIONS)[number];

export const FEATURES_IN_PROD = [
  {
    id: 'all',
    name: 'General Overview',
    metrics: ['Users', 'Clicks', 'Sales', 'Visits', 'Engagement']
  },
  {
    id: 'user-growth',
    name: 'User Growth',
    metrics: ['Users', 'Engagement']
  },
  {
    id: 'revenue',
    name: 'Revenue & Traffic',
    metrics: ['Sales', 'Visits', 'Clicks']
  }
] as const;
