import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getSingleUser } from "../utils/API";
import Auth from "../utils/auth";
import { getMe } from "../utils/API";

const SingleUser = () => {
  const [userData, setUserData] = useState([]);
  const [reactionText, setReactionText] = useState("");

  const userId = useParams();

  const Id = Object.values(userId);

  const fetchUser = () => {
    fetch(`/api/users/${Id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUserData(data);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Get the thought data from data base to the front-end
  const [thoughtData, setThoughtData] = useState([]);

  // Get request for thoughts
  const fetchThoughts = () => {
    fetch(`/api/thoughts/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setThoughtData(data);
      });
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  // console.log(thoughtData);

  // Filter to only show thoughts for single user
  const thoughts = thoughtData.filter(function (postsBy) {
    return postsBy.username === userData.user?.username;
  });

  // console.log(thoughts);
  // ---------------- Retrieving data for logged in user

  // Find the id of the logged in user
  const [loggedInUser, setLoggedInData] = useState([]);
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
        setLoggedInData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // ---- Function to handle adding a friend
  const handleAddFriend = (loggedInUserId, friendId) => {
    fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // --- Function to handle removing a friend
  const removeFriend = (loggedInUserId, friendId) => {
    fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createReaction = (thoughtId) => {
    fetch(`/api/thoughts/${thoughtId}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reactionBody: reactionText,
        username: loggedInUser.username,
      }),
    });
    console.log(reactionText);
    console.log(thoughtId);
  };

  return (
    <>
      <h1 className="text-center p-4">
        Viewing user profile: {userData.user?.username}
      </h1>
      <div className="col pb-4">
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={() => handleAddFriend(loggedInUser._id, userData.user?.id)}
        >
          Add Friend
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={() => removeFriend(loggedInUser._id, userData.user?.id)}
        >
          Remove Friend
        </button>
        <p>ID: {userData.user?.id}</p>
        <p>Username: {userData.user?.username}</p>
        <p>Email: {userData.user?.email}</p>
        <p>Friends: {userData.user?.friends}</p>
        <p>Thought(s):</p>
        {thoughts.map((thought) => (
          <div key={thought._id} className="mt-4 pt-4">
            <p>{thought.thoughtText}</p>
            <p>Created at: {thought.createdAt}</p>
            <form className="form-inline">
              <textarea
                // name="Reaction"
                // value={reactionText}
                onChange={(e) => setReactionText(e.target.value)}
                className="p-4 m-4"
              ></textarea>
              <button
                onClick={() => createReaction("647e43fb6cb54028d9964d0c")}
                className="btn btn-success m-4"
              >
                Create A Reaction
              </button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleUser;
