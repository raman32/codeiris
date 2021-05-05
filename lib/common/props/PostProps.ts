import React from 'react';
import { UserProps } from './UserProps';

export interface PostProps {
  id?: string;
  title?: string;
  body?: string;
  upvotes?: number;
  user?: any;
  totalComments?: number;
  createdAt: string;
  upvoteState?: 'upvotes' | 'downvotes' | 'notvoted' | 'disabled';
  className?: string;
  tags?: {id:string, name:string}[];
  image: {
    preview: string;
    source: string;
  };
  type?: string;
  pageMode?: boolean;
}
