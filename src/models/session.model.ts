import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';
import { DeepPartial } from '../common';

@ObjectType()
export class Session extends BaseModel {
  constructor(input?: DeepPartial<Session>) {
    super(input);
  }

  type: 'AUTHENTICATED' | 'ANONYMOUS' | 'MAGIC';
  token: string;
  authToken: string;
  refreshToken: string;
  expires: Date;
  invalidate: boolean;
  @Field(() => User)
  user: User;
  googleToken: string;
  githubToken: string;
}
