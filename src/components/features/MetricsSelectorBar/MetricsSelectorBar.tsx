'use client';

import { MetricsSelectorBarProps } from './MetricsSelectorBar.types';

const styles = {
  container: `flex flex-wrap justify-between items-center bg-white p-4 
    border border-slate-200 rounded-xl shadow-sm gap-4`,
  infoWrapper: 'flex items-center gap-2 px-1',
  iconBox: 'p-1.5 bg-slate-50 rounded-lg border border-slate-100',
  iconText: 'text-base',
  title: 'text-[14px] font-bold text-slate-800 uppercase tracking-tight leading-none',
  subtitle: 'text-[12px] text-slate-400 font-medium tracking-wide',
  buttonGroup: 'flex bg-slate-100/80 p-1 rounded-lg gap-1 border border-slate-100',
  buttonBase: `px-3 py-1.5 text-[12px] font-bold rounded-md transition-all duration-200 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200`,
  buttonActive: 'bg-white text-[#ff585d] shadow-sm border border-slate-100 scale-[1.02]',
  buttonInactive: 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
};

export default function MetricsSelectorBar({
  activeId,
  icon,
  onChange,
  options,
  subtitle,
  title
}: MetricsSelectorBarProps) {
  return (
    <div className={styles.container}>
      {(title || subtitle) && (
        <div className={styles.infoWrapper}>
          {icon && (
            <div className={styles.iconBox}>
              <span className={styles.iconText}>{icon}</span>
            </div>
          )}
          <div className='flex flex-col gap-0.5'>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
      )}

      <div className={styles.buttonGroup}>
        {options.map((option) => (
          <button
            key={option.id}
            type='button'
            onClick={() => onChange(option.id)}
            className={`${styles.buttonBase} ${
              activeId === option.id ? styles.buttonActive : styles.buttonInactive
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
