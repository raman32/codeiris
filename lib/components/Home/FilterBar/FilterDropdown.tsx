import clsx from 'clsx';
import React from 'react';
import { PostOrder } from 'src/models/input/post-order.input';

export interface FilterDropdownProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color?: string;
  Icon?: React.ReactNode;
  handleSort?: any;
  children?: any[];
  options?: any;
}

function FilterDropdown({
  color,
  Icon,
  options = [],
  className,
  handleSort,
}: FilterDropdownProps) {
  return (
    <div
      className={clsx(
        'rounded-full border pl-2 pr-4 py-1 flex items-center mb-2',
        className,
      )}
    >
      <div className={`rounded-full mr-2 bg-${color} p-2`}>{Icon}</div>

      <select className="bg-white text-sm outline-none">
        {options.map(({ order, name }, index) => (
          <option onClick={() => handleSort(order)} key={index}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;
