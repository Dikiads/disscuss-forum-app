import React from 'react';
import PropTypes from 'prop-types';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <header className="flex items-center gap-2 mb-3">
        <img src={owner.avatar} alt="User" className="w-6 h-6 rounded-full" />
        <span className="font-bold text-sm text-gray-800">{owner.name}</span>
        <span className="text-xs font-medium text-gray-400 ml-auto">
          {new Date(createdAt).toLocaleDateString('id-ID')}
        </span>
      </header>
      <div
        className="text-gray-700 text-sm mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <footer className="flex items-center gap-4 text-xs font-semibold text-gray-600">
        <button
          onClick={() => upVote(id, isUpVoted)}
          className={`flex items-center gap-1 hover:text-blue-600 ${isUpVoted ? 'text-blue-600' : ''}`}
        >
          <i
            className={`${isUpVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}
          ></i>{' '}
          {upVotesBy.length}
        </button>
        <button
          onClick={() => downVote(id, isDownVoted)}
          className={`flex items-center gap-1 hover:text-red-500 ${isDownVoted ? 'text-red-500' : ''}`}
        >
          <i
            className={`${isDownVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-down`}
          ></i>{' '}
          {downVotesBy.length}
        </button>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.object,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default React.memo(CommentItem);
