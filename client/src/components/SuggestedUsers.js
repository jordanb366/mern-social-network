import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SuggestedUsers.css";

const SuggestedUsers = ({ allUsers = [], currentUser = null }) => {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    // Filter out current user and get 6 random users
    const filtered = Array.isArray(allUsers)
      ? allUsers.filter((u) => u._id !== currentUser?._id)
      : [];

    const randomUsers = filtered.sort(() => Math.random() - 0.5).slice(0, 6);

    setSuggested(randomUsers);
  }, [allUsers, currentUser]);

  return (
    <aside className="suggested-sidebar">
      <div className="sidebar-header">
        <h4>🌟 Suggested Developers</h4>
      </div>

      <div className="suggested-list">
        {suggested.length > 0 ? (
          suggested.map((user) => (
            <div className="suggested-card" key={user._id}>
              <div className="user-info">
                <Link to={`/users/${user._id}`} className="username-link">
                  {user.username}
                </Link>
                <p className="follower-count">
                  👥 {user.followers?.length || 0} followers
                </p>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))
        ) : (
          <p className="no-users">No users to suggest</p>
        )}
      </div>
    </aside>
  );
};

export default SuggestedUsers;
