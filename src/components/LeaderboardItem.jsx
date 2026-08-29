import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboards-item flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm mb-3">
      <div className="leaderboards-item__user-info flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold text-gray-800">{user.name}</span>
      </div>
      <div className="leaderboards-item__score font-bold text-blue-600 text-lg">
        {score}
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
