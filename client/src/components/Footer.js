import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const phoneNumber = "+265 881 852 413";

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Social Icons */}
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaFacebook />
          </a>
          <a href="https://wa.me/265881852413" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaWhatsapp />
          </a>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <p style={styles.text}>Call us: {phoneNumber}</p>
        </div>

        {/* Bottom Copyright */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Sweet Crestview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1c1c1c",
    color: "#e8e8e8",
    padding: "40px 20px 20px",
    fontFamily: "Arial, sans-serif",
    borderTop: "1px solid #333",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  section: {
    margin: "20px 0",
  },
  heading: {
    color: "#ffc107",
    fontSize: "1.2rem",
    marginBottom: "15px",
    textTransform: "uppercase",
  },
  text: {
    fontSize: "0.9rem",
    marginBottom: "5px",
    lineHeight: "1.5",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "15px",
  },
  icon: {
    fontSize: "1.8rem",
    color: "#e8e8e8",
    transition: "color 0.3s",
  },
  bottomBar: {
    marginTop: "20px",
    borderTop: "1px solid #333",
    paddingTop: "15px",
    textAlign: "center",
  },
  copyright: {
    fontSize: "0.8rem",
    color: "#aaa",
    textAlign: "center",
  },
};
