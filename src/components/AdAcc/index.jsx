import AdMGM from "components/AdMGM";
import WarnMGM from "components/WarnMGM";
import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import UserMGM from "../UserMGM";
import styles from "./AdAcc.module.css";
AdAcc.propTypes = {};

function AdAcc(props) {
  const [accountType, setAccountType] = useState(1);
  const callUI = (value) => {
    setAccountType(value);
  };

  return (
    <div className={styles.accountMGM}>
      <div className={styles.mgm_bar}>
        <div className={styles.mid_line}></div>
        <i class="fas fa-dot-circle fa-2x"></i>
        <Fade left delay={100}>
          <button
            style={{
              color: accountType === 1 ? "#000" : "#fff",
              boxShadow: accountType === 1 ? "0 0 10px 10px #ccc" : "",
            }}
            onClick={() => callUI(1)}
            className={`${styles.mgm_bar_tag} ${styles.tag_1}`}
          >
            Users
          </button>
        </Fade>
        <Fade left delay={200}>
          <button
            style={{
              color: accountType === 2 ? "#000" : "#fff",
              boxShadow: accountType === 2 ? "0 0 10px 10px #ccc" : "",
            }}
            onClick={() => callUI(2)}
            className={`${styles.mgm_bar_tag} ${styles.tag_2}`}
          >
            Admins
          </button>
        </Fade>
        <Fade left delay={300}>
          <button
            style={{
              color: accountType === 3 ? "#000" : "#fff",
              boxShadow: accountType === 3 ? "0 0 10px 10px #ccc" : "",
            }}
            onClick={() => callUI(3)}
            className={`${styles.mgm_bar_tag} ${styles.tag_3}`}
          >
            Violation
          </button>
        </Fade>
      </div>

      <div className={styles.mgm_container}>
        {/* List account users */}
        {accountType == 1 ? <UserMGM /> : <div></div>}

        {/* List account admins */}
        {accountType == 2 ? <AdMGM /> : <div></div>}

        {/* List banned accounts */}
        {accountType == 3 ? <WarnMGM /> : <div></div>}
      </div>
    </div>
  );
}

export default AdAcc;
