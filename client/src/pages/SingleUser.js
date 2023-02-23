import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { getSingleUser } from "../utils/API";

const SingleUser = () => {
  const [userData, setUserData] = useState([]);

  const userId = useParams();

  console.log(userId);

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

  console.log(userData);

  useEffect(() => {
    fetchUser();
  }, []);

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
        <p>Thoughts: {userData.user?.thoughts}</p>
      </div>
    </>
  );
};

export default SingleUser;
