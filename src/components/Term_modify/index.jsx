import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Term_modify.module.css";

TermModify.propTypes = {
  title: PropTypes.string,
  titleNote: PropTypes.string,
};

TermModify.defaultProps = {
  title: "",
  titleNote: "",
};

const TermModifyItem = ({ title, content }) => {
  return (
    <div>
      <div className={styles.term_modify_item}>
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

function TermModify(props) {
  const { data, title, titleNote } = props;
  return (
    <div className={styles.term_modify}>
      <div className={styles.term_modify_title}>
        <h2>{title}</h2>{" "}
      </div>
      <div className={styles.term_modify_content}>
        <h3>{titleNote}</h3>{" "}
      </div>
      {data.map((tab, id) => {
        return <TermModifyItem key={id} {...tab} />;
      })}
    </div>
  );
}

export default TermModify;
