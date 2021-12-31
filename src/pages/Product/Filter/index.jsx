import { errorMessage, filter, pageFilter } from "actions/Cart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../Category/Category.module.css";

function Filter(props) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState(null);
  const [sortName, setSortName] = useState(null);
  const [plainPrice, setPlainPrice] = useState(null);
  const [listSize, setListSize] = useState([]);
  const [success, setSuccess] = useState(true);

  var [filterList, setFilterList] = useState([]);
  var [filterPage, setFilterPage] = useState({});
  var [categories, setCategories] = useState([]);
  var [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    getSize();
    getCategories();
  }, []);

  useEffect(() => {
    console.log("size : ", size);
  }, [size]);

  useEffect(() => {
    console.log("sort name : ", sortName);
  }, [sortName]);

  useEffect(() => {
    console.log("plain price : ", plainPrice);
  }, [plainPrice]);

  useEffect(() => {
    console.log("categories: ", categories);
  }, [categories]);

  useEffect(() => {
    console.log("categories list: ", categoriesList);
  }, [categoriesList]);

  const getSize = async () => {
    try {
      const res = await axios.get(`/api/sizes`);

      console.log("🚀 ~ file: index.jsx ~ line 21 ~ getFilter ~ res", res);
      setListSize(res.data.mappingResults);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`/api/categories`);

      console.log("🚀 ~ file: index.jsx ~ line 21 ~ getFilter ~ res", res);
      setCategoriesList(res.data.mappingResults);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getFilter = async (e) => {
    e.preventDefault();

    if (
      categories.length === 0 &&
      size === null &&
      plainPrice === null &&
      sortName === null
    )
      return alert("tạch");

    try {
      const body = {
        categories: categories,
        sizeId: size,
        priceRange: plainPrice,
        orderByName: sortName,
      };

      console.log("🚀 ~ file: index.jsx ~ line 73 ~ getFilter ~ body", body);

      const res = await axios.post(
        `/api/products/filter/page=${1}`,
        body
        // config
      );
      console.log("🚀 ~ file: index.jsx ~ line 102 ~ getFilter ~ res", res);

      filterList = res.data.mappingResults;
      filterPage = res.data.metadata;

      setFilterList(filterList);
      setFilterPage(filterPage);

      dispatch(filter(filterList));
      dispatch(pageFilter(filterPage));
      console.log(
        "🚀 ~ file: index.jsx ~ line 109 ~ getFilter ~ dispatch(filter(filterList))",
        dispatch(filter(filterList))
      );
    } catch (error) {
      if (error.response.status === 404)
        dispatch(errorMessage(error.response.status));
      console.log(
        "🚀 ~ file: index.jsx ~ line 122 ~ getFilter ~ errorMessage",
        dispatch(errorMessage(error.response.status))
      );
      setSuccess(false);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  };

  const handleMultiple = (id) => {
    console.log("clicked");
    var index = categories.findIndex((item) => item && item === id);
    if (index < 0) {
      categories.push(id);
    } else {
      categories.splice(index, 1);
    }
    console.log(
      "🚀 ~ file: index.jsx ~ line 71 ~ handleMultiple ~ categories",
      categories
    );
    setCategories(categories);
  };

  return (
    <div>
      <form onSubmit={getFilter} className={styles.category_filter}>
        <div className={styles.category_filter_head}>
          <i className="fa fa-filter" aria-hidden="true"></i>
          <h2>Filter</h2>
        </div>
        <div className={`${styles.categories} ${styles.section}`}>
          <h2>Categories</h2>
          {categoriesList.map((item, key) => {
            return (
              <div key={key} className={styles.remember}>
                <label>
                  {item.categoryName}
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => handleMultiple(item.categoryId)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            );
          })}
        </div>

        <div className={`${styles.size} ${styles.section}`} id="group1">
          <h2>Size</h2>
          <div className={styles.remember}>
            <label>
              All
              <input
                type="radio"
                name="radio group1"
                onClick={() => window.location.reload(true)}
                defaultChecked={checked}
                // onChange={() => setSize(item.sizeId)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>

          {listSize.map((item, key) => {
            return (
              <div key={key} className={styles.remember}>
                <label>
                  {item.sizeName}
                  <input
                    type="radio"
                    name="radio group1"
                    defaultChecked={checked}
                    onChange={() => setSize(item.sizeId)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            );
          })}
        </div>
        <div className={`${styles.sort} ${styles.section}`} id="group2">
          <h2>Sort Name</h2>
          <div className={styles.remember}>
            <label>
              Z - A
              <input
                type="radio"
                name="radio group2"
                defaultChecked={checked}
                onChange={() => setSortName(!sortName)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.remember}>
            <label>
              A - Z
              <input
                type="radio"
                name="radio group2"
                defaultChecked={checked}
                onChange={() => setSortName(!sortName)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <div className={`${styles.price} ${styles.section}`} id="group3">
          <h2>Plain Price</h2>
          <div className={styles.remember}>
            <label>
              Under 100 thousand VND
              <input
                type="radio"
                name="radio group3"
                defaultChecked={checked}
                onChange={() => setPlainPrice(1)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.remember}>
            <label>
              Over 100 thousand or under 500 thousand VND
              <input
                type="radio"
                name="radio group3"
                defaultChecked={checked}
                onChange={() => setPlainPrice(2)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.remember}>
            <label>
              Over 500 thousand VND
              <input
                type="radio"
                name="radio group3"
                defaultChecked={checked}
                onChange={() => setPlainPrice(3)}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <button className={styles.filter_btn} type="submit">
          Let's filter
        </button>
      </form>
    </div>
  );
}

export default Filter;
