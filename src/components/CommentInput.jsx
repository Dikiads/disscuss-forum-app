import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const handleComment = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleComment} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tuliskan pendapat Anda..."
        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none h-24 mb-3"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm"
      >
        Kirim Komentar
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
