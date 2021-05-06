export interface PostProps {
  id?: string;
  title?: string;
  body?: string;
  upvotes?: number;
  user?: any;
  totalComments?: number;
  createdAt?: string;
  upvoteState?: 'upvotes' | 'downvotes' | 'notvoted' | 'disabled';
  className?: string;
  tags?: any[];
  image?: {
    preview: string;
    source: string;
  };
  type?: string;
  pageMode?: boolean;
}
