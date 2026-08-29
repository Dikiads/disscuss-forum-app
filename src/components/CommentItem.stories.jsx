import React from 'react';
import CommentItem from './CommentItem';

export default {
    title: 'Components/CommentItem',
    component: CommentItem,
};

const Template = (args) => <CommentItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: 'comment-1',
    content: 'Ini adalah komentar balasan yang sangat informatif.',
    createdAt: new Date().toISOString(),
    owner: {
        id: 'user-3',
        name: 'Gilang',
        avatar: 'https://ui-avatars.com/api/?name=Gilang',
    },
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    authUser: { id: 'user-1' },
    upVote: () => alert('Komentar Upvoted!'),
    downVote: () => alert('Komentar Downvoted!'),
};
