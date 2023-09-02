import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link className={styles.logo} to="/">
            <div className={styles.logoWrap}>
              <div className={styles.logomark}>
                <img
                  className={styles.contentIcon}
                  alt=""
                  src="/content2.svg"
                />
              </div>
              <img className={styles.logotypeIcon} alt="" src="/logotype.svg" />
            </div>
            <div className={styles.text}>Group 3-16</div>
          </Link>
          <div className={styles.navigation}>
            <Link className={styles.button} to="/">
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder2.svg"
              />
              <div className={styles.text}>Home</div>
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder2.svg"
              />
            </Link>
            <Link className={styles.button} to="/visual-graph">
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder2.svg"
              />
              <div className={styles.text}>Visual Graph</div>
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder2.svg"
              />
            </Link>
          </div>
        </div>
        <div className={styles.frameParent}>
          <input
            className={styles.frameChild}
            type="text"
            placeholder="Search wallet “Ax00..”"
          />
          <div className={styles.vectorWrapper}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
