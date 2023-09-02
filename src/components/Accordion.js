import { useState } from "react";
import styles from "./Accordion.module.css"

const Accordion = ({ title, from, to, amount, date, time, state }) => {
    const [isOpen, setIsOpen] = useState(state);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
   


    return (
        <div className={styles.accordion}>
          <div className={styles.accordionSection}>
                
            <div
            className={`${styles.accordionHeader} ${isOpen ? styles.active : ''}`}
            onClick={toggleAccordion}
            >
              {title}
              <img
                className={styles.chevronDownIcon}
                alt=""
                src="/chevrondown1.svg"
              />
            </div>
            {isOpen && 
                <div className={styles.accordionContent}>
                <div className={styles.frameParent}>
                <div className={styles.nameGroup}>
                    <div className={styles.name1}>From:</div>
                    <div className={styles.name1}>{from}</div>
                </div>
                <div className={styles.nameGroup}>
                    <div className={styles.name1}>To:</div>
                    <div className={styles.name1}>{to}</div>
                </div>
                <div className={styles.nameGroup}>
                    <div className={styles.name1}>Amount:</div>
                    <div className={styles.name1}>{amount}</div>
                </div>
                <div className={styles.nameGroup}>
                    <div className={styles.name1}>Date:</div>
                    <div className={styles.name1}>{date}</div>
                </div>
                <div className={styles.nameGroup}>
                    <div className={styles.name1}>Time:</div>
                    <div className={styles.name1}>{time}</div>
                </div>
                </div>
                </div>
            }
          </div>
        
      </div>
      );
}

export default Accordion;