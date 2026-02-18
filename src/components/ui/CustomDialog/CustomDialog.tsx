'use client';

import { CustomDialogProps } from './CustomDialog.types';

import { useTranslations } from '@/src/hooks/useTranslations';

const styles = {
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6',
  backdrop: 'absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300',
  content: 'relative bg-white w-full rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col',
  widths: { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' },
  header: 'flex justify-between items-center p-6 pb-2',
  title: 'text-xl font-bold text-slate-800',
  body: 'p-6 py-2',
  actions: 'p-4 px-6 flex justify-end gap-3',
  btnCancel: 'px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed',
  btnConfirm: 'px-6 py-2 text-sm font-bold text-white bg-[#ff585d] hover:bg-[#ff4046] rounded-xl shadow-md active:scale-95 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed',
};

/**
 * Reusable CustomDialog component that provides a modal interface with a backdrop, customizable header,
 * and action buttons for consistent user interactions.
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
      <div className={styles.backdrop} onClick={closeDisabled ? undefined : onClose} />
      <div className={`${styles.content} ${styles.widths[maxWidth]}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {!closeDisabled && onClose && (
            <button
              onClick={onClose}
              className='text-slate-400 hover:text-slate-600 p-1 transition-colors text-lg disabled:opacity-30'
              disabled={closeDisabled}
            >
              ✕
            </button>
          )}
        </div>
        <div className={styles.body}>{children}</div>
        {(onClose || onConfirm) && (
          <div className={styles.actions}>
            {onClose && (
              <button disabled={closeDisabled} onClick={onClose} className={styles.btnCancel}>
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
