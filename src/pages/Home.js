import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.mid}>
        <div className={styles.titleParent}>
          <h1 className={styles.title}>Title</h1>
          <p className={styles.loremIpsumDolor}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={styles.image1Parent}>
          <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
          <div className={styles.frameParent}>
            <div className={styles.vectorWrapper}>
              <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
            </div>
            <input
              className={styles.frameChild}
              type="text"
              placeholder="Search wallet “Ax00..”"
            />
          </div>
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
                <div className={styles.tukangCabul}>Tukang Cabul</div>
              </div>
              <div className={styles.studentId103850680Container}>
                <p className={styles.degreeComputerScience}>
                  Student ID: 103850680
                </p>
                <p className={styles.degreeComputerScience}>
                  Degree: Computer Science
                </p>
                <p className={styles.degreeComputerScience}>
                  Major: Data Science
                </p>
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
                <p className={styles.degreeComputerScience}>
                  Student ID: 103827969
                </p>
                <p className={styles.degreeComputerScience}>
                  Degree: Computer Science
                </p>
                <p className={styles.degreeComputerScience}>
                  Major: Software Developer
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cardwhitewithPhoto}>
            <img
              className={styles.whatsappImage20230826At1}
              alt=""
              src="/whatsapp-image-20230826-at-1150-1@2x.png"
            />
            <div className={styles.frameGroup}>
              <div className={styles.darrellDevlinParent}>
                <b className={styles.darrellDevlin}>Bryan Oscarina</b>
                <div className={styles.tukangCabul}>Tukang Cabul2</div>
              </div>
              <div className={styles.studentId103850680Container}>
                <p className={styles.degreeComputerScience}>{`Student ID: `}</p>
                <p className={styles.degreeComputerScience}>
                  Degree: Computer Science
                </p>
                <p className={styles.degreeComputerScience}>
                  Major: Cybersecurity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
