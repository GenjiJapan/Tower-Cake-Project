import { CircularProgress } from "@mui/material";
import { addNewUser } from "actions/Login";
import axios from "axios";
import Notification from "components/Notification";
import Images from "constants/images";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormFeedback } from "reactstrap";
import * as Yup from "yup";
import styles from "../LoginForm/Login.module.css";
import add from "./Register.module.css";

function SignUp(props) {
  const { transform, setTransform } = props;

  const dispatch = useDispatch();

  const [notify, setNotify] = useState({
    message: "",
    type: "",
  });

  const initialValues = {
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    IsAgree: false,
  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string()
      .min(6, "Must be at least 6 character or equal")
      .max(50, "Must be 30 character or less")
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),

    Password: Yup.string()
      .min(6, "Must be at least 6 character or equal")
      .max(30, "Must be 30 character or less")
      .required("This field is required"),

    ConfirmPassword: Yup.string().when("Password", {
      is: (value) => value && value.length === 0,
      then: Yup.string().required(
        "Please input the password first to continue"
      ),
      otherwise: Yup.string()
        .max(30, "Must be 30 character or less")
        .required("This field is required")
        .oneOf([Yup.ref("Password"), null], "Must match the password"),
    }),

    Email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),

    IsAgree: Yup.boolean()
      .required("This field is required")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("values : ", values, setSubmitting);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify({
          Username: values.Username,
          Password: values.Password,
          Email: values.Email,
          ConfirmPassword: values.ConfirmPassword,
          IsAgree: values.IsAgree,
        }).length,
      },
    };
    try {
      const res = await axios.post(
        "/api/register",
        {
          Username: values.Username,
          Password: values.Password,
          Email: values.Email,
          ConfirmPassword: values.ConfirmPassword,
          IsAgree: values.IsAgree,
        },
        config
      );
      console.log("res là : ", res.data);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    dispatch(addNewUser(values));
    console.log("values is : ", { values });
    setTimeout(() => {
      // console.log("value : ", values);
      setNotify({
        message: "Signup Successfully",
        type: "success",
      });
      setSubmitting(false);
    }, 2000);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  };

  return (
    <div>
      <div className={`${styles.user} ${styles.singupBx}`}>
        <div
          className={
            transform ? `${styles.active_signupForm}` : `${styles.formBx}`
          }
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, { setSubmitting })
            }
          >
            {(formikProps) => {
              const { errors, isSubmitting } = formikProps;

              return (
                <div>
                  <Form>
                    <h2>Create an account</h2>
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
                      name="Email"
                      type="email"
                      placeholder="Email Address"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="Email"
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

                    <Field
                      className={errors ? "is-invalid" : ""}
                      name="ConfirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      className={styles.error}
                      name="ConfirmPassword"
                      component={FormFeedback}
                    />

                    <div className={styles.forgot_remember}>
                      <label htmlFor="rules">
                        <Field
                          className={errors ? "is-invalid" : ""}
                          name="IsAgree"
                          type="checkbox"
                          id="rules"
                        />
                        I argee with &nbsp;{" "}
                        <a href="#/"> Our terms and rules</a>
                      </label>
                    </div>
                    <ErrorMessage
                      className={styles.error}
                      name="IsAgree"
                      component={FormFeedback}
                    />

                    {isSubmitting ? (
                      <div className={add.submit}>
                        <CircularProgress color="success" />
                      </div>
                    ) : (
                      <input type="submit" name="" value="Sign up" />
                    )}
                    <Notification notify={notify} setNotify={setNotify} />
                  </Form>
                  <p className={styles.signup}>
                    Already have an account?{" "}
                    <button onClick={() => setTransform(!transform)}>
                      Sign in
                    </button>
                  </p>
                </div>
              );
            }}
          </Formik>
        </div>
        <div
          // className={styles.imgBx}
          className={
            // styles.imgBx
            transform ? `${styles.active_signup_img}` : `${styles.imgBx}`
          }
        >
          <img src={Images.register_logo} alt="oh sheet jerry" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
