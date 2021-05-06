import { PostProps } from 'lib/common/props/PostProps';
import React, { useState } from 'react';
import ImageBar from './ImageBar';
import PostBody from './PostBody';
import PostHeader from './PostHeader';
import Votes from './Votes';
import { useMutation } from '@apollo/client';
import { observer } from 'mobx-react-lite';

import {
  PostType,
  UpdateVoteDocument,
  UpdateVoteMutation,
  UpdateVoteMutationVariables,
} from 'gql';
import image from 'next/image';
import Router from 'next/router';
import clsx from 'clsx';

export interface PostPropsMain extends PostProps {
  updatedAt?: any;
}

function Post({
  title,
  body,
  upvotes = 0,
  totalComments = 0,
  user,
  id,
  createdAt,
  upvoteState,
  tags,
  type = '',
  className,
  image,
  pageMode = false,
}: PostPropsMain) {
  const [upvotesLocal, setUpvotesLocal] = useState(upvotes);
  const [upvoteStateLocal, setUpvoteStateLocal] = useState(upvoteState);
  const [updateVote, { data, error, loading }] = useMutation<
    UpdateVoteMutation,
    UpdateVoteMutationVariables
  >(UpdateVoteDocument);
  const handleVoting = (postId: string, type: 'upvotes' | 'downvotes') => {
    updateVote({ variables: { postId: postId, type: type } })
      .then((data) => {
        if (type !== upvoteStateLocal) {
          setUpvotesLocal((prev) => (type === 'upvotes' ? prev + 1 : prev - 1));
          setUpvoteStateLocal(type);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={clsx(`bg-white rounded-lg p-6 shadow-lg`, className)}>
      {!pageMode && (
        <ImageBar
          image={
            image
              ? image.source
              : 'https://images.unsplash.com/photo-1563089145-599997674d42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
          }
          className="mb-5"
        />
      )}

      <div className="flex">
        <Votes
          onUpVote={() => handleVoting(id, 'upvotes')}
          onDownVote={() => handleVoting(id, 'downvotes')}
          state={upvoteStateLocal}
        >
          {upvotesLocal}
        </Votes>

        <div className="ml-10 flex-1 ">
          <PostHeader user={user} className="mb-5" updatedAt={createdAt} />
          <div
            className="cursor-pointer"
            onClick={() => {
              Router.push(`/posts/` + id);
            }}
          >
            <PostBody
              id={id}
              title={title}
              tags={tags.map((ele) => ele.name)}
              postType={type as PostType}
              showFullBody={pageMode}
            >
              {body}
            </PostBody>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Post);
