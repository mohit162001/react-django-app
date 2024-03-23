import React from "react";
import "./footer.css";
import footer_logo from "../Assests/logo_big.png";
import instagran_icon from "../Assests/instagram_icon.png";
import facebook_icon from "../Assests/facebook_icon.png";
import whatsapp_icon from "../Assests/whatsapp_icon.png";
import { isAdminUser } from "../../helper";
const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>CLOTHY</p>
      </div> */}
      {!isAdminUser()&&<ul className="footer-links">
        <li>Contact</li>
        <li>About</li>
        <li>Services</li>
        {/* <li>Products</li> */}
        {/* <li>Offices</li> */}
      </ul>}
      {!isAdminUser() && <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagran_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={facebook_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>}
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2024 - All Right Reserved by DYNAMIC</p>
      </div>
    </div>
  );
};

export default Footer;
