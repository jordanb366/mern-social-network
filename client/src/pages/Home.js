import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { getAllUsers, getAllThoughts } from "../utils/API";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [thoughtData, setThoughtData] = useState([]);

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
      <h3 className="text-center p-4">All Thoughts</h3>
      <div className="container home-grid">
        {thoughtData.length ? (
          thoughtData.map((t) => {
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
                  <p className="small">Reactions: {t.reactions?.length || 0}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No thoughts yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
