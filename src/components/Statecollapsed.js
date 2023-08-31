import styles from "./Statecollapsed.module.css";
const Statecollapsed = () => {
  return (
    <div className={styles.statecollapsed}>
      <div className={styles.statecollapsedInner}>
        <div className={styles.nameParent}>
          <b className={styles.name}>Transaction 1</b>
          <img
            className={styles.chevronDownIcon}
            alt=""
            src="/chevrondown1.svg"
          />
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.nameGroup}>
          <div className={styles.name1}>From:</div>
          <div className={styles.name1}>Cx0090033AC02</div>
        </div>
        <div className={styles.nameGroup}>
          <div className={styles.name1}>To:</div>
          <div className={styles.name1}>Ax00100678BE3</div>
        </div>
        <div className={styles.nameGroup}>
          <div className={styles.name1}>Amount:</div>
          <div className={styles.name1}>0.00003</div>
        </div>
        <div className={styles.nameGroup}>
          <div className={styles.name1}>Date:</div>
          <div className={styles.name1}>02/12/2021</div>
        </div>
        <div className={styles.nameGroup}>
          <div className={styles.name1}>Time:</div>
          <div className={styles.name1}>09:10</div>
        </div>
      </div>
    </div>
  );
};

export default Statecollapsed;
