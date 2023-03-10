import React, { useEffect, useState } from "react";

import { getMe } from "../utils/API";
import Auth from '../utils/auth';

const Profile = () => {


const [userData, setUserData] = useState({});

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
        throw new Error('something went wrong!');
      }

      const user = await response.json();
      setUserData(user);
    } catch (err) {
      console.error(err);
    }
  };

  getUserData();
}, [userDataLength]);

console.log(userData)

  return (
    <>
      <h1 className="text-center p-4">Welcome to your profile, {userData.username}!</h1>
      <div className="container">
          <h1>{userData.username}</h1>
      </div>
    </>
  );
};

export default Profile;
