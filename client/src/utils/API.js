// route to get logged in user's info (needs the token)
// Commented out for now, want to get the back end working with front end, then will modify and add auth
// export const getMe = (token) => {
//   return fetch("/api/users/me", {
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Will add login later, for now will just test the back end and front end
// export const loginUser = (userData) => {
//   return fetch("/api/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
// };

export const getSingleUser = (userData) => {
  return fetch("/api/:userId", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
