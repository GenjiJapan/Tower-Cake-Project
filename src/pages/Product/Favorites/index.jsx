import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Indicator from "components/Pagination";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Zoom from "react-reveal/Zoom";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import styles from "./Favorites.module.css";

function Favorites(props) {
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);

  const cookies = new Cookies();
  const showForm = useSelector((state) => state.form.showForm);
  const { accountId } = cookies.get("account");
  console.log(
    "🚀 ~ file: index.jsx ~ line 20 ~ Favorites ~ accountId",
    accountId
  );

  const [favList, setFavList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });

  useEffect(() => {
    getFavList();
  }, [page]);

  useEffect(() => {
    var page = queryString.parse(window.location.search).page;
    console.log("🚀 ~ file: index.jsx ~ line 35 ~ useEffect ~ page", page);
    console.log(
      "🚀 ~ file: index.jsx ~ line 42 ~ getFavList ~ pagination._page",
      pagination._page,
      page
    );
  }, [page]);

  const getFavList = async () => {
    try {
      const res = await axios.get(
        `/api/users/favorites/user=${accountId}/?page=${page}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 25 ~ getFavList ~ fav list res data ",
        res.data
      );

      setFavList(res.data.mappingResults);
      setPagination({
        _page: res.data.metadata.currentPage,
        _limit: res.data.metadata.limit,
        _totalRows: res.data.metadata.totalRows,
      });
      setTotalPages(res.data.metadata.totalPages);
    } catch (error) {
      console.log("Failed to fetch Fav List :", error.message);
    }
  };

  return (
    <div>
      <div
        className={
          showForm === "Fav list"
            ? `${styles.favorites}`
            : `${styles.disable_fav}`
        }
      >
        {favList.length === 0 && (
          <Zoom delay={100}>
            <div className={styles.empty_order}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faScroll}
                size="4x"
                style={{ color: "#0c7d97" }}
              />
              <h2>
                Oops! <br />
                You have no Order in this list.
              </h2>
            </div>
          </Zoom>
        )}
        {favList.length !== 0 && (
          <div className={styles.fav_list}>
            {favList.map((item, key) => {
              return (
                <div key={key} className={styles.product_item}>
                  <span className={styles.content}>
                    <img
                      className={styles.img}
                      src={item.product.image}
                      alt="abc"
                    />
                    <div className={styles.content_detail}>
                      <span className={styles.content_name}>
                        {item.product.productName} {item.product.productId}{" "}
                      </span>{" "}
                      <span className={styles.content_price}>
                        {item.product.description}
                      </span>{" "}
                      <button className={`${styles.btn} ${styles.btn_1}`}>
                        <Link to={`/product/item-detail/${item.productId}`}>
                          Find more detail
                          <svg>
                            <rect
                              x="0"
                              y="0"
                              fill="none"
                              width="100%"
                              height="100%"
                            />
                          </svg>
                        </Link>
                      </button>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <Indicator
          setPage={setPage}
          totalPages={totalPages}
          pagination={pagination}
        />
      </div>
    </div>
  );
}

export default Favorites;
