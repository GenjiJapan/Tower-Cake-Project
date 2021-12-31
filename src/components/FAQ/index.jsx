import Accordion from "components/Accordion";
import Banner from "components/Banner";
import { OrderAccordionData, ProductAccordionData } from "constants/Acordion";
import Images from "constants/images";
import React from "react";
import styles from "./FAQ.module.css";

function FAQ(props) {
  return (
    <div>
      <Banner title="Q&A" backgroundUrl={Images.CUP_CAKE} />

      <div className={styles.faq}>
        <div className={styles.faq_container}>
          <Accordion header="Odering" data={OrderAccordionData} />
          <Accordion header="Product" data={ProductAccordionData} />
        </div>
      </div>
    </div>
  );
}

export default FAQ;
