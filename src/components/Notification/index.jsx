import { Alert } from "@mui/material";
import React from "react";

function Notification(props) {
  const { notify, styleClass } = props;

  return (
    <div>
      <Alert className={styleClass} severity={notify.type}>
        {notify.message}
      </Alert>
    </div>
  );
}

export default Notification;
