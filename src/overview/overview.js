import React, { useRef, useState, useEffect } from "react";
import "./overview.css";
import Resume from "../assets/Resume.jpg";
import Transcript from "../assets/Transcript.jpg";

export default function Overview() {
  const [isOpen, setIsOpen] = useState(false);
  const imgRef = useRef();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleImageClick = (imgSrc) => {
    imgRef.current = { src: imgSrc };
    toggleModal();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="background">
      <div className="overview">
        <div className="overview-header">
          <h1>
            My <span>Overview</span> About Me!
          </h1>
          <p>My Resume & Transcript</p>
        </div>

        <div className="overview-concurrent">
          <div className="resume-section">
            <div className="resume">
              <img
                src={Resume}
                alt="Resume Preview"
                className="resume-img"
                onClick={() => handleImageClick(Resume)}
              />
            </div>
          </div>

          <div className="transcript-section">
            <div className="transcript">
              <img
                src={Transcript}
                alt="Transcript Preview"
                className="transcript-img"
                onClick={() => handleImageClick(Transcript)}
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-content">
              <img
                src={imgRef.current.src}
                alt="Full img"
                className="full-img"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
