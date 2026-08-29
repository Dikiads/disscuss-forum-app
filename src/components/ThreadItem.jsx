import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ThreadItem({
    id,
    title,
    body,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
    user,
    authUser,
    handleUpVote,
    handleDownVote
}) {
    const isUpVoted = upVotesBy.includes(authUser?.id);
    const isDownVoted = downVotesBy.includes(authUser?.id);

    return (
        <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md"
        >
            <header className="mb-2">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md mb-2">#{category}</span>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    <Link to={`/threads/${id}`} className="hover:text-blue-600 hover:underline">{title}</Link>
                </h3>
            </header>
            <div className="text-gray-600 mb-4 line-clamp-3">
                <p>{body.replace(/<[^>]+>/g, '').substring(0, 150)}...</p>
            </div>
            <footer className="flex items-center text-sm text-gray-500 gap-4">
                <button
                    onClick={() => handleUpVote(id, isUpVoted)}
                    className={`flex items-center gap-1 transition-colors ${isUpVoted ? 'text-blue-600' : 'hover:text-blue-600'}`}
                >
                    <i className={`${isUpVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i> {upVotesBy.length}
                </button>
                <button
                    onClick={() => handleDownVote(id, isDownVoted)}
                    className={`flex items-center gap-1 transition-colors ${isDownVoted ? 'text-red-500' : 'hover:text-red-500'}`}
                >
                    <i className={`${isDownVoted ? 'fa-solid' : 'fa-regular'} fa-thumbs-down`}></i> {downVotesBy.length}
                </button>
                <div className="flex items-center gap-1">
                    <i className="fa-regular fa-comment"></i> {totalComments}
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium mr-1">{new Date(createdAt).toLocaleDateString('id-ID')}</span>
                    <span className="text-xs">Oleh</span>
                    <span className="font-medium text-gray-700">{user.name}</span>
                </div>
            </footer>
        </motion.div>
    );
}

const userShape = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
};

ThreadItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    user: PropTypes.shape(userShape).isRequired,
    authUser: PropTypes.object,
    handleUpVote: PropTypes.func.isRequired,
    handleDownVote: PropTypes.func.isRequired,
};

export default React.memo(ThreadItem);
