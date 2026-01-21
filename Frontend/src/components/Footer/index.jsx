import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";

import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Find Stores */}
        <div className="footer-column">
          <h4>Find Stores</h4>
          <ul>
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>New Delhi</li>
            <li>Chennai</li>
            <li>Hyderabad</li>
            <li>Pune</li>
          </ul>
        </div>

        {/* Our Company */}
        <div className="footer-column">
          <h4>Our Company</h4>
          <ul>
            <li>About us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>Help</li>
            <li>Business Solutions</li>
            <li>Find Stores</li>
            <li>My Account</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Important Links */}
        <div className="footer-column">
          <h4>Important Links</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Delivery & Return Policy</li>
            <li>Terms & conditions</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer-column">
          <div className="contact-item">
            <PhoneIcon fontSize="small" />
            <span>+91 951 373 4374</span>
          </div>

          <div className="contact-item">
            <EmailIcon fontSize="small" />
            <span>care@printo.in</span>
          </div>

          <h4 className="follow-title">Follow us</h4>

          <div className="social-icons">
            <InstagramIcon />
            <FacebookIcon />
            <XIcon />
            <LinkedInIcon />
            <PinterestIcon />
          </div>

          <div className="store-buttons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
