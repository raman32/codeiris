import DefaultLayout from '../layouts/defaultLayout';
import React, { useState } from 'react';
import { NextPageContext } from 'next';
import superjson from 'superjson';
import Heading, { HeadingSize } from '../../lib/components/atomic/typography';
import moment from 'moment';
import CommentsInput from '../../lib/components/Comments/CommentsInput';
import { useQuery } from '@apollo/client';
import {
  GetCommentsDocument,
  GetCommentsQuery,
  GetCommentsQueryVariables,
} from '../../gql';
import CommentListItem from '../../lib/components/Comments/CommentListItem';
import Button from '../../lib/components/atomic/button';
import Spinner from '../../lib/components/atomic/spinner';
import { SpinnerSize } from '../../lib/common/props/SpinnerProps';
import Container from 'lib/components/atomic/containers/Container';
import Post from './../../lib/components/Shared/Post/';
import { CommentIcon } from 'lib/components/Icons';

interface Props {
  postData: string;
}

function PostPage({ postData }: Props) {
  const [first, setFirst] = useState(10);
  const post: any = superjson.parse(postData);
  const { data, loading, error } = useQuery<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >(GetCommentsDocument, {
    variables: { post: post.id, first },
    pollInterval: 3000,
  });
  console.log(data);
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1563089145-599997674d42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        className="w-full mb-5 h-60 object-cover"
      />

      <div className="absolute top-0 mt-40 pb-10 w-full">
        <Container>
          <Post
            id={post.id}
            title={post.title}
            type={post.type}
            body={post.body}
            upvotes={post.upvotes}
            upvoteState={post.upvoteState}
            user={post.user}
            totalComments={post.totalComments}
            updatedAt={moment(post.updatedAt).fromNow()}
            tags={post.tags ? post.tags : []}
            className="mb-5"
            pageMode={true}
          />

          <div className="flex items-center text-lg text-primary mb-2 mt-12">
            <CommentIcon className="mr-3" />
            All Comments
            <div className="flex-1" />
            <>[{post._count.comments}]</>
          </div>

          <div className="w-full rounded-lg overflow-hidden shadow-lg p-7 bg-white mt-5">
            <CommentsInput postId={post.id} />

            {loading && (
              <div className="flex justify-center items-center mt-5">
                <Spinner size={SpinnerSize.small} />
              </div>
            )}

            <div className="mt-5">
              {!loading && !error && data && (
                <div>
                  {data.getComments.edges.map((comments) => (
                    <CommentListItem comment={comments.node} child={true} />
                  ))}
                </div>
              )}
            </div>
            {data && data.getComments.totalCount > first && (
              <div className="flex justify-center items-center">
                <Button
                  loading={loading}
                  disabled={loading}
                  className="bg-white text-blueGray-500"
                  loaderClass="bg-primary"
                  onClick={() => {
                    if (
                      data.getComments.totalCount + 10 >
                      data.getComments.totalCount
                    ) {
                      setFirst(first + 10);
                    } else {
                      setFirst(data.getComments.totalCount);
                    }
                  }}
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

PostPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      postData: ctx.query.data as string,
    },
  };
}

export default PostPage;
