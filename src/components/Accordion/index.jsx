import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Accordion.module.css";

Accordion.propTypes = {
  header: PropTypes.string,
};

Accordion.defaultProps = {
  header: "",
};

const AccordionItem = ({ title, content }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <div>
      <div
        className={visibility ? `${styles.accordion_active}` : `${styles.card}`}
      >
        <div
          className={styles.card_header}
          onClick={() => setVisibility(!visibility)}
        >
          <p className={styles.title}>{title}</p>
          <span className={styles.accordion_icon}>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
        <div className={styles.card_body}>{content} </div>
      </div>
    </div>
  );
};
function Accordion(props) {
  const { data, header } = props;
  // const [active, setActive] = useState(0);
  return (
    <div>
      <div className={styles.custom_accordion}>
        <div className={styles.accordion_header}>
          <h2 className={styles.header}>{header} </h2>
        </div>
        {data.map((tab, id) => {
          return (
            <AccordionItem
              key={id}
              {...tab}
              // active={active === id}
              // multiple={multiple}
              // onToggle={(e) => setActive((a) => (a === id ? "" : id))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Accordion;
