import Indicator from "components/Pagination";
import Images from "constants/images";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "../Filter";
import add from "../Product.module.css";
import styles from "./Category.module.css";

function Category(props) {
  const listSearch = useSelector((state) => state.allProducts);
  const cartStorage = useSelector((state) => state.cart);

  const { filterList, filterPage, errorMessage } = cartStorage;
  const { list, searchInfo } = listSearch;

  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);
  const [totalPages, setTotalPages] = useState(0);
  const [productList, setProductList] = useState(list);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });

  const [filters, setFilters] = useState({
    _limit: 6,
    _page: 1,
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 17 ~ Category ~ filterList, filterPage",
      filterList,
      filterPage
    );
  }, [filterList, filterPage]);

  useEffect(() => {
    loadPriorityList();
  }, [cartStorage, listSearch]);

  useEffect(() => {
    fetchAPI();
    console.log("page : ", page);
  }, [filters, page]);

  useEffect(() => {
    var page = queryString.parse(window.location.search).page;
    console.log("🚀 ~ file: index.jsx ~ line 35 ~ useEffect ~ page", page);
    console.log(
      "🚀 ~ file: index.jsx ~ line 42 ~ getFavList ~ pagination._page",
      pagination._page,
      page
    );
  }, [page]);

  const loadPriorityList = () => {
    var myList = null;
    var myPage = null;

    if (filterList.length > 0) {
      myList = filterList;
      myPage = filterPage;
    } else {
      myList = list;
      myPage = searchInfo;
    }

    console.log(
      "🚀 ~ file: index.jsx ~ line 53 ~ loadPriorityList ~ myList",
      myList
    );
    console.log(
      "🚀 ~ file: index.jsx ~ line 55 ~ loadPriorityList ~ myPage",
      myPage
    );

    setProductList(myList);
    setPagination({
      _page: myPage.currentPage,
      _limit: myPage.limit,
      _totalRows: myPage.totalRows,
    });
    setTotalPages(myPage.totalPages);
    console.log("🚀 ~ file: index.jsx ~ line 42 ~ test ~ myList", myList);
  };

  const fetchAPI = async () => {
    if (list.length > 0)
      return console.log("🚀 ~ file: index.jsx ~ line 62 ~ test ~ list", list);
    try {
      const paramString = queryString.stringify(filters);
      console.log("params : ", paramString);
      const response = await fetch(
        `https://localhost:5001/api/products/page-${page}`
      );
      const responseJSON = await response.json();
      console.log("repsonse : ", responseJSON);
      const { mappingResults, metadata } = responseJSON;

      if (errorMessage) {
        setProductList([]);
      }
      if (list.length !== 0) {
        setProductList(list);
        setPagination({
          _page: searchInfo.currentPage,
          _limit: searchInfo.limit,
          _totalRows: searchInfo.totalRows,
        });
        setTotalPages(searchInfo.totalPages);
      } else {
        setProductList(mappingResults);
        setPagination({
          _page: metadata.currentPage,
          _limit: metadata.limit,
          _totalRows: metadata.totalRows,
        });

        setTotalPages(metadata.totalPages);
      }
    } catch (error) {
      console.log("Failed to fetch Food List :", error.message);
    }
  };

  return (
    <div className={add.open_category}>
      <div className={styles.breacrumb_category}>
        <span>
          Home &gt;{" "}
          <span onClick={() => window.location.reload()}>Our products</span>{" "}
        </span>
      </div>
      <div className={styles.category_content}>
        <Filter />
        <div className={styles.catogory_product}>
          <ul className={styles.product_list}>
            {productList.length === 0 && (
              <div className={styles.categories_null}>
                <img src={Images.IMG_NULL} alt="" />
                <span>
                  We're so sorry about this problem but we cant find everything
                  you need.{" "}
                </span>
                <span>Please choose another options!!!</span>
              </div>
            )}
            {productList.length !== 0 &&
              productList.map((item, key) => {
                return (
                  <li key={key} className={styles.product_item}>
                    <span className={styles.content}>
                      <img className={styles.img} src={item.image} alt="abc" />

                      <div className={styles.content_detail}>
                        <span className={styles.content_name}>
                          {item.productName} {item.productId}{" "}
                        </span>{" "}
                        <span className={styles.content_price}>
                          <p>{item.description}</p>
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
                  </li>
                );
              })}
          </ul>
          <Indicator
            setPage={setPage}
            totalPages={totalPages}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
