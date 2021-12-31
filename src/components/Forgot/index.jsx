import Notification from "components/Notification";
import Images from "constants/images";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { FormFeedback } from "reactstrap";
import * as Yup from "yup";
import styles from "../LoginForm/Login.module.css";

function Forgot(props) {
  const { showForgot, setOpenModal } = props;

  const [notify, setNotify] = useState({
    message: "",
    type: "",
  });

  const validationSchema = Yup.object().shape({
    Email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
  });
  const initialValues = {
    Email: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      // console.log("value : ", values);
      setNotify({
        message: "We have sent a code to your email",
        type: "success",
      });
      setSubmitting(false);
    }, 2000);
    setTimeout(() => {
      setOpenModal(false);
      // window.location.href = "/home";
    }, 3000);
  };
  return (
    <div>
      <div className={`${styles.user} ${styles.forgotBx}`}>
        <div
          className={
            showForgot ? `${styles.active_forgotForm}` : `${styles.formBx}`
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
                <Form>
                  <h2>Forgot password</h2>
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
                  <input
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    value="Send"
                  />
                  <Notification notify={notify} setNotify={setNotify} />
                </Form>
              );
            }}
          </Formik>
        </div>
        <div
          className={
            showForgot ? `${styles.active_forgot_img}` : `${styles.imgBx}`
          }
        >
          <img src={Images.register_logo} alt="oh sheet jerry" />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
