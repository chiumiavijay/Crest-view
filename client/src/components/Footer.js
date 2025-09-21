import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const phoneNumber = "265881852413";

  return (
    <footer style={styles.footer}>

      <div style={styles}>
        <p style={styles.copyright}>© {new Date().getFullYear()} Sweet Crestview. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1c1c1c", // Dark background to match your info card
    color: "#e8e8e8",
    padding: "40px 20px 20px",
    fontFamily: "Arial, sans-serif",
    borderTop: "1px solid #333",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  section: {
    flex: "1",
    minWidth: "px",
    margin: "20px",
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
    marginTop: "10px",
  },
  icon: {
    fontSize: "1.8rem",
    color: "#e8e8e8",
    transition: "color 0.3s",
  },
  bottomBar: {
    marginTop: "40px",
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