import React from 'react';
import clsx from 'clsx';
import { IntentProps } from '../../../common/props/IntentProps';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    IntentProps {
  icon?: React.ReactNode;
  loading?: boolean;
  loaderClass?: string;
  colorClass?: string;
}

function Button({
  children,
  loading,
  icon,
  className,
  disabled,
  loaderClass,
  colorClass = 'text-white',
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={clsx(
          `flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${colorClass} bg-primary focus:outline-none`,
          className,
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {icon}
        {loading && (
          <div
            className={clsx(
              `animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-${colorClass.replace(
                'text-',
                '',
              )} mr-3`,
              loaderClass,
            )}
          />
        )}
        {children}
      </button>
    </>
  );
}

export default Button;
