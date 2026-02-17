'use client';

import { CustomDialogProps } from './CustomDialog.types';

import { useTranslations } from '@/src/hooks/useTranslations';

const styles = {
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6',
  backdrop: 'absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300',
  content: 'relative bg-white w-full rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col',
  widths: {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  },
  header: 'flex justify-between items-center p-6 pb-2',
  title: 'text-xl font-bold text-slate-800',
  body: 'p-6 py-2',
  actions: 'p-4 px-6 flex justify-end gap-3',
  btnCancel: 'px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-50',
  btnConfirm: 'px-6 py-2 text-sm font-bold text-white bg-[#ff585d] hover:bg-[#ff4046] rounded-xl shadow-md shadow-red-100 transition-all disabled:opacity-50 active:scale-95',
};

/**
 * A reusable dialog component that provides a consistent layout for user interactions.
 * Features a customizable header, a flexible body area, and standard action buttons.
 * * @param {CustomDialogProps} props - The configuration properties for the dialog.
 * @returns {JSX.Element | null} The rendered dialog or null if not open.
 */
export const CustomDialog = ({
  buttonLabels,
  children,
  closeDisabled = false,
  confirmDisabled = false,
  isOpen = false,
  maxWidth = 'sm',
  onClose,
  onConfirm,
  title = '',
}: CustomDialogProps) => {
  const { t } = useTranslations();

  if (!isOpen) return null;

  const labels = {
    cancel: buttonLabels?.cancel || t.cancel,
    confirm: buttonLabels?.confirm || t.confirm,
  };

  return (
    <div className={styles.overlay}>
      {/* Backdrop: clicking it closes the dialog unless closeDisabled is true */}
      <div
        className={styles.backdrop}
        onClick={closeDisabled ? undefined : onClose}
      />

      <div className={`${styles.content} ${styles.widths[maxWidth]}`}>
        {/* Header Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {!closeDisabled && onClose && (
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-slate-600 p-1 transition-colors text-lg'
              aria-label='Close'
            >
              ✕
            </button>
          )}
        </div>

        {/* Body Content Section */}
        <div className={styles.body}>{children}</div>

        {/* Actions Section */}
        {(onClose || onConfirm) && (
          <div className={styles.actions}>
            {onClose && (
              <button
                disabled={closeDisabled}
                onClick={onClose}
                className={styles.btnCancel}
              >
                {labels.cancel}
              </button>
            )}
            {onConfirm && (
              <button
                disabled={confirmDisabled}
                onClick={onConfirm}
                className={styles.btnConfirm}
              >
                {labels.confirm}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
