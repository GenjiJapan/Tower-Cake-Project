import Forgot from "components/Forgot";
import SignIn from "components/Signin";
import SignUp from "components/SignUp";
import React, { useState } from "react";
import styles from "./Login.module.css";

function Login(props) {
  const { openModal, setOpenModal } = props;

  const [showForgot, setShowForgot] = useState(false);
  const [transform, setTransform] = useState(false);

  return (
    <div>
      <div
        className={
          openModal ? `${styles.open_login}` : `${styles.login_register}`
        }
        id="login_form"
      >
        <div
          className={
            openModal ? `${styles.overlay}` : `${styles.disable_overlay}`
          }
          id="overlay"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className={styles.login_register_body}>
          <div className={styles.body_container} id="body_container">
            <SignIn
              showForgot={showForgot}
              setShowForgot={setShowForgot}
              transform={transform}
              setTransform={setTransform}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <SignUp
              openModal={openModal}
              setOpenModal={setOpenModal}
              transform={transform}
              setTransform={setTransform}
            />
            <Forgot
              openModal={openModal}
              setOpenModal={setOpenModal}
              showForgot={showForgot}
              setShowForgot={setShowForgot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
