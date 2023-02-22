import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../utils/API";

const Home = () => {
  const [userData, setUserData] = useState([]);

  // const fetchUsers = () => {
  //   fetch("/api/users/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setUserData(data)
  //     })
  // }

  async function fetchUsers() {
    try {
      const response = await getAllUsers();
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  // console.log(getAllUsers)

  console.log(userData.users);

  return (
    <>
      <h1 className="text-center p-4">Viewing All Users</h1>
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
                <p>Profile: {data.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
