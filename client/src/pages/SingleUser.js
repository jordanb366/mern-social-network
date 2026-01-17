import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getSingleUser } from "../utils/API";
import Auth from "../utils/auth";
import { getMe } from "../utils/API";

const SingleUser = () => {
  const [userData, setUserData] = useState([]);
  const [reactionText, setReactionText] = useState("");

  const { UserId } = useParams();

  useEffect(() => {
    if (!UserId) return;
    fetch(`/api/users/${UserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.error(err));
  }, [UserId]);

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

  const [isVisible, setIsVisible] = useState(false);

  const isFriend = !!loggedInUser?.friends?.some((friend) => {
    const friendId = friend?._id ?? friend?.id ?? friend; // support object or id string
    const viewedId = userData?.user?._id ?? userData?.user?.id;
    return friendId && viewedId && friendId.toString() === viewedId.toString();
  });

  return (
    <>
      <h1 className="text-center p-4">
        Viewing user profile: {userData.user?.username}
      </h1>
      <div className="container">
        <div className="col pb-4">
          {Auth.loggedIn() && (
            <>
              {isFriend ? (
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  onClick={() =>
                    removeFriend(loggedInUser._id, userData.user?.id)
                  }
                  aria-label="Remove friend"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                    aria-hidden="true"
                  >
                    <path d="M13.485 1.929a.75.75 0 0 1 0 1.06L6.56 9.914a.75.75 0 0 1-1.06 0L2.515 7.93a.75.75 0 1 1 1.06-1.06L5.5 8.799 12.425 1.93a.75.75 0 0 1 1.06 0z" />
                  </svg>
                  Remove Friend
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={() =>
                    handleAddFriend(loggedInUser._id, userData.user?.id)
                  }
                  aria-label="Add friend"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    style={{ marginRight: 8, verticalAlign: "text-bottom" }}
                    aria-hidden="true"
                  >
                    <path d="M8 1a.5.5 0 0 1 .5.5V7.5H14a.5.5 0 0 1 0 1H8.5V14a.5.5 0 0 1-1 0V8.5H2a.5.5 0 0 1 0-1h5.5V1.5A.5.5 0 0 1 8 1z" />
                  </svg>
                  Add Friend
                </button>
              )}
            </>
          )}
          <p>ID: {userData.user?.id}</p>
          <p>Username: {userData.user?.username}</p>
          <p>Email: {userData.user?.email}</p>
          <p>
            Friends:{" "}
            {userData.user?.friends?.map((friend, index) => (
              <span key={friend._id}>
                <Link to={`/users/${friend._id}`}>{friend.username}</Link>
                {index < userData.user.friends.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p></p>
          {thoughts.map((thought) => (
            <div key={thought._id} className="mt-4 pt-4 card">
              <div className="card-body">
                <h4>Thoughts</h4>
                <p>{thought.thoughtText}</p>
                <p>Created at: {thought.createdAt}</p>
                <p>{}</p>
                <form className="form-inline">
                  <textarea
                    // name="Reaction"
                    // value={reactionText}
                    onChange={(e) => setReactionText(e.target.value)}
                    className="p-4 m-4"
                  ></textarea>
                  <button
                    id={thought._id}
                    onClick={(e) => createReaction(e.currentTarget.id)}
                    className="btn btn-success m-4"
                  >
                    Create A Reaction
                  </button>
                </form>
                <>
                  <hr />
                </>
                <button
                  className="btn btn-info mb-3"
                  onClick={() =>
                    setIsVisible(isVisible === thought._id ? null : thought._id)
                  }
                >
                  {isVisible === thought._id ? "Hide" : "Show"} Reactions
                </button>
                <hr />

                {/* Reactions - Only visible if this thought's ID matches */}
                {isVisible === thought._id && (
                  <div className="reactions">
                    {thought.reactions.map((reaction) => (
                      <div key={reaction._id}>
                        <p>{reaction.reactionBody}</p>
                        <p>Reaction By: {reaction.username}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleUser;
