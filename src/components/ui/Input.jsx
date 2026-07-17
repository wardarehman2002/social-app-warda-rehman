import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Reusable input used across every form.
 * forwardRef is required so React Hook Form's register() ref works correctly.
 */
const Input = forwardRef(function Input(
  { label, error, className = '', type = 'text', ...rest },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors',
          'bg-white dark:bg-gray-800 dark:text-gray-100',
          'focus:ring-2 focus:ring-primary-500',
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-300 dark:border-gray-600 focus:border-primary-500',
          className
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
