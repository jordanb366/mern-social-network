import React, { useEffect, useState } from "react";
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

  return (
    <>
      <h2 className="text-center p-4 m-4">You are Viewing All Users</h2>
      <div className="container">
        {userData.users?.map((data) => {
          return (
            <div className="row align-items-center" key={data.id}>
              <div className="col pb-4">
                <Link as={Link} to={`users/${data.id}`}>
                  View Profile
                </Link>
                <p>ID: {data.id}</p>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="text-center p-4">All Thoughts</h3>
      <div className="container">
        {thoughtData.length ? (
          thoughtData.map((t) => (
            <div className="card mb-3" key={t._id}>
              <div className="card-body">
                <h5 className="card-title">Post by: {t.username}</h5>
                <p className="card-text">{t.thoughtText}</p>
                <p className="text-muted">{t.createdAt}</p>
                <p className="small">Reactions: {t.reactions?.length || 0}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No thoughts yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
