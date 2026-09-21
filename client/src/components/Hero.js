import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  // Check if user is logged in based on your auth method
  const isLoggedIn = !!localStorage.getItem("id_token");

  // Only show hero to logged-out users
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>DevConnect</h1>
        <p className="tagline">
          Share ideas. Build community. Connect with developers worldwide.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">20</span>
            <span className="stat-label">Active Developers</span>
          </div>
          <div className="stat">
            <span className="stat-number">70</span>
            <span className="stat-label">Posts Shared</span>
          </div>
          <div className="stat">
            <span className="stat-number">150+</span>
            <span className="stat-label">Reactions</span>
          </div>
        </div>

        <div className="hero-cta">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign Up Now
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            View Feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
