import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Notification from "components/Notification";
import Images from "constants/images";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FormFeedback } from "reactstrap";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import styles from "../LoginForm/Login.module.css";
import add from "./Signin.module.css";

function SignIn(props) {
  const cookies = new Cookies();

  const { setOpenModal, transform, setTransform, showForgot, setShowForgot } =
    props;

  const [notify, setNotify] = useState({
    message: "",
    type: "",
  });

  const initialValues = {
    Username: "",
    Password: "",
  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string()
      .min(6, "Username is invalid")
      .max(50, "Username is invalid")
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

    Password: Yup.string()
      .min(6, "Password is invalid")
      .max(30, "Password is invalid")
      .required("This field is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setShowForgot(false);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify({
          Username: values.Username,
          Password: values.Password,
        }).length,
      },
    };
    try {
      const res = await axios.post(
        "https://localhost:5001/api/login",
        {
          Username: values.Username,
          Password: values.Password,
        },
        config
      );
      console.log("res là : ", res.data);

      if (res.data.token) {
        await saveCookie(res.data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

    setTimeout(() => {
      setNotify({
        message: "Login Successfully",
        type: "success",
      });
      setSubmitting(false);
    }, 2000);

    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  };

  const saveCookie = (data) => {
    const { token, account, expires_in } = data;
    console.log("avc", token, account);

    cookies.set("account", account, {
      path: "/",
      maxAge: expires_in,
    });

    cookies.set("token", token, {
      path: "/",
      maxAge: expires_in,
    });
  };

  const openForgot = () => {
    setTransform(true);
    setShowForgot(true);
  };

  return (
    <div>
      <div className={`${styles.user} ${styles.singinBx}`}>
        <div
          className={
            (showForgot,
            transform ? `${styles.active_signin_img}` : `${styles.imgBx}`)
          }
        >
          <img src={Images.login_logo} alt="oh sheet tom" />
        </div>
        <div
          className={
            (showForgot,
            transform ? `${styles.active_signinForm}` : `${styles.formBx}`)
          }
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, { setSubmitting })
            }
          >
            {(formikProps) => {
              const { errors, isSubmitting, isValid } = formikProps;
              return (
                <div>
                  <Form>
                    <h2>Sign In</h2>
                    <FontAwesomeIcon
                      onClick={() => setOpenModal(false)}
                      className={add.timesIcon}
                      icon={faTimesCircle}
                    />

                    <Field
                      className={errors ? "is-invalid" : ""}
                      name="Username"
                      type="text"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="Username"
                      component={FormFeedback}
                    />

                    <Field
                      className={errors ? "is-invalid" : ""}
                      name="Password"
                      type="password"
                      placeholder="Create Password"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="Password"
                      component={FormFeedback}
                    />

                    <div className={styles.forgot_remember}>
                      <label htmlFor="remember">
                        <input type="checkbox" id="remember" />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className={styles.forgot}
                        onClick={openForgot}
                      >
                        Forgot password?
                      </button>
                    </div>
                    {isSubmitting ? (
                      <div className={add.submit}>
                        <CircularProgress color="success" />
                      </div>
                    ) : (
                      <input
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        name=""
                        value="Log in"
                      />
                    )}
                    <p className={styles.signup}>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setTransform(!transform)}
                      >
                        Sign up
                      </button>
                    </p>
                    <Notification notify={notify} setNotify={setNotify} />
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
