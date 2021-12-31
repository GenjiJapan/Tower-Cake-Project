import axios from "axios";
import AdIncome from "components/AdIncome";
import AdminLayout from "components/AdminLayout";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Cookies from "universal-cookie";
import styles from "./AdminPage.module.css";

function AdminPage(props) {
  const cookies = new Cookies();

  let { path, url } = useRouteMatch();
  const history = useHistory();
  console.log("🚀 ~ file: index.jsx ~ line 10 ~ AdminPage ~ url", url);
  console.log("🚀 ~ file: index.jsx ~ line 10 ~ AdminPage ~ path", path);

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

  return (
    <div>
      <div className={styles.AdminPage}>
        <div className={styles.sideBar}>
          <div className={styles.logo}>
            <span onClick={() => history.push("/home")}>Tour des Gateau</span>
          </div>
          <div className={styles.miniProfile}>
            <div className={styles.miniProfile_img}>
              <img
                src={accountData.avatar ? accountData.avatar : Images.IMG_NULL}
                alt=""
              />
            </div>
            <div className={styles.miniProfile_content}>
              <div className={styles.wel_edit}>
                <span>Welcome</span>
                <button>Edit</button>
              </div>
              <div className={styles.user_name}>
                <span>
                  {accountData.firstName} {accountData.lastName}{" "}
                </span>
              </div>
            </div>
          </div>
          {/* Option on sidebar */}
          <div className={styles.options}>
            {/* option 1 */}
            <Link to={`${url}/income`}>
              <div className={styles.income}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.6673 10L30.484 13.8167L22.3507 21.95L15.684 15.2833L3.33398 27.65L5.68398 30L15.684 20L22.3507 26.6667L32.8507 16.1833L36.6673 20V10H26.6673Z"
                    fill="black"
                  />
                </svg>
                <span>Income</span>
              </div>
            </Link>

            {/* option 2 */}
            <Link to={`${url}/order`}>
              <div className={styles.income}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.334 5H31.6673V1.66667H28.334V5H11.6673V1.66667H8.33398V5H6.66732C4.83398 5 3.33398 6.5 3.33398 8.33334V35C3.33398 36.8333 4.83398 38.3333 6.66732 38.3333H33.334C35.1673 38.3333 36.6673 36.8333 36.6673 35V8.33334C36.6673 6.5 35.1673 5 33.334 5ZM33.334 35H6.66732V13.3333H33.334V35Z"
                    fill="black"
                  />
                </svg>
                <span>Orders</span>
              </div>
            </Link>

            {/* option 3 */}
            <Link to={`${url}/product`}>
              <div className={styles.income}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.9993 5H4.99935C3.16602 5 1.66602 6.5 1.66602 8.33333V28.3333C1.66602 30.1667 3.16602 31.6667 4.99935 31.6667H13.3327V35H26.666V31.6667H34.9993C36.8327 31.6667 38.316 30.1667 38.316 28.3333L38.3327 8.33333C38.3327 6.5 36.8327 5 34.9993 5ZM34.9993 28.3333H4.99935V8.33333H34.9993V28.3333ZM31.666 13.3333H13.3327V16.6667H31.666V13.3333ZM31.666 20H13.3327V23.3333H31.666V20ZM11.666 13.3333H8.33268V16.6667H11.666V13.3333ZM11.666 20H8.33268V23.3333H11.666V20Z"
                    fill="black"
                  />
                </svg>
                <span>Products</span>
              </div>
            </Link>

            {/* option 4 this is belong to product */}
            <Link to={`${url}/detailProduct`}>
              <div className={styles.income}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.9993 5H4.99935C3.16602 5 1.66602 6.5 1.66602 8.33333V28.3333C1.66602 30.1667 3.16602 31.6667 4.99935 31.6667H13.3327V35H26.666V31.6667H34.9993C36.8327 31.6667 38.316 30.1667 38.316 28.3333L38.3327 8.33333C38.3327 6.5 36.8327 5 34.9993 5ZM34.9993 28.3333H4.99935V8.33333H34.9993V28.3333ZM31.666 13.3333H13.3327V16.6667H31.666V13.3333ZM31.666 20H13.3327V23.3333H31.666V20ZM11.666 13.3333H8.33268V16.6667H11.666V13.3333ZM11.666 20H8.33268V23.3333H11.666V20Z"
                    fill="black"
                  />
                </svg>
                <span>Detail product</span>
              </div>
            </Link>
            {/* option 5 */}
            <Link to={`${url}/adAccount`}>
              <div className={styles.income}>
                <i class="fas fa-user-circle fa-2x"></i>
                <span>Account</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <Switch>
            <Route exact path={path}>
              <AdIncome />
            </Route>
            <Route path={`${path}/:topicId`}>
              <AdminLayout />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
