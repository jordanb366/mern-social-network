import React, { useEffect, useState } from "react";

import { } from "../utils/API";

const Profile = () => {
//   const [userData, setUserData] = useState([]);

  // const fetchUsers = () => {
  //   fetch("/api/users/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setUserData(data)
  //     })
  // }

//   async function fetchUsers() {
//     try {
//       const response = await getAllUsers();
//       const data = await response.json();

//       setUserData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);
  // console.log(getAllUsers)

//   console.log(userData.users);

  return (
    <>
      <h1 className="text-center p-4">Viewing your profile</h1>
      <div className="container">
        {/* {userData.users?.map((data) => {
          return (
            <div className="row align-items-center" key={data.id}>
              <div className="col pb-4">
                <p>ID: {data.id}</p>
                <p>Username: {data.username}</p>
                <p>Username: {data.email}</p>
              </div>
            </div>
          );
        })} */}
      </div>
    </>
  );
};

export default Profile;