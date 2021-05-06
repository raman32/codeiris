import clsx from 'clsx';
import { PostType } from 'gql';
import React from 'react';
import Tag from '../Tag';

const MAX_VISIBLE_TAGS = 5;

interface PostBodyPorps {
  id?: string
  title?: string
  children?: React.ReactNode
  tags?: any[]
  postType?: PostType,
  showFullBody?: boolean
}

function PostBody({
  id,
  title,
  children,
  tags = [],
  postType,
  showFullBody = false,
}: PostBodyPorps) {
  return (
    <>
      <div className="text-2xl mb-3 font-semibold flex items-start">
        {!showFullBody ? <a href={`/posts/${id}`}>{title}</a> : title}
      </div>

      <div
        className={clsx('mb-3', {
          'line-clamp-3 overflow-hidden': !showFullBody,
        })}
      >
        {children}
      </div>

      {postType && (
        <Tag className="bg-error capitalize" color="text-white">
          {postType}
        </Tag>
      )}

      {tags.slice(-1 * MAX_VISIBLE_TAGS).map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </>
  );
}

export default PostBody;
