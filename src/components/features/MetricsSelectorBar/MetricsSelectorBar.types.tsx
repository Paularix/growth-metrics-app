/**
 * Represents an individual selectable item within the MetricsSelectorBar.
 */
export interface MetricsSelectorBarOption {
  id: string;
  label: string;
}

export interface MetricsSelectorBarProps {
  /** * Array of available options.
   * Supports 'readonly' to allow using constants defined with 'as const'.
   */
  options: readonly MetricsSelectorBarOption[] | MetricsSelectorBarOption[];
  /** The ID of the currently selected option. */
  activeId: string;
  /** Callback function triggered when a new option is clicked. */
  onChange: (id: string) => void;
  /** Optional header title for the group. */
  title?: string;
  /** Optional descriptive text displayed below the title. */
  subtitle?: string;
  /** Optional emoji or icon string to represent the group visually. */
  icon?: string;
}
