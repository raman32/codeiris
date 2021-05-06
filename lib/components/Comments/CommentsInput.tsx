import TextArea from '../atomic/textArea';
import React, { useState } from 'react';
import Button from '../atomic/button';
import { useMutation } from '@apollo/client';
import {
  CreateCommentDocument,
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from '../../../gql';
import Toaster from '../atomic/toast/Toaster';
import { Intent, Position } from '../../common';

interface CommentProps {
  postId?: string;
  parentId?: string;
}

const AppToaster = Toaster.create({ position: Position.TOP });

function CommentsInput({ postId, parentId }: CommentProps) {
  const [comment, setComment] = useState('');

  const [CreateComment, { ...createCommentData }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument);

  return (
    <>
      <div className="flex">
        <TextArea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="w-full"
          label="New Comment"
          placeholder="Type your comment here..."
        />
      </div>
      <div className="flex">
        {comment !== '' && (
          <Button
            loading={createCommentData.loading}
            onClick={() => {
              if (comment === '') {
                AppToaster.show({
                  message: 'You must enter a comment first!',
                  intent: Intent.ERROR,
                });
              }
              CreateComment({
                variables: {
                  postId: postId,
                  parentId: parentId,
                  body: comment,
                },
              })
                .then((value) => {
                  AppToaster.show({
                    message: 'Comment Posted',
                    intent: Intent.SUCCESS,
                  });
                  setComment('');
                })
                .catch((error) =>
                  AppToaster.show({
                    message: error.message,
                    intent: Intent.ERROR,
                  }),
                );
            }}
            className="mt-2"
          >
            Comment
          </Button>
        )}
      </div>
    </>
  );
}
export default CommentsInput;
