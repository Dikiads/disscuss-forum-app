import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, authUser, handleUpVote, handleDownVote }) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.object,
  handleUpVote: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired,
};

export default ThreadList;
