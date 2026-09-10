import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();
  if (!toast) return null;

  const bgColors = {
    success: 'bg-primary border-primary-fixed/40 text-on-primary',
    info: 'bg-secondary border-secondary-fixed/40 text-on-secondary',
    error: 'bg-error border-error-container text-on-error'
  };

  const icons = {
    success: 'check_circle',
    info: 'info',
    error: 'emergency'
  };

  return (
    <div className="fixed top-6 right-6 z-[100] max-w-md animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${bgColors[toast.type] || bgColors.info}`}>
        <span className="material-symbols-outlined text-2xl shrink-0">
          {icons[toast.type] || 'notifications'}
        </span>
        <div className="text-sm font-semibold leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
