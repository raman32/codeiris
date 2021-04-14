import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};


export type MagicLinkDto = {
  __typename?: 'MagicLinkDto';
  listener: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendMagicLink: MagicLinkDto;
};


export type MutationSendMagicLinkArgs = {
  email: Scalars['String'];
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  slug: Scalars['String'];
  status: PostStatus;
  title: Scalars['String'];
  type: PostType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  votes: Vote;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type PostOrder = {
  direction: OrderDirection;
  field: PostOrderFeild;
};

export enum PostOrderFeild {
  UpdatedAt = 'updatedAt',
  Votes = 'votes'
}

export enum PostStatus {
  Blocked = 'blocked',
  Draft = 'draft',
  Hidden = 'hidden',
  Published = 'published'
}

export enum PostType {
  Ask = 'ask',
  Job = 'job',
  Link = 'link'
}

export type Query = {
  __typename?: 'Query';
  getAuth: Auth;
  getPosts: PostConnection;
  getUsers: UserConnection;
  me: User;
};


export type QueryGetPostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrder>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrder>;
  skip?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  githubToken: Scalars['String'];
  googleToken: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  role: UserRole;
  status: UserStatus;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserOrder = {
  direction: OrderDirection;
  field: UserOrderField;
};

export enum UserOrderField {
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  MiddleName = 'middleName'
}

export enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user'
}

export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive'
}

export type Vote = {
  __typename?: 'Vote';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  post: Post;
  type: VoteType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
};

export enum VoteType {
  Downvotes = 'downvotes',
  Upvotes = 'upvotes'
}

export type SendMagicLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMagicLinkMutation = (
  { __typename?: 'Mutation' }
  & { sendMagicLink: (
    { __typename?: 'MagicLinkDto' }
    & Pick<MagicLinkDto, 'status' | 'listener'>
  ) }
);


export const SendMagicLinkDocument = gql`
    mutation sendMagicLink($email: String!) {
  sendMagicLink(email: $email) {
    status
    listener
  }
}
    `;
export type SendMagicLinkMutationFn = Apollo.MutationFunction<SendMagicLinkMutation, SendMagicLinkMutationVariables>;

/**
 * __useSendMagicLinkMutation__
 *
 * To run a mutation, you first call `useSendMagicLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMagicLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMagicLinkMutation, { data, loading, error }] = useSendMagicLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendMagicLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMagicLinkMutation, SendMagicLinkMutationVariables>(SendMagicLinkDocument, options);
      }
export type SendMagicLinkMutationHookResult = ReturnType<typeof useSendMagicLinkMutation>;
export type SendMagicLinkMutationResult = Apollo.MutationResult<SendMagicLinkMutation>;
export type SendMagicLinkMutationOptions = Apollo.BaseMutationOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>;