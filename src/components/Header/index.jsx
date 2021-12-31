import { openForm } from "actions/Form";
import axios from "axios";
import Badge from "components/Badge";
import CartHover from "components/CartHover";
import Login from "components/LoginForm";
import LoginHover from "components/LoginHover";
import NotifyHover from "components/NotifyHover";
import Search from "components/Search";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Header.css";
import styles from "./Header.module.css";

function Header(props) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const loginStorage = useSelector((state) => state.login);
  const { account } = loginStorage;

  const [openModal, setOpenModal] = useState(false);
  const [openBurgur, setOpenBurgur] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMiniTab, setOpenMiniTab] = useState(false);
  const [search, setSearch] = useState(false);
  var [accountData, setAccountData] = useState({});

  useEffect(() => {
    console.log("cookies : ", cookies.get("account"), cookies.get("token"));
  }, []);

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const Header = this.document.querySelector("header");
      Header.classList.toggle("sticky", window.scrollY > 0);
    });
    return () => {
      window.removeEventListener("scroll", window.scrollY > 0);
    };
  }, []);

  const goTop = (id, name) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // setFormId(id);
    dispatch(openForm({ drawerId: id, component: name }));
    console.log(
      "🚀 ~ file: index.jsx ~ line 58 ~ goTop ~ openForm",
      dispatch(openForm({ drawerId: id, component: name }))
    );
    console.log("🚀 ~ file: index.jsx ~ line 54 ~ goTop ~ id, name", id, name);
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

  if (window.location.pathname === `/adminPage`) return <div></div>;
  if (window.location.pathname === `/adminPage/income`) return <div></div>;
  if (window.location.pathname === `/adminPage/order`) return <div></div>;
  if (window.location.pathname === `/adminPage/product`) return <div></div>;
  if (window.location.pathname === `/adminPage/detailProduct`)
    return <div></div>;
  if (window.location.pathname === `/adminPage/adAccount`) return <div></div>;

  return (
    <div className={styles.form1}>
      <div className={styles.header_boder} id="section_1">
        <header className="header">
          <div className={styles.header_navbar}>
            <div className={styles.header_navbar_list}>
              <Link to="/" className={`${styles.header_logo} ${styles.link}`}>
                Tour des Gâteau
              </Link>
            </div>

            <ul className={styles.header_navbar_list}>
              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_mid}`}
              >
                <Link
                  to="/"
                  onClick={goTop}
                  className={styles.header_navbar_item_link}
                >
                  Home
                </Link>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_mid}`}
              >
                <a
                  href="#/"
                  rel="noopener noreferrer"
                  className={styles.header_navbar_item_link}
                >
                  About
                </a>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_mid}`}
              >
                <Link
                  to="/product/"
                  onClick={goTop}
                  className={styles.header_navbar_item_link}
                >
                  Menu
                </Link>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_mid}`}
              >
                <Link
                  // href="#/"
                  to="/paySuccess"
                  rel="noopener noreferrer"
                  className={styles.header_navbar_item_link}
                >
                  Gallery
                </Link>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_mid}`}
              >
                <Link
                  to={
                    account.permissionId >= 4 || account.permissionId <= 0
                      ? "/home"
                      : "/adminPage"
                  }
                  className={styles.header_navbar_item_link}
                >
                  {account.permissionId >= 4 || account.permissionId <= 0
                    ? "Contact"
                    : "Manage"}
                </Link>
              </li>
            </ul>

            <ul className={styles.header_navbar_list}>
              <li
                onClick={() => setOpenBurgur(!openBurgur)}
                className={`${styles.menu} ${styles.header_navbar_item} ${styles.header_navbar_item_rigth}`}
              >
                <span
                  style={{
                    transform: openBurgur ? "rotate(45deg)" : "rotate(0)",
                  }}
                ></span>
                <span
                  style={{
                    opacity: openBurgur ? "0" : "1",
                    transform: openBurgur
                      ? "translateX(20px)"
                      : "translateX(0)",
                  }}
                ></span>
                <span
                  style={{
                    transform: openBurgur ? "rotate(-45deg)" : "rotate(0)",
                  }}
                ></span>
              </li>

              <Search search={search} setSearch={setSearch} />
              <li
                onClick={() => setSearch(!search)}
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_rigth} ${styles.search}`}
              >
                {/*  search  */}

                <a>
                  <i className="fas fa-search"></i>
                </a>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_rigth} ${styles.header_navbar_cart_hover}`}
              >
                {/*  cart  */}
                <Link to="/cart">
                  <i className="fas fa-shopping-cart "></i>
                  <span className={styles.count_cicle}>
                    <Badge />
                  </span>
                </Link>
                <CartHover />
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_rigth}`}
              >
                {/*  favorite  */}
                <Link
                  to="/profile/favorites"
                  onClick={() => goTop(3, "Fav list")}
                >
                  <i className="fas fa-heart"></i>
                </Link>
              </li>

              <li
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_rigth}`}
              >
                <Link to="/profile/notify" onClick={() => goTop(4, "Notify")}>
                  <i className="fas fa-bell"></i>
                </Link>
                <NotifyHover />
              </li>

              <li
                onClick={() => setOpenModal(true)}
                className={`${styles.header_navbar_item} ${styles.header_navbar_item_rigth}`}
              >
                {/*  login */}

                <a>
                  {account ? (
                    <img
                      onClick={() => setOpenMiniTab(!openMiniTab)}
                      className={styles.defaultImg}
                      src={
                        accountData.avatar
                          ? accountData.avatar
                          : Images.IMG_NULL
                      }
                      alt="Cant find ur img"
                    />
                  ) : (
                    <i className="fas fa-user-circle"></i>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </header>
      </div>

      {account ? (
        <LoginHover openMiniTab={openMiniTab} setOpenMiniTab={setOpenMiniTab} />
      ) : (
        <Login openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default Header;
