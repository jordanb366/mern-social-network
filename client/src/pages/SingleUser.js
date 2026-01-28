import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { getMe } from "../utils/API";

const SingleUser = () => {
  const [userData, setUserData] = useState({});
  const [reactionText, setReactionText] = useState("");
  const [thoughtData, setThoughtData] = useState([]);
  const [loggedInUser, setLoggedInData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const { UserId } = useParams();

  const fetchSingleUser = async () => {
    if (!UserId) return;
    try {
      const res = await fetch(`/api/users/${UserId}`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchThoughts = async () => {
    try {
      const res = await fetch(`/api/thoughts/`);
      const data = await res.json();
      setThoughtData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const refreshLoggedInUser = async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) return;
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

  useEffect(() => {
    fetchSingleUser();
  }, [UserId]);

  useEffect(() => {
    fetchThoughts();
  }, []);

  useEffect(() => {
    refreshLoggedInUser();
  }, []);

  // follow (previously addFriend)
  const handleAddFriend = async (loggedInUserId, friendId) => {
    try {
      await fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      await refreshLoggedInUser();
      await fetchSingleUser();
    } catch (err) {
      console.error(err);
    }
  };

  // unfollow (previously removeFriend)
  const removeFriend = async (loggedInUserId, friendId) => {
    try {
      await fetch(`/api/users/${loggedInUserId}/friends/${friendId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await refreshLoggedInUser();
      await fetchSingleUser();
    } catch (err) {
      console.error(err);
    }
  };

  const createReaction = async (thoughtId) => {
    try {
      await fetch(`/api/thoughts/${thoughtId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reactionBody: reactionText,
          username: loggedInUser.username,
        }),
      });
      setReactionText("");
      await fetchThoughts();
    } catch (err) {
      console.error(err);
    }
  };

  const thoughts = thoughtData.filter((postsBy) => {
    return postsBy.username === userData.user?.username;
  });

  // check if logged-in user is following the viewed user
  const isFriend = !!loggedInUser?.following?.some((friend) => {
    const friendId = friend?._id ?? friend?.id ?? friend;
    const viewedId = userData?.user?._id ?? userData?.user?.id;
    return friendId && viewedId && friendId.toString() === viewedId.toString();
  });

  const followingList = userData.user?.following || [];
  const followersList = userData.user?.followers || [];

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
                  aria-label="Unfollow"
                >
                  {/* Unfollow SVG */}
                  Unfollow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success m-2"
                  onClick={() =>
                    handleAddFriend(loggedInUser._id, userData.user?.id)
                  }
                  aria-label="Follow"
                >
                  {/* Follow SVG */}
                  Follow
                </button>
              )}
            </>
          )}

          <p>Email: {userData.user?.email}</p>
          <p>
            Following:{" "}
            {followingList.map((friend, index) => (
              <span key={friend._id ?? friend}>
                <Link to={`/users/${friend._id ?? friend}`}>
                  {friend.username ?? friend}
                </Link>
                {index < followingList.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p>
            Followers:{" "}
            {followersList.map((friend, index) => (
              <span key={friend._id ?? friend}>
                <Link to={`/users/${friend._id ?? friend}`}>
                  {friend.username ?? friend}
                </Link>
                {index < followersList.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          {thoughts.map((thought) => (
            <div key={thought._id} className="mt-4 pt-4 card">
              <div className="card-body">
                <h4>Thoughts</h4>
                <p>{thought.thoughtText}</p>
                <p>Created at: {thought.createdAt}</p>

                {Auth.loggedIn() ? (
                  <form className="reaction-form">
                    <textarea
                      className="reaction-textarea p-2"
                      value={reactionText}
                      onChange={(e) => setReactionText(e.target.value)}
                    />
                    <button
                      type="button"
                      id={thought._id}
                      onClick={() => createReaction(thought._id)}
                      className="btn btn-success reaction-btn ms-2"
                    >
                      Create A Reaction
                    </button>
                  </form>
                ) : (
                  <p className="m-4">
                    Please <Link to="/login">log in</Link> to add a reaction.
                  </p>
                )}

                <hr />

                {thought.reactions && thought.reactions.length > 0 && (
                  <button
                    className="btn btn-info mb-3"
                    onClick={() =>
                      setIsVisible(
                        isVisible === thought._id ? null : thought._id,
                      )
                    }
                  >
                    {isVisible === thought._id ? "Hide" : "Show"} Reactions
                  </button>
                )}
                <hr />

                {isVisible === thought._id && (
                  <div className="reactions">
                    {(thought.reactions || []).map((reaction) => (
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
