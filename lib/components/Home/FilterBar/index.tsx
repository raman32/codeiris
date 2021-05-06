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
import TagsInput from '../../Shared/TagsInput';

export interface FilterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  handleSort?: any;
  onFilter?: any;
  tags: any;
  setTags: any;
}
const getIconComponent = (Icon) => <Icon color="white" size={4} />;

function FilterBar({ className, handleSort, tags, setTags, onFilter }) {
  return (
    <div className={clsx('lg:flex items-end', className)}>
      <div className="bg-white rounded-lg shadow-lg flex-1 p-4">
        <div className="flex flex-wrap">
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
          />
        </div>

        <TagsInput
          onFilter={onFilter}
          tags={tags}
          setTags={setTags}
          className="mt-2"
        />
      </div>

      <LinkButton
        icon={<PencilIcon className="mr-2" size={3} />}
        className="lg:ml-10 mt-5 shadow-2xl"
        link="/posts/save"
      >
        Write New Thread
      </LinkButton>
    </div>
  );
}

export default FilterBar;
