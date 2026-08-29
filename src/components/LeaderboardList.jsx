import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboards-list">
      <header className="leaderboards-item__header-label flex justify-between px-4 py-2 text-sm font-bold text-gray-500 mb-2">
        <span>Pengguna</span>
        <span>Skor</span>
      </header>
      {leaderboards.map(({ user, score }) => (
        <LeaderboardItem key={user.id} user={user} score={score} />
      ))}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LeaderboardList;
