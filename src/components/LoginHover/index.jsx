import { Button } from "@mui/material";
import { openForm } from "actions/Form";
import axios from "axios";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";
import styles from "./LoginHover.module.css";

function LoginHover(props) {
  const { openMiniTab, setOpenMiniTab } = props;
  const cookies = new Cookies();

  const history = useHistory();
  const dispatch = useDispatch();
  const formStorage = useSelector((state) => state.form);
  const account = cookies.get("account");

  const [formId, setFormId] = useState(formStorage.formId);
  var [accountData, setAccountData] = useState({});

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    };

    try {
      const res = await axios.get(`/api/admin/user/get`, config);
      console.log("line 36 ~ res", res);

      accountData = res.data.accountModel;
      setAccountData(accountData);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLogout = async () => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 23 ~ handleLogout ~ cookies",
      cookies
    );
    await cookies.remove("account");
    await cookies.remove("token");
    console.log(
      "🚀 ~ file: index.jsx ~ line 25 ~ handleLogout ~ cookies",
      cookies
    );

    // if()
    window.location.href = await "/home";
  };

  const handlePush = (id, name) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    history.push("/profile");
    setFormId(id);
    setTimeout(() => {
      setOpenMiniTab(false);
    }, 500);
    dispatch(openForm({ formId, component: name }));
  };

  return (
    <div
      className={
        openMiniTab ? `${styles.info_container}` : `${styles.close_miniTab}`
      }
    >
      <div className={styles.user_info}>
        <div className={styles.user_img}>
          <div className={styles.img}>
            <img
              src={accountData.avatar ? accountData.avatar : Images.IMG_NULL}
              alt="Cant find ur avt"
            />
          </div>
        </div>
        <div className={styles.info_content}>
          <div className={styles.name}>
            <p>{`${accountData.lastName} ${accountData.firstName}`}</p>
          </div>
          <div className={styles.email}>
            <p>{accountData.email} </p>
          </div>
          <div className={styles.manage_setting}>
            <Button
              // disabled
              sx={{
                borderRadius: 50,
                color: "#000",
                fontWeight: 600,
                fontSize: 8,
              }}
              onClick={() => handlePush(1, "Profile")}
              variant="outlined"
            >
              Manage your account
            </Button>
          </div>
        </div>
        <div className={styles.logout}>
          <Button onClick={handleLogout} variant="outlined">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginHover;
