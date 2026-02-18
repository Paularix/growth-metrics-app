'use client';

import React, { useState } from 'react';

import { WidgetProps } from './Widget.types';

import { useTranslations } from '@/src/hooks/useTranslations';

const styles = {
  container: 'flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all',
  disabled: 'opacity-50',
  summary: 'flex items-center justify-between p-5 select-none transition-colors',
  summaryInteractive: 'cursor-pointer hover:bg-slate-50',
  headerLeft: 'flex items-center gap-4',
  iconWrapper: 'shrink-0',
  iconImg: 'w-8 h-8 object-contain',
  titleWrapper: 'flex flex-col text-left',
  title: 'text-sm font-bold text-slate-800 tracking-tight',
  descriptionText: 'text-xs text-slate-500 mt-1',
  arrowWrapper: 'transition-transform duration-300',
  arrowIcon: 'w-5 h-5 text-slate-400',
  bodyGrid: 'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
  bodyVisible: 'grid-rows-[1fr] opacity-100',
  bodyHidden: 'grid-rows-[0fr] opacity-0',
  detailsWrapper: 'overflow-hidden',
  details: 'p-5 pt-0 flex flex-col',
  content: 'flex-1 w-full h-full relative',
  loadingWrapper: 'flex-1 flex items-center justify-center',
  spinner: 'w-6 h-6 border-2 border-[#ff585d] border-t-transparent rounded-full animate-spin',
};

/**
 * Reusable Widget component that serves as a flexible container for dashboard cards,
 * supporting collapsible states, loading indicators, and empty/error states.
 */
export const Widget = ({
  children,
  className = '',
  description,
  height,
  icon,
  isCollapsible,
  isDisabled,
  isExpanded: initialExpanded = true,
  isLoading,
  isEmpty,
  title
}: WidgetProps) => {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(initialExpanded);
  const contentStyle = height ? { height, minHeight: height } : {};

  const renderState = () => {
    if (isLoading) return (
      <div className='flex flex-col items-center justify-center py-12 gap-3'>
        <div className={styles.spinner} />
        <p className='text-xs font-medium text-slate-400 uppercase tracking-widest'>
          {t.loadingDashboard}
        </p>
      </div>
    );

    if (isEmpty) return (
      <div className='flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in duration-500'>
        <div className='bg-slate-50 p-4 rounded-full mb-4'>
          <svg className='w-8 h-8 text-slate-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' />
          </svg>
        </div>
        <h4 className='text-sm font-semibold text-slate-800 mb-1'>
          {t.noDataPointsDetected}
        </h4>
        <p className='text-xs text-slate-500 max-w-[200px] leading-relaxed'>
          {t.connectToSupabaseOrInitializeYourDatasetToBeginVisualizingGrowthMetrics}
        </p>
      </div>
    );

    return children;
  };

  return (
    <div className={`${styles.container} ${isDisabled ? styles.disabled : ''} ${className}`}>
      {(title || icon) && (
        <div
          className={`${styles.summary} ${isCollapsible ? styles.summaryInteractive : ''}`}
          onClick={() => isCollapsible && setIsOpen(!isOpen)}
        >
          <div className={styles.headerLeft}>
            {icon && <span className='text-xl shrink-0'>{icon}</span>}
            <div className='flex flex-col'>
              {title && <h3 className={styles.title}>{title}</h3>}
              {description && <p className={styles.descriptionText}>{description}</p>}
            </div>
          </div>
          {isCollapsible && (
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg className='w-5 h-5 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </span>
          )}
        </div>
      )}
      <div className={`${styles.bodyGrid} ${isOpen ? styles.bodyVisible : styles.bodyHidden}`}>
        <div className={styles.detailsWrapper}>
          <div className={styles.details} style={contentStyle}>
            {renderState()}
          </div>
        </div>
      </div>
    </div>
  );
};
