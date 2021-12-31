import Banner from "components/Banner";
import Policy from "components/Policy";
import Images from "constants/images";
import {
  contactPolicy,
  howEditInfoPolicy,
  howToUseInfoPolicy,
  introductionPolicy,
  whatDataCollectPolicy,
  whenCollectDataPolicy,
} from "constants/Policy";
import React from "react";
import styles from "./Privacy.module.css";

function Privacy(props) {
  return (
    <div className={styles.privacy}>
      <Banner title="Our Privacy Policy" backgroundUrl={Images.SPACE3} />
      <div className={styles.privacy_title}>
        <h1>
          <span className={styles.privacy_h1}>Privacy</span>{" "}
          <span className={styles.policy_h1}>Policy</span>
        </h1>
      </div>

      <Policy title="Introduction" data={introductionPolicy} />
      <Policy
        title="WHEN WILL Tour des Gâteau COLLECT PERSONAL DATA?"
        titleNote="We will/may collect personal data about you:"
        data={whenCollectDataPolicy}
      />
      <Policy
        title="WHAT DATA WILL Tour des Gâteau COLLECT?"
        data={whatDataCollectPolicy}
      />
      <Policy
        title="HOW WE USE THE INFORMATION YOU PROVIDE US?"
        data={howToUseInfoPolicy}
      />
      <Policy
        title="HOW CAN YOU WITHDRAW, DELETE, REQUEST ACCESS OR ADJUST THE INFORMATION YOU PROVIDE TO US?"
        data={howEditInfoPolicy}
      />
      <Policy
        title="QUESTIONS, CONCEPTS OR COMPLAINTS? CONTACT US"
        data={contactPolicy}
      />
    </div>
  );
}

export default Privacy;
