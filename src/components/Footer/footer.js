import React from "react";
import "./footer.css";
import PrivacyModal from "../ModalView/PrivacyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="item1">
          <PrivacyModal />
        </div>

        <div className="item2">
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ paddingLeft: 7 }}></span>
          <span style={{ paddingRight: 7 }}>0569478561 </span>
        </div>

        <a
          href="https://www.facebook.com/%D8%A8%D9%84%D8%AF%D9%8A%D8%A9-%D8%AC%D9%85%D8%A7%D8%B9%D9%8A%D9%86-109854359106962/"
          target="_blank"
          className="item4"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        {false && <PrivacyModal click={true} />}
      </div>
    </footer>
  );
}
