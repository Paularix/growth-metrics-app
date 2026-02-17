'use client';

import React, { useState } from 'react';

import { WidgetProps } from './Widget.types';

const styles = {
  container: 'flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300',
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
 * A reusable wrapper for dashboard cards with support for
 * loading states, collapsibility, and disabled interactions.
 * * * @param props - Configuration properties for the widget container
 * @returns A responsive card component
 */
export const Widget = ({
  children,
  description,
  height = '',
  icon,
  isCollapsible = false,
  isDisabled = false,
  isExpanded = true,
  isLoading = false,
  title,
  className = '',
}: WidgetProps) => {
  const [isExpandedUser, setIsExpandedUser] = useState(isExpanded);

  const currentExpanded = isDisabled ? false : (!isCollapsible ? true : isExpandedUser);

  const handleToggle = () => {
    if (!isDisabled && isCollapsible) {
      setIsExpandedUser(!currentExpanded);
    }
  };

  return (
    <div className={`${styles.container} ${className} ${isDisabled ? styles.disabled : ''}`}>

      {(title || description || icon) && (
        <div
          className={`${styles.summary} ${isCollapsible && !isDisabled ? styles.summaryInteractive : ''}`}
          onClick={handleToggle}
          role={isCollapsible ? 'button' : 'presentation'}
        >
          <div className={styles.headerLeft}>
            {icon && (
              <div className={styles.iconWrapper}>
                {typeof icon === 'string' ? (
                  <img src={icon} alt='widget icon' className={styles.iconImg} />
                ) : (
                  icon
                )}
              </div>
            )}
            <div className={styles.titleWrapper}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {currentExpanded && description && (
                <p className={styles.descriptionText}>{description}</p>
              )}
            </div>
          </div>

          {isCollapsible && (
            <div className={`${styles.arrowWrapper} ${currentExpanded ? 'rotate-180' : 'rotate-0'}`}>
              <svg className={styles.arrowIcon} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' />
              </svg>
            </div>
          )}
        </div>
      )}

      <div className={`${styles.bodyGrid} ${currentExpanded ? styles.bodyVisible : styles.bodyHidden}`}>
        <div className={styles.detailsWrapper}>
          <div
            className={styles.details}
            style={{ height: currentExpanded ? height : 0 }}
          >
            {isLoading ? (
              <div className={styles.loadingWrapper}>
                <div className={styles.spinner} />
              </div>
            ) : (
              <div className={styles.content}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
