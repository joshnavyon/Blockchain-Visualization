import { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ title, data, state }) => {
  const [isOpen, setIsOpen] = useState(state);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionSection}>
        <div
          className={`${styles.accordionHeader} ${isOpen ? styles.active : ""}`}
          onClick={toggleAccordion}
        >
          {title}
          <img className={styles.chevronDownIcon} alt="" src="/chevrondown1.svg" />
        </div>
        {isOpen && (
          <div className={styles.accordionContent}>
            <div className={styles.frameParent}>
              {Object.keys(data).map((key) => (
                <div className={styles.nameGroup} key={key}>
                  <div className={styles.name1}>{key}:</div>
                  <div className={styles.name2}>{data[key] !== null ? data[key] : 0}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
