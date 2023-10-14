import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      window.location.href = `/wallet/${query}`;
    }
  };

  return (
    <div className={styles.frameParent}>
      <button className={styles.vectorButton} onClick={() => navigate(`/wallet/${query}`)}>
        <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.frameChild}
      />
    </div>
  );
}

export default SearchBar;
