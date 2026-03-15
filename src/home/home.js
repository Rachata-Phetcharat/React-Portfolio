import React from "react";
import "./home.css";
import portfolio_img from "../assets/portfolio_img2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faVuejs,
  faPython,
  faJava,
  faSquareJs,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <div>
      <div className="home">
        <div className="home-centent">
          <span className="home-eyebrow">Frontend Developer</span>

          <h2>
            Hi, I'm <span>Rachata Phetcharat</span>
          </h2>

          <h1>
            FRONT-END <br />
            <span>DEVELOPER</span>
          </h1>

          <div className="home-divider" />

          <p>
            I'm a final-year Electronics Computer Technology student at King
            Mongkut's University of Technology North Bangkok (KMUTNB).
          </p>

          <div className="social">
            <a
              href="https://github.com/Rachata-Phetcharat"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/rachata-phetcharat-b01ba029b/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        <div>
          <img
            src={portfolio_img}
            alt="Rachata Phetcharat"
            className="profile-img"
          />
        </div>

        <div className="scroll-hint">
          <div className="scroll-dot" />
          <span>Scroll</span>
        </div>
      </div>

      <div className="tech-icons">
        <FontAwesomeIcon icon={faReact} className="icon icon-1" />
        <FontAwesomeIcon icon={faVuejs} className="icon icon-2" />
        <FontAwesomeIcon icon={faPython} className="icon icon-3" />
        <FontAwesomeIcon icon={faJava} className="icon icon-4" />
        <FontAwesomeIcon icon={faSquareJs} className="icon icon-5" />
        <FontAwesomeIcon icon={faGithub} className="icon icon-6" />
      </div>
    </div>
  );
}
