import React from 'react';
import clsx from 'clsx';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx(
      "rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
      className
    )}>
      {children}
    </div>
  );
}
