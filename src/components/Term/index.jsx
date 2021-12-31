import Banner from "components/Banner";
import TermModify from "components/Term_modify";
import Images from "constants/images";
import {
  acceptOrderandPriceTerm,
  customerOpinionTerm,
  introductionTerm,
  legalRightTerm,
  trademarkAndCopyrightTerm,
  transactionTerm,
  userGuildTerm,
  wrongInformationTerm,
} from "constants/Term";
import React from "react";
import styles from "./Term.module.css";

function Term(props) {
  return (
    <div className={styles.term}>
      <Banner title="Our Terms and Rules " backgroundUrl={Images.SPACE} />
      <div className={styles.term_title}>
        <h1>
          <span className={styles.terms_h1}>Terms</span>{" "}
          <span className={styles.and_h1}>and</span>{" "}
          <span className={styles.rules_h1}>Rules</span>
        </h1>
      </div>

      <TermModify title="Introduction" data={introductionTerm} />
      <TermModify title="Website User Guide" data={userGuildTerm} />
      <TermModify title="Customer opinions" data={customerOpinionTerm} />
      <TermModify
        title="Accept orders and prices"
        data={acceptOrderandPriceTerm}
      />
      <TermModify
        title="Change or cancel transactions at Tour des Gâteau"
        data={transactionTerm}
      />
      <TermModify
        title="Resolving consequences due to incorrect information input at Tour des Gâteau"
        data={wrongInformationTerm}
      />
      <TermModify
        title="Trademarks and Copyrights"
        data={trademarkAndCopyrightTerm}
      />
      <TermModify title="Legal rights" data={legalRightTerm} />
    </div>
  );
}

export default Term;
