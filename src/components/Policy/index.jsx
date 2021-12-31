import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
// import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import styles from "./Policy.module.css";

Policy.propTypes = {
  title: PropTypes.string,
  titleNote: PropTypes.string,
};
Policy.defaultProps = {
  title: "",
  titleNote: "",
};

const PolicyItems = ({ title, content }) => {
  return (
    <div>
      <div className={styles.policy_item}>
        <div className={styles.item_header}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.item_body}>
          {" "}
          <span className={styles.item_icon}>
            <FontAwesomeIcon className={styles.icon} icon={faCheckCircle} />
          </span>
          <div className={styles.item_content}> {content} </div>
        </div>
      </div>
    </div>
  );
};

function Policy(props) {
  const { data, title, titleNote } = props;
  return (
    <div className={styles.policy}>
      <div className={styles.policy_title}>
        <h2>{title}</h2>{" "}
      </div>
      <div className={styles.policy_title}>
        <h3>{titleNote}</h3>{" "}
      </div>
      {data.map((tab, id) => {
        return <PolicyItems key={id} {...tab} />;
      })}
    </div>
  );
}

export default Policy;
