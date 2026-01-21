import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-inner container d-flex flex-column flex-md-row justify-content-between align-items-center py-4">
      <div className="brand d-flex align-items-center mb-3 mb-md-0">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10" fill="#0d6efd" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="10"
            fill="#fff"
            fontFamily="sans-serif"
          >
            M
          </text>
        </svg>
        <span className="brand-text">MERN Social</span>
      </div>

      <nav className="footer-links text-center mb-3 mb-md-0">
        <a href="/about">About</a>
        <span className="sep">·</span>
        <a href="/contact">Contact</a>
        <span className="sep">·</span>
        <a href="/privacy">Privacy</a>
      </nav>

      <div className="social d-flex align-items-center">
        <a
          href="https://github.com"
          aria-label="GitHub"
          className="social-link"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.7 7.2 10.1.5.1.7-.2.7-.5v-1.8c-2.9.6-3.6-1.4-3.6-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.7 2 .9.1-.7.4-1.3.8-1.7-2.3-.3-4.7-1.2-4.7-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .9.9-.3 1.9-.5 2.8-.5s1.9.2 2.8.5c2.1-1.2 3-.9 3-.9.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 2.9 0 4.2-2.5 5.1-4.8 5.4.4.4.7 1 .7 2v3c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10.1C23.1 5.3 18.3.5 12 .5z"
            />
          </svg>
        </a>
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          className="social-link"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.7-.7.4-1.4.7-2.2.9C18.6 4.8 17.8 4.5 17 4.5c-1.6 0-2.8 1.2-2.8 2.8 0 .2 0 .4.1.6C10.3 7.8 7 6.1 4.8 3.4c-.3.6-.5 1.2-.5 2 0 1.4.7 2.6 1.7 3.3-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.6 3.3 4-.3.1-.6.2-1 .2-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3 2.3-1.1.9-2.4 1.4-3.8 1.4-.3 0-.6 0-.9-.1 1.4.9 3 1.5 4.8 1.5 5.8 0 9-4.9 9-9.1v-.4c.6-.4 1.2-1 1.6-1.6-.6.3-1.2.5-1.9.6z"
            />
          </svg>
        </a>
      </div>
    </div>

    <div className="footer-bottom text-center py-2">
      <small>© {new Date().getFullYear()} MERN Social Network</small>
    </div>
  </footer>
);

export default Footer;
