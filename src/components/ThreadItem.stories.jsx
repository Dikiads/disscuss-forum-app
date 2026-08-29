import React from 'react';
import ThreadItem from './ThreadItem';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = (args) => <ThreadItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'thread-1',
  title: 'Contoh Judul Diskusi',
  body: 'Ini adalah contoh isi body diskusi untuk Storybook.',
  category: 'react',
  createdAt: new Date().toISOString(),
  upVotesBy: ['user-1'],
  downVotesBy: [],
  totalComments: 5,
  user: {
    id: 'user-2',
    name: 'Dimas',
    email: 'dimas@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dimas',
  },
  authUser: { id: 'user-1' },
  handleUpVote: () => alert('Upvoted!'),
  handleDownVote: () => alert('Downvoted!'),
};
