import axios from "axios";
import Indicator from "components/Pagination";
import Images from "constants/images";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Cookies from "universal-cookie";
import styles from "../AdAcc/AdAcc.module.css";
import "../AdIncome/SelectStyles.css";

UserMGM.propTypes = {};

const animatedComponents = makeAnimated();
function UserMGM(props) {
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);

  const cookies = new Cookies();
  const token = cookies.get("token");

  const [warningId, setWarningId] = useState(0);
  const [reasonBan, setReasonBan] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [hasBanned, setHasBanned] = useState(false);

  var [userList, setUserList] = useState([]);
  var [userDetail, setUserDetail] = useState({});
  var [violationId, setViolationId] = useState(0);
  var [reason, setReason] = useState(null);
  var [userViolations, setUserViolations] = useState([]);
  var [violationLevel, setViolationLevel] = useState([]);

  useEffect(() => {
    var page = queryString.parse(window.location.search).page;
    console.log("🚀 ~ file: index.jsx ~ line 35 ~ useEffect ~ page", page);
    console.log(
      "🚀 ~ file: index.jsx ~ line 42 ~ getFavList ~ pagination._page",
      pagination._page,
      page
    );
  }, [page]);

  useEffect(() => {
    getUser();
  }, [page]);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx ~ line 13 ~ UserMGM ~ token", token);
  }, []);

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `/api/admin/user/all/?page=${page}&limit=8&type=user`,
        config
      );
      console.log("🚀 ~ file: index.jsx ~ line 16 ~ getUser ~ res", res);

      userList = res.data.pagination.contents;

      setUserList(userList);
      console.log(
        "🚀 ~ file: index.jsx ~ line 41 ~ getUser ~ userList",
        userList
      );

      setPagination({
        _page: res.data.pagination.meta.currentPage,
        _limit: res.data.pagination.meta.limit,
        _totalRows: res.data.pagination.meta.totalRows,
      });
      setTotalPages(res.data.pagination.meta.totalPages);
    } catch (error) {
      if (error && error.response) console.log(error.response.data);
    }
  };

  const getDetailUser = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`/api/admin/user/get-user?id=${id}`, config);
      console.log("🚀 ~ file: index.jsx ~ line 91 ~ getDetailUser ~ res", res);

      userDetail = res.data.accountModel;
      setUserDetail(userDetail);

      // userId = id
      // setUserId(userId)
      userViolations = res.data.accountModel.violations;
      setUserViolations(userViolations);

      console.log(
        "🚀 ~ file: index.jsx ~ line 107 ~ getDetailUser ~ userViolations",
        userViolations
      );
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const openUserDetail = (id) => {
    getDetailUser(id);
    setHasUserInfo(!hasUserInfo);
  };

  const getBanUser = async (id) => {
    console.log("🚀 ~ file: index.jsx ~ line 110 ~ getBanUser ~ id", id);

    const body = {
      AccountId: id,
      WarningId: warningId,
      Reason: reasonBan,
    };

    setTimeout(() => {
      setHasUserInfo(false);
      setHasBanned(false);
    }, 3000);

    try {
      const res = await axios.post(`/api/users/violations`, body);
      console.log("🚀 ~ file: index.jsx ~ line 117 ~ getBanUser ~ res", res);

      getUser();
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const handleBanUser = (id) => {
    getBanUser(id);
  };

  const handleColor = (item) => {
    if (item.violations.length === 0) return styles.warning_0;
    if (item.violations[0].warningId === 0) return styles.warning_0;
    if (item.violations[0].warningId === 1) return styles.warning_1;
    if (item.violations[0].warningId === 2) return styles.warning_2;
    if (item.violations[0].warningId === 3) return styles.warning_3;
    return styles.warning_0;
  };

  const violationOptions = userViolations.map((item) => ({
    value: item.warningId,
    label: item.warningId,
    reason: item.reason,
  }));

  return (
    <div className={styles.mgm_user}>
      <div className={styles.mgm_user_note}>
        <div className={`${styles.note_item} ${styles.note_item_1}`}>
          <i class="fas fa-circle fa-lg"></i> No warning
        </div>
        <div className={`${styles.note_item} ${styles.note_item_2}`}>
          <i class="fas fa-circle fa-lg"></i> Warning 1
        </div>
        <div className={`${styles.note_item} ${styles.note_item_3}`}>
          <i class="fas fa-circle fa-lg"></i> Warning 2
        </div>
        <div className={`${styles.note_item} ${styles.note_item_4}`}>
          <i class="fas fa-circle fa-lg"></i> Warning 3
        </div>
      </div>

      <div className={styles.user_table}>
        <table>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Membership</th>
          </tr>

          {userList.map((item, key) => {
            return (
              <tr
                key={key}
                onClick={() => openUserDetail(item.accountId)}
                className={handleColor(item)}
              >
                <td>{item.accountId} </td>
                <td>{item.username}</td>
                <td>{item.email} </td>
                <td>{item.phone} </td>
                <td>
                  <i class={item.membership !== 0 ? "fas fa-check" : ""}></i>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className={styles.mgm_control}>
        <Indicator
          setPage={setPage}
          totalPages={totalPages}
          pagination={pagination}
        />
      </div>

      {/* User info form */}
      <div
        className={hasUserInfo ? `${styles.modal}` : `${styles.close_modal}`}
      >
        <div className={styles.user_detail_form}>
          <div className={styles.user_detail_header}>
            <div className={styles.short_info_form}>
              <div className={styles.short_info_img}>
                <img
                  // src={!avatar ? Images.SEXY : avatar}
                  src={Images.SEXY}
                  alt=""
                />
              </div>
              <span>{`#${userDetail.accountId}`} </span>
              <span>{userDetail.username} </span>
            </div>
            <button
              onClick={() => setHasUserInfo(!hasUserInfo)}
              className={styles.out_btn}
            >
              <i class="far fa-times-circle fa-lg"></i>
            </button>
          </div>

          <div className={styles.user_detail_body}>
            <div className={styles.user_fullname}>
              <div className={styles.user_info_label}>
                <span>First name</span>
                <label htmlFor="">{userDetail.firstName} </label>
              </div>
              <div className={styles.user_info_label}>
                <span>Last name</span>
                <label htmlFor="">{userDetail.lastName} </label>
              </div>
            </div>

            <div className={styles.user_dob_gender}>
              <div className={styles.user_info_label}>
                <span>DOB</span>
                <label htmlFor="">{userDetail.dob} </label>
              </div>
              <div className={styles.user_info_label}>
                <span>Gender</span>
                <label htmlFor="">{userDetail.gender} </label>
              </div>
            </div>

            <div className={styles.user_email_phone}>
              <div className={styles.user_info_label}>
                <span>Email</span>
                <label htmlFor="">{userDetail.email} </label>
              </div>
              <div className={styles.user_info_label}>
                <span>Phone number</span>
                <label htmlFor="">{userDetail.phone} </label>
              </div>
            </div>

            <div className={styles.user_warning}>
              <div className={styles.user_info_label}>
                <span>Violation Level</span>
                {/* <label htmlFor=""></label> */}
                <Select
                  placeholder="Choose 1 warning "
                  className="select violation react-select-container"
                  classNamePrefix="react-select"
                  options={violationOptions}
                  isSearchable={false}
                  components={animatedComponents}
                  onChange={(e) => {
                    setViolationId(e.value);
                    setReason(e.reason);
                  }}
                />
              </div>
              <div className={styles.user_info_label}>
                <span>Reason</span>
                <label htmlFor="">{reason}</label>
              </div>
            </div>

            <div className={styles.unban_ban_btns}>
              {/* <button className={styles.unban_btn}>Unban</button> */}
              <button
                onClick={() => setHasBanned(!hasBanned)}
                className={styles.ban_btn}
              >
                Ban
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Ban user form */}
      <div className={hasBanned ? `${styles.modal}` : `${styles.close_modal}`}>
        <div className={styles.ban_user_form}>
          <div className={styles.ban_user_form_title}>
            <i class="fas fa-book-dead fa-lg"></i>
            Ban user form
            <i class="fas fa-book-dead fa-lg"></i>
          </div>
          <div className={styles.ban_level}>
            <span>Violation Level</span>
            <input
              onChange={(e) => setWarningId(e.target.value)}
              type="number"
            />
          </div>
          <div className={styles.ban_reason}>
            <span>Reason</span>
            <textarea
              onChange={(e) => setReasonBan(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className={styles.cancel_apply_btns}>
            <button
              type="button"
              onClick={() => setHasBanned(!hasBanned)}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => handleBanUser(userDetail.accountId)}
              className={styles.apply_btn}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMGM;
