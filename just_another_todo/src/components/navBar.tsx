"use client";

import Link from "next/link";
import { useState } from "react";
import LoginModal from "./loginModal";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link href="/contact">Contact</Link>
        </li>
        {!isLoggedIn && (
          <li className="navbar-item">
            <button onClick={handleLoginClick} className="loginButton">
              Login
            </button>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <button onClick={handleLogout} className="logoutButton">
              Logout
            </button>
          </li>
        )}
      </ul>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} isLogin={true}/>
    </nav>
  );
}