import { Link } from "react-router-dom";
import Header from "../components/Header";
import Statecollapsed from "../components/Statecollapsed";
import styles from "./VisualGraph.module.css";
import D3Node from "./graph";
const VisualGraph = () => {
  return (
    <div className={styles.visualGraph}>
      <Header />
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.ax00100678be3Parent}>
            <p className={styles.ax00100678be3}>Ax00100678BE3</p>
            <button className={styles.minimize01Wrapper}>
              <img
                className={styles.minimize01Icon}
                alt=""
                src="/minimize01.svg"
              />
            </button>
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.userNamesWalletParent}>
              <div className={styles.userNamesWallet}>[User name]’s wallet</div>
              <div className={styles.frameDiv}>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>{`Name: `}</div>
                  <div className={styles.userNamesWallet}>Felix Joshua</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Address:</div>
                  <div className={styles.userNamesWallet}>Ax00100678BE3</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Date created:</div>
                  <div className={styles.userNamesWallet}>10/20/2020</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Details:</div>
                  <div className={styles.userNamesWallet}>[details]</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Details:</div>
                  <div className={styles.userNamesWallet}>[details]</div>
                </div>
              </div>
            </div>
            <div className={styles.userNamesWalletGroup}>
              <div className={styles.userNamesWallet}>Transactions</div>
              <Statecollapsed />
              <Statecollapsed />
              <Statecollapsed />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder11.svg"
              />
              <div className={styles.text}>Make a payment</div>
              <img
                className={styles.placeholderIcon}
                alt=""
                src="/placeholder11.svg"
              />
            </button>
          </div>
        </div>
        <div className={styles.frameParent1} id="svg-parent">
          <D3Node />
        </div>
      </div>
    </div>
  );
};

export default VisualGraph;
