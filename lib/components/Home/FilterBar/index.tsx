import clsx from 'clsx';
import Button from 'lib/components/atomic/button';
import {
  ClockIcon,
  StarIcon,
  TreadingUpIcon,
  PencilIcon,
} from 'lib/components/Icons';
import LinkButton from 'lib/components/Shared/LinkButton';
import React from 'react';
import { PostOrder } from 'src/models/input/post-order.input';
import FilterDropdown from './FilterDropdown';

export interface FilterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  handleSort: ({ field, direction }) => void;
}
const getIconComponent = (Icon) => <Icon color="white" size={4} />;

function FilterBar({ className, handleSort }: FilterProps) {
  return (
    <div className={clsx('flex items-center', className)}>
      <div className="bg-white rounded-lg shadow-lg flex flex-1 p-4">
        <FilterDropdown
          color="success"
          Icon={getIconComponent(StarIcon)}
          handleSort={handleSort}
          options={[
            {
              name: 'Most Popular',
              order: {
                field: 'createdAt',
                direction: 'desc',
              },
            },
            {
              name: 'Least Popular',
              order: {
                field: 'createdAt',
                direction: 'desc',
              },
            },
          ]}
        />
        yar
        <FilterDropdown
          color="info"
          Icon={getIconComponent(TreadingUpIcon)}
          className="mx-5"
          handleSort={handleSort}
          options={[
            {
              name: 'Most Votes',
              order: {
                field: 'createdAt',
                direction: 'desc',
              },
            },
            {
              name: 'Least Votes',
              order: {
                field: 'createdAt',
                direction: 'desc',
              },
            },
          ]}
        />
        <FilterDropdown
          color="warning"
          Icon={getIconComponent(ClockIcon)}
          handleSort={handleSort}
          options={[
            {
              name: 'New Post',
              order: {
                field: 'createdAt',
                direction: 'desc',
              },
            },
            {
              name: 'Old Post',
              order: {
                field: 'createdAt',
                direction: 'asc',
              },
            },
          ]}
        ></FilterDropdown>
      </div>

      <div>
        <LinkButton
          icon={<PencilIcon className="mr-2" size={3} />}
          className="ml-10 shadow-2xl"
          link="/posts/save"
        >
          Write New Thread
        </LinkButton>
      </div>
    </div>
  );
}

export default FilterBar;
