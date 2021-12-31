import React from "react";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import styles from "./Facebook.module.css";
import Images from "constants/images";

function Facebook(props) {
  const cookies = new Cookies();

  const responseFacebook = async (response) => {
    var { id, email, name, picture } = await response;
    var picture = await picture.data.url;
    console.log("Facebook infor: ", response, picture, typeof parseInt(id));

    let bodyParams = await {
      // facebook_id: parseInt(id),
      facebook_id: id,
      email,
      name,
      picture,
    };

    console.log(bodyParams);

    //     const can_login = await loginFacebook(bodyParams);
    //     if (can_login) return window.location.reload();
    //     console.log("can_login", can_login);

    //     const is_exist = await checkExistEmail(bodyParams);
    //     if (typeof is_exist === "undefined") return;
    //     console.log("is_exist", is_exist);

    //     //
    //     if (!is_exist) {
    //       //api login da~ auto register r
    //     } else {
    //       const answer = window.confirm(
    //         "tai khoan nay da duoc dang ki, do co phai ban ko ?."
    //       );

    //       bodyParams["is_duplicate"] = answer;
    //       console.log("check body", bodyParams);

    //       await registerFacebook(bodyParams);
    //     }
  };

  //   const loginFacebook = async (bodyParams) => {
  //     console.log("loginFacebook");
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8000/api/login-facebook",
  //         bodyParams
  //       );

  //       console.log("php loginFacebook: ", res.data);

  //       await saveCookie(res.data);

  //       return true;
  //     } catch (error) {
  //       const { data, meta } = await error.response.data;
  //       console.log("meta", meta);
  //       const { errors } = await meta;
  //       console.log("errors", errors);
  //       console.log("error is", errors[Object.keys(errors)[0]]);

  //       if (errors[Object.keys(errors)[0]] == "facebook id not existed")
  //         return false;
  //     }
  //   };

  //   const checkExistEmail = async (bodyParams) => {
  //     console.log("checkExistEmail", bodyParams);
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8000/api/register-facebook",
  //         bodyParams
  //       );
  //       console.log("res", res);

  //       const { user, message_duplicate } = await res.data;

  //       if (user) {
  //         Alert({ success: res.data.message });
  //         console.log("đã tạo thành công");
  //         await saveCookie(res.data);
  //         window.location.reload();
  //         return;
  //       }

  //       return true;

  //       // const { listSameEmail, message } = await res.data;
  //       // console.log("listSameEmail", listSameEmail);
  //     } catch (error) {
  //       console.log("error exist email", error.response.data);
  //       return;
  //     }
  //   };

  //   const registerFacebook = async (bodyParams) => {
  //     console.log("register");
  //     try {
  //       var res = await axios.post(
  //         "http://localhost:8000/api/register-facebook",
  //         bodyParams
  //       );

  //       console.log("res", res.data);

  //       Alert({ success: res.data.message });

  //       await saveCookie(res.data);
  //       window.location.reload();
  //     } catch (error) {
  //       console.log("error registerFackbook", error.response.data);
  //     }
  //   };

  //   const saveCookie = (data) => {
  //     const { access_token, token_type, expires_in, user } = data;
  //     console.log("avc", access_token, token_type, expires_in, user);

  //     cookies.set("user", user, {
  //       path: "/",
  //       maxAge: expires_in,
  //     });

  //     cookies.set("access_token", access_token, {
  //       path: "/",
  //       maxAge: expires_in,
  //     });

  //     cookies.set("token_type", token_type, {
  //       path: "/",
  //       maxAge: expires_in,
  //     });
  //   };

  return (
    <Button variant="outlined">
      <FacebookLogin
        appId="555833908855014"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="account_facebook"
      />
    </Button>
  );
}

export default Facebook;

// <img className={styles.fb} src={Images.FB} />
