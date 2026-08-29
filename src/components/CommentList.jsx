import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({ comments, authUser, upVote, downVote }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.object,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentList;
