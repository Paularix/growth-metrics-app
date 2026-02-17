import { ReactNode } from 'react';

/**
 * Interface to ensure child components (Charts) correctly receive
 * the properties injected or managed by the Widget container.
 */
export interface HighchartsComponentProps {
  options?: {
    chart?: {
      /** Highcharts uses 'height' as its primary sizing property */
      height?: number | string;
    };
    [key: string]: unknown;
  };
}

export interface WidgetProps {
  /** Internal content of the widget (Charts, tables, etc.) */
  children: ReactNode;
  /** Additional Tailwind CSS classes for custom styling */
  className?: string;
  /** Descriptive text displayed below the main title */
  description?: string;
  /** Fixed height for the content area (e.g., 400, '400px', 'auto') */
  height?: string | number;
  /** Icon or image URL displayed in the widget header */
  icon?: ReactNode | string;
  /** If true, enables the collapse/expand functionality */
  isCollapsible?: boolean;
  /** If true, the widget appears grayed out and prevents user interaction */
  isDisabled?: boolean;
  /** Initial expansion state of the widget */
  isExpanded?: boolean;
  /** Displays a loading spinner over the content area */
  isLoading?: boolean;
  /** Primary heading of the widget */
  title?: string;
}
