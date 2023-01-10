import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

// const authLink = setContext((_, { headers }) => {
//   // gets the authentication token from local storage if it exists
//   const token = localStorage.getItem("id_token");
//   // will return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route
            path="*"
            element={<h1 className="display-2">Wrong page!</h1>}
          />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
