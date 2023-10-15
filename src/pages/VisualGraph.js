import Header from "../components/Header";
import Accordion from "../components/Accordion";

import styles from "./VisualGraph.module.css";
import D3Node from "../components/D3LinkedNodes";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const VisualGraph = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const [nodes, setWalletData] = useState(null);

  function toTime(unixTime) {
    const date = new Date(unixTime * 1000); // Convert Unix timestamp to milliseconds
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function fetchWalletData(addressId) {
    axios
      .get(`http://127.0.0.1:8000/wallet/${addressId}`)
      .then((response) => {
        setWalletData(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error505");
      });
  }

  function fetchAndReset(addressId) {
    setWalletData(null);
    fetchWalletData(addressId);
  }

  useEffect(() => {
    fetchWalletData(addressId);
  }, []);

  return (
    <div className={styles.visualGraph}>
      <Header />
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.ax00100678be3Parent}>
            <p className={styles.ax00100678be3}>{nodes ? nodes[0].name + "'s Wallet" : ""} </p>
            <button className={styles.minimize01Wrapper}>
              <img className={styles.minimize01Icon} alt="" src="/minimize01.svg" />
            </button>
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.userNamesWalletParent}>
              <div className={styles.frameDiv}>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>{`Name: `}</div>
                  <div className={styles.userNamesWallet}>{nodes ? nodes[0].name : ""}</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Address:</div>
                  <div className={styles.userNamesWallet}>{nodes ? nodes[0].addressId : ""}</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Date created:</div>
                  <div className={styles.userNamesWallet}>
                    {nodes ? toTime(nodes[0].dateCreated) : ""}
                  </div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Type:</div>
                  <div className={styles.userNamesWallet}>{nodes ? nodes[0].type : ""}</div>
                </div>
                <div className={styles.nameParent}>
                  <div className={styles.userNamesWallet}>Amount:</div>
                  <div className={styles.userNamesWallet}>
                    {nodes ? 10000000000 - nodes[0].dateCreated : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.userNamesWalletGroup}>
              {nodes ? (
                <>
                  <div className={styles.userNamesWallet}>
                    Transactions In ({nodes[0].transactionsIn.length})
                  </div>
                  {nodes[0].transactionsIn.map((transaction, index) => (
                    <Accordion
                      key={`transactionIn${index}`}
                      title={
                        nodes.find((node) => node.id === transaction.id)?.name +
                        " -> " +
                        nodes[0].name
                      }
                      data={transaction}
                      state={false}
                    />
                  ))}

                  <div className={styles.userNamesWallet}>
                    Transaction Outs ({nodes[0].transactionsOut.length})
                  </div>
                  {nodes[0].transactionsOut.map((transaction, index) => (
                    <Accordion
                      key={`transactionOut${index}`}
                      title={
                        nodes[0].name +
                        " -> " +
                        nodes.find((node) => node.id === transaction.id)?.name
                      }
                      data={transaction}
                      state={false}
                    />
                  ))}
                </>
              ) : (
                <p>Loading data...</p>
              )}
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
          <D3Node data={nodes} func={fetchAndReset} />
        </div>
      </div>
    </div>
  );
};

export default VisualGraph;
