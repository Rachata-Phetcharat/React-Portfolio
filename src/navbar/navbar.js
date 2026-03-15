import React, { useState, useEffect } from "react";
import "./navbar.css";
import Home from "../home/home";
import Overview from "../overview/overview";
// import Contact from "../contact/contact";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <div className="container">
          <div className="nav-con">
            <span className="nav-logo-text">Rachata.</span>
            <div className="nav-menu">
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="overview"
                    className={({ isActive }) =>
                      isActive ? "nav_active" : "nav-link"
                    }
                  >
                    Overview
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}
