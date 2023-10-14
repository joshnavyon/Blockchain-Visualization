import Header from "../components/Header";
import styles from "./Home.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [addressId, setAddressId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to the wallet page with the provided addressId

    navigate(`/wallet/${addressId}`);
  };

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.mid}>
        <div className={styles.titleParent}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.loremIpsumDolor}>
            Step into the captivating world of blockchain technology with our cutting-edge
            visualization tool. Our home page is your gateway to exploring the intricate web of
            transactions and digital assets that power the decentralized future. Immerse yourself in
            an interactive journey that transforms complex data into visually stunning insights,
            making the blockchain's transparent and secure nature come alive.
          </p>
        </div>
        <div className={styles.image1Parent}>
          <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
          <SearchBar />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.ourTeamWrapper}>
          <h1 className={styles.title}>Our Team</h1>
        </div>
        <div className={styles.cardwhitewithPhotoParent}>
          <div className={styles.cardwhitewithPhoto}>
            <img
              className={styles.whatsappImage20230826At1}
              alt=""
              src="/whatsapp-image-20230826-at-1150-1@2x.png"
            />
            <div className={styles.frameGroup}>
              <div className={styles.darrellDevlinParent}>
                <b className={styles.darrellDevlin}>Darrell Devlin</b>
                <div className={styles.tukangCabul}>Student</div>
              </div>
              <div className={styles.studentId103850680Container}>
                <p className={styles.degreeComputerScience}>Student ID: 103850680</p>
                <p className={styles.degreeComputerScience}>Degree: Computer Science</p>
                <p className={styles.degreeComputerScience}>Major: Data Science</p>
              </div>
            </div>
          </div>
          <div className={styles.cardwhitewithPhoto}>
            <img
              className={styles.whatsappImage20230826At1}
              alt=""
              src="/whatsapp-image-20230826-at-1225-1@2x.png"
            />
            <div className={styles.frameGroup}>
              <div className={styles.darrellDevlinParent}>
                <b className={styles.darrellDevlin}>Felix Joshua</b>
                <div className={styles.tukangCabul}>Student</div>
              </div>
              <div className={styles.studentId103850680Container}>
                <p className={styles.degreeComputerScience}>Student ID: 103827969</p>
                <p className={styles.degreeComputerScience}>Degree: Computer Science</p>
                <p className={styles.degreeComputerScience}>Major: Software Developer</p>
              </div>
            </div>
          </div>
          <div className={styles.cardwhitewithPhoto}>
            <img className={styles.whatsappImage20230826At1} alt="" src="/bo.jpeg" />
            <div className={styles.frameGroup}>
              <div className={styles.darrellDevlinParent}>
                <b className={styles.darrellDevlin}>Bryan Oscarina</b>
                <div className={styles.tukangCabul}>Student</div>
              </div>
              <div className={styles.studentId103850680Container}>
                <p className={styles.degreeComputerScience}>{`Student ID: 103826047`}</p>
                <p className={styles.degreeComputerScience}>Degree: Computer Science</p>
                <p className={styles.degreeComputerScience}>Major: Cybersecurity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
