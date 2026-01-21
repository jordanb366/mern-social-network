import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SingleUser from "./pages/SingleUser";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Footer from "./components/Footer";

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
      <div className="app d-flex flex-column min-vh-100">
        <header>
          <Navbar />
        </header>

        <main className="flex-grow-1">
          <Routes>
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
            <Route path="/" element={<Home />} />
            <Route path="/users/:UserId" element={<SingleUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
