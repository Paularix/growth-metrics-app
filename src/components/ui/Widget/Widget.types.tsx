import { ReactNode } from 'react';

export interface HighchartsComponentProps {
  /** * Specific options for Highcharts to ensure proper scaling within the widget.
   */
  options?: {
    chart?: {
      /** Custom height for the chart container, usually managed by the parent widget */
      height?: number | string;
    };
    [key: string]: unknown;
  };
}

export interface WidgetProps {
  /** Main content to be rendered inside the widget (e.g., charts, tables, forms) */
  children: ReactNode;
  /** Additional CSS classes for layout adjustments or custom styles */
  className?: string;
  /** Explanatory text shown under the title to provide context */
  description?: string;
  /** * Enforced height for the widget's inner content area
   * @example 400, '400px', '70vh'
   */
  height?: string | number;
  /** Graphical element or image URL rendered in the header next to the title */
  icon?: ReactNode | string;
  /** Whether the user can toggle the widget's visibility */
  isCollapsible?: boolean;
  /** If true, visual opacity is reduced and all interactions are blocked */
  isDisabled?: boolean;
  /** Sets the starting state for collapsible widgets */
  isExpanded?: boolean;
  /** Replaces the content with a centered loading spinner while data is being fetched */
  isLoading?: boolean;
  /** The main title displayed in the widget's header */
  title?: string;
}
