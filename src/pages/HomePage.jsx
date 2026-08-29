import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread, asyncToggleNeutralVoteThread } from '../states/threads/slice';
import { motion } from 'framer-motion';
import CategoryList from '../components/CategoryList';
import ThreadList from '../components/ThreadList';

function HomePage() {
    const threads = useSelector((state) => state.threads);
    const users = useSelector((state) => state.users);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads());
    }, [dispatch]);

    const handleUpVote = useCallback((threadId, isUpVoted) => {
        if (isUpVoted) dispatch(asyncToggleNeutralVoteThread(threadId));
        else dispatch(asyncToggleUpVoteThread(threadId));
    }, [dispatch]);

    const handleDownVote = useCallback((threadId, isDownVoted) => {
        if (isDownVoted) dispatch(asyncToggleNeutralVoteThread(threadId));
        else dispatch(asyncToggleDownVoteThread(threadId));
    }, [dispatch]);

    const categories = Array.from(new Set(threads.map((t) => t.category)));

    const threadList = threads
        .filter((thread) => !activeCategory || thread.category === activeCategory)
        .map((thread) => {
            const user = users.find((u) => u.id === thread.ownerId) || {};
            return { ...thread, user };
        });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto py-4"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Semua Diskusi</h2>

            <CategoryList
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <ThreadList
                threads={threadList}
                authUser={authUser}
                handleUpVote={handleUpVote}
                handleDownVote={handleDownVote}
            />
        </motion.div>
    );
}

export default HomePage;
