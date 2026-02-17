import { ReactNode } from 'react';


export interface CustomDialogProps {
  /** Custom labels for action buttons */
  buttonLabels?: {
    cancel?: string;
    confirm?: string;
  };
  /** The content to be rendered inside the dialog body */
  children: ReactNode;
  /** If true, prevents closing the dialog via the 'X' button or backdrop click */
  closeDisabled?: boolean;
  /** Disables the primary action button */
  confirmDisabled?: boolean;
  /** Controls the visibility of the dialog. */
  isOpen: boolean;
  /** * Maximum width constraint based on Tailwind's breakpoints.
   * @default 'sm'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** * Callback triggered when the dialog is dismissed.
   * Optional to allow for strictly informative modals.
   */
  onClose?: () => void;
  /** Callback triggered by the primary action button. */
  onConfirm?: () => void;
  /** Header text displayed at the top of the dialog. */
  title: string;
}
