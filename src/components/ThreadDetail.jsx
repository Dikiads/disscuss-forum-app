import React from 'react';
import PropTypes from 'prop-types';

function ThreadDetail({ threadDetail, authUser, upVoteThread, downVoteThread }) {
  const isThreadUpVoted = threadDetail.upVotesBy.includes(authUser?.id);
  const isThreadDownVoted = threadDetail.downVotesBy.includes(authUser?.id);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <header className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">#{threadDetail.category}</span>
          <span className="text-xs text-gray-400 font-medium">{new Date(threadDetail.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{threadDetail.title}</h2>
      </header>

      <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: threadDetail.body }}></div>

      <footer className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <button onClick={() => upVoteThread(isThreadUpVoted)} className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${isThreadUpVoted ? 'text-blue-600' : ''}`}>
            <i className={`${isThreadUpVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i> {threadDetail.upVotesBy.length}
          </button>
          <button onClick={() => downVoteThread(isThreadDownVoted)} className={`flex items-center gap-1 hover:text-red-500 transition-colors ${isThreadDownVoted ? 'text-red-500' : ''}`}>
            <i className={`${isThreadDownVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-down`}></i> {threadDetail.downVotesBy.length}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <p className="text-gray-500">Dibuat oleh</p>
            <p className="font-semibold text-gray-800">{threadDetail.owner.name}</p>
          </div>
          <img src={threadDetail.owner.avatar} alt="Owner" className="w-9 h-9 rounded-full bg-gray-100" />
        </div>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  threadDetail: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape(ownerShape).isRequired,
  }).isRequired,
  authUser: PropTypes.object,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export default ThreadDetail;
