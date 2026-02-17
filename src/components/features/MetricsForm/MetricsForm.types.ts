export interface MetricsFormProps {
  onApply?: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

export interface MetricsFormHandle {
  submit: () => Promise<void>;
}
