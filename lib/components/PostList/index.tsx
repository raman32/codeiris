import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { GetPostsDocument, GetPostsQuery, QueryGetPostsArgs } from 'gql';
import { skipper } from 'lib/accessToken';
import { PostProps } from 'lib/common/props/PostProps';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../atomic/spinner';
import Filter from '../Filter';
import Post from '../Shared/Post';
import FilterBar from 'lib/components/Home/FilterBar';
import SectionTitle from '../Home/SectionTitle';
import { DiscussionIcon } from '../Icons';
import { PostOrder } from 'src/models/input/post-order.input';
import { PostType } from '.prisma/client';

export interface PostListProps {
  initialPosts?: PostProps[];
  intialType?: PostType;
  className?: string;
}
const PostList: React.FC<PostListProps> = ({
  initialPosts = [],
  intialType = 'ask',
  className,
}) => {
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);
  const [cursor, setCursor] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [tags, setTags] = useState([]);
  const [variables, setVariables] = useState({
    after: cursor,
    first: 10,
    tags: tags.map((ele) => ele.name),
    type: intialType,
    field: 'createdAt',
    direction: 'desc',
  });
  const { loading, data, error } = useQuery<GetPostsQuery, QueryGetPostsArgs>(
    GetPostsDocument,
    {
      variables: variables,
      skip: skipper(),
    },
  );
  const handleTagFilter = () => {
    setPosts([]);
    setVariables((prev) => ({
      ...prev,
      after: '',
      tags: tags.map((ele) => ele.name),
    }));
  };
  const handleSort = ({ field, direction }: PostOrder) => {
    setPosts([]);
    setVariables((prev) => ({
      ...prev,
      after: '',
      field: field,
      direction: direction,
    }));
  };
  useEffect(() => {
    if (hasNextPage)
      window.addEventListener('scroll', function () {
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight > scrollHeight - 20 && !loading) {
          console.log('Adding to page');
          const cursor = posts.length > 0 ? posts[posts.length - 1].id : '';
          setVariables((prev) => ({
            ...prev,
            after: cursor,
          }));
        }
      });
  }, []);
  useEffect(() => {
    if (!loading) {
      if (!!data) {
        const length = data.getPosts.edges.length;
        if (length < 1) return;
        setCursor(data.getPosts.edges[length - 1].node.id);
        setHasNextPage(data.getPosts.pageInfo.hasNextPage);
        const newPosts = data.getPosts.edges.map((ele) => ({
          id: ele.node.id,
          title: ele.node.title,
          body: ele.node.body,
          user: {
            firstName: ele.node.user.firstName,
            lastName: ele.node.user.lastName,
            image: ele.node.user.image,
          },
          upvoteState: ele.node.upvoteState as
            | 'upvotes'
            | 'downvotes'
            | 'notvoted'
            | 'disabled',
          upvotes: ele.node.totalVotes,
          totalComments: ele.node.totalComments,
          ...ele.node,
        }));
        setPosts((prev) => [...prev, ...newPosts]);
      }
      if (!!error) {
        console.log(error);
      }
    }
  }, [loading, data, error]);
  return (
    <div>
      <FilterBar className="" handleSort={handleSort} />

      <SectionTitle
        className="my-10"
        color="primary"
        icon={<DiscussionIcon color="white" size={4} />}
      >
        Threads & Discussions
      </SectionTitle>
      <Filter onFilter={handleTagFilter} tags={tags} setTags={setTags}></Filter>
      <div className="container">
        {posts.map((ele) => (
          <div className={clsx('mr-60', className)}>
            <Post
              key={ele.id}
              id={ele.id}
              title={ele.title}
              body={ele.body}
              type={ele.type}
              upvotes={ele.upvotes}
              upvoteState={ele.upvoteState}
              user={ele.user}
              totalComments={ele.totalComments}
              createdAt={moment(ele.createdAt).fromNow()}
              tags={ele.tags ? ele.tags : []}
              image={ele.image}
              className="mb-5"
            />
          </div>
        ))}
        {loading ? <Spinner className="align-middle" size="large" /> : null}
      </div>
    </div>
  );
};

export default PostList;
