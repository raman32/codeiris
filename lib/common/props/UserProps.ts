export interface UserProps {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  status?: 'active' | 'blocked' | 'inactive';
  googleToken?: string;
  githubToken?: string;
  role: 'admin' | 'moderator' | 'user';
  image?: string;
}
