import { Link } from "react-router-dom";
import Header from "../components/Header";
import Accordion from "../components/Accordion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./VisualGraph.module.css";
import D3Node from "../components/D3LinkedNodes";
const VisualGraph = () => {
  // const nodes = [
  //   {
  //     id: "1",
  //     addressId: "0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4",
  //     name: "Felix",
  //     type: "eoa",
  //     dateCreated: "1682226334",
  //     transactionsIn: [
  //       {
  //         id: "4",
  //         hash: "0xa43beda2d8739c679012b26b8b5f66dc4b7196eb31e39d6f7cdbede134e19720",
  //         value: "20000000000000000000",
  //         input: null,
  //         transaction: null,
  //         gas: 21000,
  //         gas_used: 21000,
  //         gas_price: 11283747363,
  //         transaction_fee: 236958694623000,
  //         block_number: 15878986,
  //         block_timestamp: 1667351687,
  //       },
  //     ],
  //     transactionsOut: [
  //       {
  //         id: "2",
  //         hash: "0xdd608c8c4e8d8529967955d89f9e71842e80c3c84d592c72054f68090a5a102c",
  //         value: "9080186758793618211636",
  //         input: null,
  //         transaction: null,
  //         gas: 21000,
  //         gas_used: 21000,
  //         gas_price: 12241050449,
  //         transaction_fee: 257062059429000,
  //         block_number: 15878752,
  //         block_timestamp: 1667348843,
  //       },
  //       {
  //         id: "3",
  //         hash: "0x3ce66ee43f23b037aa64440f1e545c574ce779876aeefccf8b0905b74392215b",
  //         value: "0",
  //         input: null,
  //         transaction: null,
  //         gas: 1219186,
  //         gas_used: 935469,
  //         gas_price: 10580392185,
  //         transaction_fee: 9897628896909765,
  //         block_number: 15878617,
  //         block_timestamp: 1667347211,
  //       },
  //     ],
  //   },
  //   { id: "4", addressId: "0x58f56615180a8eea4c462235d9e215f72484b4a3", name: "Darrell" },
  //   { id: "2", addressId: "0xb0606f433496bf66338b8ad6b6d51fc4d84a44cd", name: "Susanto" },
  //   { id: "3", addressId: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45", name: "Haryanto" },
  // ];

  const { addressId } = useParams();
  const [nodes, setWalletData] = useState(null);

  console.log(addressId);

  function fetchWalletData(addressId) {
    axios.get(`http://127.0.0.1:8000/wallet/${addressId}`).then((response) => {
      setWalletData(response.data);
      console.log(response.data);
    });
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
                title=""
                from=""
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
          <D3Node nodes={nodes} />
        </div>
      </div>
    </div>
  );
};

export default VisualGraph;
