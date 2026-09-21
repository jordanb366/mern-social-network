import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { getAllUsers, getAllThoughts } from "../utils/API";
import Hero from "../components/Hero";
import SuggestedUsers from "../components/SuggestedUsers";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [thoughtData, setThoughtData] = useState([]);
  const [filter, setFilter] = useState("latest");

  const getFilteredThoughts = () => {
    let filtered = [...thoughtData];

    if (filter === "trending") {
      // Sort by reaction count (most reacted first)
      filtered.sort(
        (a, b) => (b.reactions?.length || 0) - (a.reactions?.length || 0),
      );
    } else if (filter === "latest") {
      // Sort by date (most recent first)
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  async function fetchUsers() {
    try {
      const response = await getAllUsers();
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchThoughts() {
    try {
      const res = await getAllThoughts();
      const data = await res.json();
      setThoughtData(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchThoughts();
  }, []);

  const usersByName = (userData.users || []).reduce((acc, u) => {
    acc[u.username] = u;
    return acc;
  }, {});

  return (
    <>
      <Hero />
      <div className="home-page-container">
        <div className="feed-section">
          <div className="feed-header">
            <h3 className="text-center p-4">Discover Ideas from Developers</h3>

            {/* Filter Tabs */}
            <div className="filter-tabs">
              <button
                className={`filter-btn ${filter === "latest" ? "active" : ""}`}
                onClick={() => setFilter("latest")}
              >
                ✨ Latest
              </button>
              <button
                className={`filter-btn ${filter === "trending" ? "active" : ""}`}
                onClick={() => setFilter("trending")}
              >
                🔥 Trending
              </button>
            </div>
          </div>

          <div className="container home-grid">
            {getFilteredThoughts().length ? (
              getFilteredThoughts().map((t) => {
                // ... existing card code ...
                const user = usersByName[t.username];
                const userId = user?._id || user?.id;
                return (
                  <div className="card mb-3" key={t._id}>
                    <div className="card-body">
                      <h5 className="card-title">
                        Post by:{" "}
                        {userId ? (
                          <Link to={`/users/${userId}`}>{t.username}</Link>
                        ) : (
                          t.username
                        )}
                      </h5>
                      <p className="card-text">{t.thoughtText}</p>
                      <p className="text-muted">{t.createdAt}</p>
                      <p className="small">
                        Reactions: {t.reactions?.length || 0}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No thoughts yet.</p>
            )}
          </div>
        </div>

        <SuggestedUsers
          allUsers={userData.users || userData}
          currentUser={null}
        />
      </div>
    </>
  );
};

export default Home;
