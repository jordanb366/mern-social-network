import React, { useEffect, useState } from "react";

import { getMe } from "../utils/API";
import Auth from "../utils/auth";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [thoughtText, setThoughtText] = useState("");

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  console.log(userData);

  // ---- Create a thought POST request to send to database

  const createThought = () => {
    fetch(`/api/thoughts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thoughtText: thoughtText,
        username: userData.username,
        userId: userData._id,
      }),
    });
    console.log(createThought);
  };

  return (
    <>
      <h1 className="text-center p-4">
        Welcome to your profile, {userData.username}!
      </h1>
      <div className="container">
        <h1>{userData.username}</h1>
      </div>
      <div>
        <p className="p-4">Create a new thought:</p>
        <form className="form-inline">
          <textarea
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
            className="p-4 m-4"
          ></textarea>
          <button
            onClick={() => createThought()}
            className="btn btn-success m-4"
          >
            Create Thought
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
