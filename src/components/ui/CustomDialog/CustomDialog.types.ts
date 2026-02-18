import { ReactNode } from 'react';

export interface CustomDialogProps {
  /** Custom labels for the action buttons**/
  buttonLabels?: {
    cancel?: string;
    confirm?: string;
  };
  /** Content to be rendered inside the main body of the dialog */
  children: ReactNode;
  /** Prevents closing the dialog via the backdrop or the close button */
  closeDisabled?: boolean;
  /** Disables the primary confirm action button**/
  confirmDisabled?: boolean;
  /** Controls whether the dialog is visible in the DOM */
  isOpen: boolean;
  /** * Maximum width of the dialog following Tailwind's max-width scales
   * @default 'sm'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Function called to dismiss the dialog. Required unless the dialog is purely informative */
  onClose?: () => void;
  /** Function called when the primary action button is clicked */
  onConfirm?: () => void;
  /** Header title text displayed at the top of the dialog */
  title: string;
}
