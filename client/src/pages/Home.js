import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../utils/API";

const Home = () => {
  const [userData, setUserData] = useState([]);

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
    </>
  );
};

export default Home;
