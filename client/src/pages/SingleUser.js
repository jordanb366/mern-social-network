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
        Viewing user profile: {userData.user.username}
      </h1>
    </>
  );
};

export default SingleUser;
