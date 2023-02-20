import React, { useEffect, useState } from "react";

import { getAllUsers} from '../utils/API';



const Home = () => {

const [userData, setUserData] = useState([]);

const fetchUsers = () => {
  fetch("/api/users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setUserData(data)
    })
}

useEffect(() => {
  fetchUsers()
}, [])
// console.log(getAllUsers)

console.log(userData.users)



  return (
    <>
      <h1>Viewing All Users</h1>
      <div>
      {userData.users.map((data) => {
        return(
          <div key={data.id}>
          <h2>{data.email}</h2>
          </div>

        )
      })}
      </div>
    </>
  );
};

export default Home;
