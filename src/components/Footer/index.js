import React from "react";
import "./footer.css";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import PrivacyModal from "../ModalView/PrivacyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a
          href="https://www.facebook.com/%D8%A8%D9%84%D8%AF%D9%8A%D8%A9-%D8%AC%D9%85%D8%A7%D8%B9%D9%8A%D9%86-109854359106962/"
          target="_blank"
          className="item4"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <div className="item2">
          <span style={{ paddingRight: 7 }}>0569478561 </span>
          <FontAwesomeIcon icon={faPhone} />
          <span style={{ paddingLeft: 7 }}></span>
        </div>
        <div className="item1">
          <PrivacyModal />
          <img src={Logo} alt="logo" className="logoFooter" />
        </div>

        {false && <PrivacyModal click={true} />}
      </div>
    </footer>
  );
};

export default Footer;
