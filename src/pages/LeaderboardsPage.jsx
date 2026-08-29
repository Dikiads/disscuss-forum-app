import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/slice';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboards-page max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-3">
        <i className="fa-solid fa-trophy text-yellow-500"></i> Klasemen Pengguna Aktif
      </h2>
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardsPage;
