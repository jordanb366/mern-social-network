import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleUser } from "../utils/API";

const SingleUser = () => {
    const [userData, setUserData] = useState([]);

    const { userId } = useParams()

    console.log(userId)
//     async function fetchUsers() {
//       try {
//         const response = await getSingleUser(userId);
//         const data = await response.json();
//   console.log(data);
//         setUserData(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     useEffect(() => {
//       fetchUsers();
//     }, []);
//     // console.log(getAllUsers)
  
//     console.log(userData.users);
  

  return (
    <>
      <h1 className="text-center p-4">Viewing profile { userId }</h1>
    
    </>
  );
};

export default SingleUser;
