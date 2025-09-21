import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  // Your phone number with country code, without spaces or symbols
  const phoneNumber = "265881852413"; 

  return (
    <div style={styles.pageContainer}>
      <div style={styles.infoCard}>
        <div style={styles.section}>
          <h3 style={styles.heading}>Address</h3>
          <p style={styles.text}>Sweet Crestview</p>
          <p style={styles.text}>PO Box 118</p>
          <p style={styles.text}>Nkhata Bay</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.heading}>Contact</h3>
          <p style={styles.text}>Phone: 265 881 852 413</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.heading}>Open Time</h3>
          <p style={styles.text}>Monday - Sunday</p>
          <p style={styles.text}>24 Hours</p>
        </div>
        <div style={styles.section}>
          <h3 style={styles.heading}>Stay Connected</h3>
          <div style={styles.socialIcons}>
            <FaFacebook style={styles.icon} />
            {/* The change is here: wrap the FaWhatsapp icon in an <a> tag */}
            <a href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp style={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#d4a373", // Light brown background color from the image
    padding: "20px",
  },
  infoCard: {
    backgroundColor: "#1c1c1c", // Dark background color from the image
    color: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxWidth: "400px",
  },
  section: {
    marginBottom: "30px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#e8e8e8",
    borderBottom: "1px solid #333", // A subtle line under the heading
    paddingBottom: "5px",
  },
  text: {
    fontSize: "1rem",
    margin: "5px 0",
    color: "#ccc",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "2rem",
    color: "#fff",
    cursor: "pointer",
    transition: "color 0.3s",
  },
};