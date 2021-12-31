import React, { useState } from "react";
import styles from "./Image.module.css";

function PreviewImage(props) {
  const { file } = props;
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <label className={styles.preview_img}>
      <img src={preview} alt="preview" />
    </label>
  );
}

export default PreviewImage;
