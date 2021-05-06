import clsx from 'clsx';
import React from 'react';

function Tag({
  children,
  color = 'text-gray-500',
  className = '',
  closable = false,
  onClose = null,
}) {
  return (
    <div
      className={clsx(
        'inline-block mr-3 border rounded-md py-1 px-4 text-xs',
        color,
        className,
      )}
      onClick={() => {}}
    >
      {children}

      {closable && (
        <span onClick={onClose} className="ml-2 cursor-pointer">
          x
        </span>
      )}
    </div>
  );
}

export default Tag;
