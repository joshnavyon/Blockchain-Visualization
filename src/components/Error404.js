import React from "react";
import styles from "./Error505.module.css";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorHeading}>404 - Page Not Found</h1>
      <p className={styles.errorMessage}>The page you are looking for could not be found.</p>
      
    </div>
  );
}

export default Error404;
