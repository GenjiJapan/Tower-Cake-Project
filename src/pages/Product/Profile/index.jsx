import {
  faBell,
  faHeart,
  faShoppingBag,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openForm } from "actions/Form";
import axios from "axios";
import Banner from "components/Banner";
import Error from "components/NotFound";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Cookies from "universal-cookie";
import Drawer from "../Drawer";
import styles from "./Profile.module.css";

function ProfileForm(props) {
  const { path, url } = useRouteMatch();
  console.log(
    "🚀 ~ file: index.jsx ~ line 27 ~ ProfileForm ~ path, url",
    path,
    url
  );
  const cookies = new Cookies();

  const formStorage = useSelector((state) => state.form);
  const { drawerId, showForm } = formStorage;
  console.log(
    "🚀 ~ file: index.jsx ~ line 34 ~ ProfileForm ~ drawerId",
    drawerId,
    showForm
  );

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [formId, setFormId] = useState();
  var [accountData, setAccountData] = useState({});

  useEffect(() => {
    getAccount();
  }, []);

  if (!cookies.get("account")) return <Error />;
  const { accountId } = cookies.get("account");

  const displayForm = (id, name) => {
    setShow(!show);
    setFormId(id);
    dispatch(openForm({ drawerId: formId, component: name }));
    console.log(
      "🚀 ~ file: index.jsx ~ line 43 ~ displayForm ~ id, name",
      id,
      name
    );
  };

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

  const getFavs = async () => {
    const res = await axios.get(`/api/users/favorites/user=${accountId}`);
    displayForm(3, "Fav list");
    console.log("res là : ", res);
  };

  const handleLogout = () => {
    cookies.remove("account");
    cookies.remove("token");
    window.location.href = "/home";
  };

  return (
    <div>
      <Banner title="My profile" backgroundUrl={Images.SPACE4} />
      <div className={styles.profile}>
        <div className={styles.drawer}>
          <div className={styles.user_avatar}>
            <div className={styles.avatar}>
              <img
                src={accountData.avatar ? accountData.avatar : Images.IMG_NULL}
                alt=""
              />
            </div>
          </div>
          <div className={styles.label_drawer}>
            <label
              className={
                formId === 1 ? `${styles.account}` : ` ${styles.label}`
              }
              onClick={() => displayForm(1, "Profile")}
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faUserCircle}
                size="2x"
                style={{
                  color: formId === 1 ? "red" : "#0c7d97",
                  transition: "color 0.5s ease-in-out",
                }}
              />
              <span>
                <Link
                  style={{
                    color: formId === 1 ? "red" : "#0c7d97",
                    transition: "color 0.5s ease-in-out",
                  }}
                  to={`${url}/account`}
                >
                  My account
                </Link>
              </span>
            </label>

            <label
              className={formId === 2 ? `${styles.order}` : ` ${styles.label}`}
              onClick={() => displayForm(2, "Order")}
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faShoppingBag}
                // transform="shrink-3 "
                size="2x"
                style={{
                  color: formId === 2 ? "red" : "#0c7d97",
                  transition: "color 0.5s ease-in-out",
                }}
              />
              <span>
                <Link
                  style={{
                    color: formId === 2 ? "red" : "#0c7d97",
                    transition: "color 0.5s ease-in-out",
                  }}
                  to={`${path}/order`}
                >
                  My order
                </Link>
              </span>
            </label>

            <label
              className={formId === 3 ? `${styles.fav}` : ` ${styles.label}`}
              // onClick={() => displayForm(3, "Fav list")}
              onClick={getFavs}
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faHeart}
                size="2x"
                style={{
                  color: formId === 3 && drawerId === 3 ? "red" : "#0c7d97",
                  transition: "color 0.5s ease-in-out",
                }}
              />
              <span>
                <Link
                  style={{
                    color: formId === 3 && drawerId === 3 ? "red" : "#0c7d97",
                    transition: "color 0.5s ease-in-out",
                  }}
                  to={`${path}/favorites`}
                >
                  My favorites list
                </Link>
              </span>
            </label>

            <label
              className={formId === 4 ? `${styles.notify}` : ` ${styles.label}`}
              onClick={() => displayForm(4, "Notify")}
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faBell}
                size="2x"
                style={{
                  color: formId === 4 && drawerId === 4 ? "red" : "#0c7d97",
                  transition: "color 0.5s ease-in-out",
                }}
              />
              <span>
                <Link
                  style={{
                    color: formId === 4 && drawerId === 4 ? "red" : "#0c7d97",
                    transition: "color 0.5s ease-in-out",
                  }}
                  to={`${path}/notify`}
                >
                  My notifications
                </Link>
              </span>
            </label>

            <label
              className={formId === 5 ? `${styles.logout}` : ` ${styles.label}`}
              // onClick={() => displayForm(5, "")}
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                className={styles.icon}
                icon={faSignOutAlt}
                size="2x"
                rotation={180}
                style={{
                  color: formId === 5 ? "red" : "#0c7d97",
                  transition: "color 0.5s ease-in-out",
                }}
              />

              <span>
                <Link
                  style={{
                    color: formId === 5 ? "red" : "#0c7d97",
                    transition: "color 0.5s ease-in-out",
                  }}
                >
                  Log out
                </Link>
              </span>
            </label>
          </div>
        </div>

        <Switch>
          <Redirect exact from={path} to={`${path}/account`} />
          <Route path={`${path}/:form`} component={Drawer} />
        </Switch>
      </div>
    </div>
  );
}

export default ProfileForm;
