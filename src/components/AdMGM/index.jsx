import axios from "axios";
import Indicator from "components/Pagination";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styles from "../AdAcc/AdAcc.module.css";

function AdMGM(props) {
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);

  const cookies = new Cookies();
  const account = cookies.get("account");
  const token = cookies.get("token");

  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });
  var [adminList, setAdminList] = useState([]);

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
    getAdmin();
  }, [page]);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx ~ line 15 ~ AdMGM ~ account", account);
  }, []);

  const getAdmin = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `/api/admin/user/all/?page=${page}&limit=8&type=admin`,
        config
      );
      console.log("🚀 ~ file: index.jsx ~ line 10 ~ getAdmin ~ res", res);

      adminList = res.data.pagination.contents;
      console.log(
        "🚀 ~ file: index.jsx ~ line 30 ~ getAdmin ~ adminList",
        adminList
      );

      var newAdmins = adminList.filter(
        (item) =>
          item.permissionId !== 5 && item.accountId !== account.accountId
      );
      setAdminList(newAdmins);

      setPagination({
        _page: res.data.pagination.meta.currentPage,
        _limit: res.data.pagination.meta.limit,
        _totalRows: res.data.pagination.meta.totalRows,
      });
      setTotalPages(res.data.pagination.meta.totalPages);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const handleRemove = async (id) => {
    console.log("🚀 ~ file: index.jsx ~ line 75 ~ handleRemove ~ id", id);
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    };

    const body = {
      AccountId: id,
      newPermission: 5,
    };
    console.log("🚀 ~ file: index.jsx ~ line 85 ~ handleRemove ~ body", body);

    try {
      const res = await axios.patch(`/api/admin/update/role`, body, config);
      console.log("🚀 ~ file: index.jsx ~ line 73 ~ handleRemove ~ res", res);

      var newAdmins = adminList.filter(
        (item) => item.permissionId !== 5 && item.accountId !== id
      );

      setAdminList(newAdmins);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
  return (
    <div className={styles.mgm_admin}>
      <div className={styles.mgm_admin_table}>
        <table>
          <tr>
            <td>ID</td>
            <td>UserName</td>
            <td>LastName</td>
            <td>FirstName</td>
            <td>DOB</td>
            <td>Gender</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Created date</td>
            <td>Remove</td>
          </tr>
          {adminList.map((item, key) => {
            return (
              <tr key={key}>
                <th>{item.accountId} </th>
                <th>{item.username} </th>
                <th>{item.lastName} </th>
                <th>{item.firstName}</th>
                <th>{item.dob} </th>
                <th>{item.gender}</th>
                <th>{item.email}</th>
                <th>{item.phone}</th>
                <th>2021/12/10</th>
                <th>
                  <i
                    onClick={() => handleRemove(item.accountId)}
                    class="fas fa-trash-alt"
                  ></i>
                </th>
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
    </div>
  );
}

export default AdMGM;
