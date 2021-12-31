import axios from "axios";
import Indicator from "components/Pagination";
import Images from "constants/images";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import styles from "../AdAcc/AdAcc.module.css";

function WarnMGM(props) {
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);

  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });

  var [violationList, setViolationList] = useState([]);

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
    getViolation();
  }, []);

  const getViolation = async () => {
    try {
      const res = await axios.get(
        `/api/users/violations/all/?Page=${page}&Limit=8`
      );
      console.log("🚀 ~ file: index.jsx ~ line 10 ~ getViolation ~ res", res);

      violationList = res.data.mappingResults;
      setViolationList(violationList);
      console.log(
        "🚀 ~ file: index.jsx ~ line 42 ~ getViolation ~ violationList",
        violationList
      );

      setPagination({
        _page: res.data.metadata.currentPage,
        _limit: res.data.metadata.limit,
        _totalRows: res.data.metadata.totalRows,
      });
      setTotalPages(res.data.metadata.totalPages);
    } catch (error) {
      if (error && error.response) console.log(error.response.data);
    }
  };
  return (
    <div className={styles.mgm_violation}>
      <div className={styles.mgm_violation_table}>
        <table>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Warn Level</th>
            <th>Reason</th>
          </tr>
          {violationList.length === 0 && (
            <div className={styles.violation_null}>
              <img
                src={Images.IMG_NULL}
                alt="Sorry we cant find everythings you need"
              />
              <span>
                Sorry about this problem, no account have been banned yet!!
              </span>
            </div>
          )}
          {violationList.length !== 0 &&
            violationList.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.accountId} </td>
                  <td>{item.username}</td>
                  <td>{item.warningId} </td>
                  <td>{item.reason} </td>
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

export default WarnMGM;
