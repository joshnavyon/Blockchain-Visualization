import { Link } from "react-router-dom";
import Header from "../components/Header";
import Accordion from "../components/Accordion";

import styles from "./VisualGraph.module.css";
import D3Node from "../components/D3LinkedNodes";
const VisualGraph = () => {
  const nodes = [
    {
      id: "A",
      from: "FElix",
      size: 25,
      transactionsIn: [],
      transactionsOut: ["B", "C", "D", "E"],
    },
    {
      id: "B",
      size: 25,
      transactionsIn: [],
      transactionsOut: ["A", "C"],
    },
    {
      id: "C",
      size: 25,
      transactionsIn: [],
      transactionsOut: ["C", "D", "E"],
    },
    {
      id: "D",
      size: 25,
      transactionsIn: [],
      transactionsOut: ["D"],
    },
    {
      id: "E",
      size: 25,
      transactionsIn: [],
      transactionsOut: ["A", "B"],
    },
  ];

  return (
    <div className={styles.visualGraph}>
      <Header />
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.ax00100678be3Parent}>
            <p className={styles.ax00100678be3}>Ax00100678BE3</p>
            <button className={styles.minimize01Wrapper}>
              <img className={styles.minimize01Icon} alt="" src="/minimize01.svg" />
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
                  <div className={styles.userNamesWallet}>Amount:</div>
                  <div className={styles.userNamesWallet}>0.0034 BTC</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Currency:</div>
                  <div className={styles.userNamesWallet}>Bitcoin</div>
                </div>
              </div>
            </div>
            <div className={styles.userNamesWallet}>Transactions</div>
            <div className={styles.userNamesWalletGroup}>
              <Accordion
                title={nodes[0].id}
                from={nodes[0].from}
                to="Ax00100678BE3"
                amount="0.00003"
                date="02/12/2021"
                time="09:10"
                state={true}
              />
              <Accordion
                title="Transaction 2"
                from="Cx0090033AC02"
                to="Ax00100678BE3"
                amount="0.00003"
                date="02/12/2021"
                time="09:10"
                state={false}
              />
              <Accordion
                title="Transaction 3"
                from="Cx0090033AC02"
                to="Ax00100678BE3"
                amount="0.00003"
                date="02/12/2021"
                time="09:10"
                state={false}
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>
              <img className={styles.placeholderIcon} alt="" src="/placeholder11.svg" />
              <div className={styles.text}>Make a payment</div>
              <img className={styles.placeholderIcon} alt="" src="/placeholder11.svg" />
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
