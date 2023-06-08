import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getSingleUser } from "../utils/API";
import Auth from "../utils/auth";
import { getMe } from "../utils/API";

const SingleUser = () => {
  const [userData, setUserData] = useState([]);

  const userId = useParams();

  // console.log(userId);

  const Id = Object.values(userId);

  const fetchUser = () => {
    fetch(`/api/users/${Id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  };

  // async function fetchUsers() {
  //   try {
  //     const response = await getSingleUser(userId);
  //     const data = await response.json();
  //     console.log(data);
  //     setUserData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log(userData);

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

  console.log(thoughtData);

  // Filter to only show thoughts for single user
  const thoughts = thoughtData.filter(function (postsBy) {
    return postsBy.username === userData.user?.username;
  });

  console.log(thoughts);
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

  // console.log(loggedInUser);

  // ---- Function to handle adding a friend
  const handleAddFriend = (loggedInUserId, friendId) => {
    fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(loggedInUserId, friendId);
    // fetch(`/api/users/${friendId}/friends/${loggedInUserId}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  // --- Function to handle removing a friend
  const removeFriend = (loggedInUserId, friendId) => {
    fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(loggedInUserId, friendId);
  };

  return (
    <>
      <h1 className="text-center p-4">
        Viewing user profile: {userData.user?.username}
      </h1>
      <div className="col pb-4">
        <p>ID: {userData.user?.id}</p>
        <p>Username: {userData.user?.username}</p>
        <p>Email: {userData.user?.email}</p>
        <p>Friends: {userData.user?.friends}</p>
        <p>Thought(s):</p>
        {thoughts.map((thought) => (
          <p>{thought.thoughtText}</p>
        ))}

        <button
          onClick={() => handleAddFriend(loggedInUser._id, userData.user?.id)}
        >
          Add Friend
        </button>
        <button
          onClick={() => removeFriend(loggedInUser._id, userData.user?.id)}
        >
          Remove Friend
        </button>
      </div>
    </>
  );
};

export default SingleUser;
