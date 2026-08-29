import React, { useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
    asyncReceiveThreadDetail,
    asyncAddComment,
    asyncClearThreadDetail,
    asyncToggleUpVoteThreadDetail,
    asyncToggleDownVoteThreadDetail,
    asyncToggleNeutralVoteThreadDetail,
    asyncToggleUpVoteComment,
    asyncToggleDownVoteComment,
    asyncToggleNeutralVoteComment
} from '../states/threadDetail/slice';
import Swal from 'sweetalert2';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
    const { id } = useParams();
    const threadDetail = useSelector((state) => state.threadDetail);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
        return () => {
            dispatch(asyncClearThreadDetail());
        };
    }, [id, dispatch]);

    const handleComment = useCallback((content) => {
        if (!authUser) {
            return Swal.fire('Error!', 'Silakan login terlebih dahulu.', 'error');
        }
        dispatch(asyncAddComment({ threadId: id, content }));
    }, [authUser, dispatch, id]);

    const handleUpVoteThread = useCallback((isUpVoted) => {
        if (!authUser) return Swal.fire('Error!', 'Silakan login terlebih dahulu.', 'error');
        if (isUpVoted) dispatch(asyncToggleNeutralVoteThreadDetail());
        else dispatch(asyncToggleUpVoteThreadDetail());
    }, [authUser, dispatch]);

    const handleDownVoteThread = useCallback((isDownVoted) => {
        if (!authUser) return;
        if (isDownVoted) dispatch(asyncToggleNeutralVoteThreadDetail());
        else dispatch(asyncToggleDownVoteThreadDetail());
    }, [authUser, dispatch]);

    const handleUpVoteComment = useCallback((commentId, isUpVoted) => {
        if (!authUser) return Swal.fire('Error!', 'Silakan login terlebih dahulu.', 'error');
        if (isUpVoted) dispatch(asyncToggleNeutralVoteComment(commentId));
        else dispatch(asyncToggleUpVoteComment(commentId));
    }, [authUser, dispatch]);

    const handleDownVoteComment = useCallback((commentId, isDownVoted) => {
        if (!authUser) return;
        if (isDownVoted) dispatch(asyncToggleNeutralVoteComment(commentId));
        else dispatch(asyncToggleDownVoteComment(commentId));
    }, [authUser, dispatch]);

    if (!threadDetail) {
        return (
            <div className="flex flex-col items-center justify-center mt-32">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"></div>
                <p className="text-gray-500 text-sm font-medium">Memuat info detail...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto space-y-6"
        >
            <ThreadDetail
                threadDetail={threadDetail}
                authUser={authUser}
                upVoteThread={handleUpVoteThread}
                downVoteThread={handleDownVoteThread}
            />

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Beri Komentar</h3>
                {authUser ? (
                    <CommentInput addComment={handleComment} />
                ) : (
                    <div className="bg-gray-50 text-center p-6 rounded-lg border border-gray-100 mb-8 max-w-sm mx-auto text-sm">
                        Tolong <Link to="/login" className="text-blue-600 font-bold underline">Login</Link> untuk berpartisipasi memberi komentar.
                    </div>
                )}

                <h3 className="font-bold text-gray-800 mb-4 whitespace-nowrap">Komentar ({threadDetail.comments.length})</h3>
                <CommentList
                    comments={threadDetail.comments}
                    authUser={authUser}
                    upVote={handleUpVoteComment}
                    downVote={handleDownVoteComment}
                />
            </div>
        </motion.div>
    );
}

export default DetailPage;
