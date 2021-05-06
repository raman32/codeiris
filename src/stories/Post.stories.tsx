import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PostProps } from '../../lib/common/props/PostProps';
import Post from '../../lib/components/Shared/Post';

export default {
  title: 'Post/Post',
  component: Post,
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

export const Sample = Template.bind({});
Sample.args = {
  head: 'test header',
  body: `Amet enim cupidatat dolor consectetur laborum. Enim minim nostrud et nostrud elit culpa et culpa adipisicing veniam. Officia incididunt enim elit incididunt dolor ut et aliqua nisi enim laborum cillum eiusmod proident. Consectetur nostrud et velit ad id cupidatat cillum ex ullamco aliquip.

Irure non veniam aliqua cillum ut excepteur est excepteur eiusmod sint dolor cillum ullamco. Non mollit esse aute anim officia enim consequat ex nostrud ex aute quis irure exercitation. Excepteur ipsum nostrud exercitation in proident magna laboris proident aliquip exercitation veniam duis. Ipsum incididunt ea aute commodo ad ipsum proident voluptate minim ullamco ex aliqua. Quis dolor eu consequat nulla ullamco. Aliquip occaecat dolor proident velit irure ut in do.`,
  upvotes: 10,
  user: {
    email: 'some@some.com',
    firstName: 'some',
    middleName: '',
    lastName: 'speed',
    status: 'active',
    role: 'user',
  },
};
