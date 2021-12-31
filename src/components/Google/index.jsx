import { Button } from "@mui/material";
import React from "react";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";

// import "./Google.css";

function Google(props) {
  const cookies = new Cookies();

  const google = async (res) => {
    const { email, googleId, imageUrl, name } = await res.profileObj;
    console.log(res);

    //input

    let bodyParams = {
      google_id: googleId,
      email,
      name,
      picture: imageUrl,
    };

    console.log(bodyParams);

    //     const can_login = await loginGoogle(bodyParams);
    //     if (can_login) return window.location.reload();
    //     console.log("can_login", can_login);

    //     const is_exist = await checkExistEmail(bodyParams);
    //     if (typeof is_exist === "undefined") return;
    //     console.log("is_exist", is_exist);

    //     if (!is_exist) {
    //       //api login da~ auto register r
    //     } else {
    //       const answer = window.confirm(
    //         "tai khoan nay da duoc dang ki, do co phai ban ko ?."
    //       );

    //       bodyParams["is_duplicate"] = answer;
    //       console.log("check body", bodyParams);

    //       await registerGoogle(bodyParams);
    //     }
  };

  //   const loginGoogle = async (bodyParams) => {
  //     console.log("loginGoogle");
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8000/api/login-google",
  //         bodyParams
  //       );

  //       console.log("php loginGoogle: ", res.data);

  //       await saveCookie(res.data);

  //       return true;
  //     } catch (error) {
  //       const { data, meta } = await error.response.data;
  //       console.log("meta", meta);
  //       const { errors } = await meta;
  //       console.log("errors", errors);
  //       console.log("error is", errors[Object.keys(errors)[0]]);

  //       if (errors[Object.keys(errors)[0]] == "google id not existed")
  //         return false;
  //     }
  //   };

  //   const checkExistEmail = async (bodyParams) => {
  //     console.log("checkExistEmail", bodyParams);
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:8000/api/register-google",
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
  //     } catch (error) {
  //       console.log("error exist email", error.response.data);
  //       return;
  //     }
  //   };

  //   const registerGoogle = async (bodyParams) => {
  //     console.log("register");
  //     try {
  //       var res = await axios.post(
  //         "http://localhost:8000/api/register-google",
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

  const googleFailure = (res) => {};

  return (
    <Button variant="outlined">
      <GoogleLogin
        clientId="254476106207-fhejikgdof7v9101p10kval7vu577qgj.apps.googleusercontent.com"
        onSuccess={google}
        onFailure={googleFailure}
        render={(props) => {
          return (
            <button
              type="button"
              className="fa fa-google account_google"
              onClick={props.onClick}
            >
              Login with Google
            </button>
          );
        }}
      />
    </Button>

    // <div className="account_google">Google</div>
  );
}

export default Google;
