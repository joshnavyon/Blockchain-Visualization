import React from "react";
import styles from "./Error.module.css";
import { Link } from "react-router-dom";

function Error505() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorHeading}>505 - Wallet Not Found</h1>
      <p className={styles.errorMessage}>Maybe you typed in the wrong wallet address?</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </div>
  );
}

export default Error505;
