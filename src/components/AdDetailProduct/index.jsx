import axios from "axios";
import { Year } from "constants/AdDetailProduct.js";
import Images from "constants/images";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../AdIncome/SelectStyles.css";
import styles from "./AdDetailProduct.module.css";

AdDetailProduct.propTypes = {};
const animatedComponents = makeAnimated();

function AdDetailProduct(props) {
  const history = useHistory();

  var querystring = queryString.parse(window.location.search).productID;
  console.log(
    "🚀 ~ file: index.jsx ~ line 25 ~ AdDetailProduct ~ querystring",
    querystring
  );

  const [yearSold, setYearSold] = useState("");
  const [categogryField, setCategogryField] = useState("");
  const [sizeField, setSizeField] = useState("");
  const [tagField, setTagField] = useState("");
  const [categogryDescribe, setCategogryDescribe] = useState("");
  const [sizeDescribe, setSizeDescribe] = useState("");
  const [tagDescribe, setTagDescribe] = useState("");

  const [tagOption, setTagOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [sizeOption, setSizeOption] = useState("");
  const [productName, setProductName] = useState("");

  const [unitPrice, setUnitPrice] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);

  const [openAddTag, setOpenAddTag] = useState(false);
  const [openAddSize, setOpenAddSize] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);

  const [tagDisabled, setTagDisabled] = useState(true);
  const [sizeDisabled, setSizeDisabled] = useState(true);
  const [categoryDisabled, setCategoryDisabled] = useState(true);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [priceDisabled, setPriceDisabled] = useState(true);
  const [describeDisabled, setDescribeDisabled] = useState(true);

  var [categoryName, setCategoryName] = useState("");
  var [sizeName, setSizeName] = useState("");
  var [tagName, setTagName] = useState("");
  var [productCurrent, setProductCurrent] = useState({});
  var [categories, setCategories] = useState([]);
  var [sizes, setSizes] = useState([]);
  var [tags, setTags] = useState([]);
  var [comment, setComment] = useState([]);
  var [totalSold, setTotalSold] = useState({});
  var [totalFollower, setTotalFollower] = useState({});
  var [soldPerMonth, setSoldPerMonth] = useState([]);
  var [rated, setRated] = useState({});

  useEffect(() => {
    getData();
    // console.log("abc", querystring ? querystring : 1);
    console.log(
      "🚀 ~ file: index.jsx ~ line 52 ~ getData ~ setProductCurrent",
      productCurrent
    );
  }, [queryString]);

  useEffect(() => {
    getCategories();
    getSize();
    getTags();
  }, []);

  useEffect(() => {
    if (yearSold.length === 0 || yearSold === 0) return console.log("tạch");

    getSoldMonthly(yearSold);
  }, [yearSold]);

  useEffect(() => {
    getRated();
    getComment();
    getFollows();
    getSoldQuantities();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`/api/products/${querystring}`);
      console.log("🚀 ~ file: index.jsx ~ line 48 ~ getData ~ res", res);
      productCurrent = res.data;
      setProductCurrent(productCurrent);
      console.log(
        "🚀 ~ file: index.jsx ~ line 86 ~ getData ~ setProductCurrent",
        productCurrent.category.categoryName
      );

      categoryName = productCurrent.category.categoryName;
      setCategoryName(categoryName);
      console.log(
        "🚀 ~ file: index.jsx ~ line 93 ~ getData ~ setCategoryName",
        categoryName
      );

      sizeName = productCurrent.size.sizeName;
      setSizeName(sizeName);
      console.log(
        "🚀 ~ file: index.jsx ~ line 103 ~ getData ~ sizeName",
        sizeName
      );

      tagName = productCurrent.tag.nameTag;
      setTagName(tagName);
      console.log(
        "🚀 ~ file: index.jsx ~ line 107 ~ getData ~ tagName",
        tagName
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.get(`/api/tags/all`);
      console.log("🚀 ~ file: index.jsx ~ line 66 ~ getTags ~ res", res);
      tags = res.data;
      setTags(tags);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSize = async () => {
    try {
      const res = await axios.get(`/api/sizes/all`);
      console.log("🚀 ~ file: index.jsx ~ line 78 ~ getSize ~ res", res);
      sizes = res.data;
      setSizes(sizes);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`/api/categories/all`);
      console.log("🚀 ~ file: index.jsx ~ line 90 ~ getCategories ~ res", res);
      categories = res.data;
      setCategories(categories);
      console.log(
        "🚀 ~ file: index.jsx ~ line 98 ~ categoriesOptions ~ categories",
        categories
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSoldMonthly = async (yearSold) => {
    try {
      const res = await axios.get(
        `/api/admin/statistic/products/quantity/product=${querystring}/?Year=${yearSold}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 114 ~ getSoldMonthly ~ res",
        res
      );
      soldPerMonth = res.data.quantityPerMonth;
      setSoldPerMonth(soldPerMonth);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getRated = async () => {
    try {
      const res = await axios.get(
        `/api/products/ratings/smr/product=${querystring}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 131 ~ getRated ~ res", res);
      rated = res.data;
      setRated(rated);
      console.log("🚀 ~ file: index.jsx ~ line 146 ~ getRated ~ rated", rated);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getComment = async () => {
    try {
      const res = await axios.get(
        `/api/products/ratings/withousmr/product=${querystring}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 160 ~ getComment ~ res", res);

      comment = res.data.mappingResults;
      setComment(comment);
      console.log(
        "🚀 ~ file: index.jsx ~ line 164 ~ getComment ~ comment",
        comment
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getFollows = async () => {
    try {
      const res = await axios.get(
        `/api/admin/statistic/products/followers/product=${querystring}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 180 ~ getFollows ~ res", res);
      totalFollower = res.data;
      setTotalFollower(totalFollower);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSoldQuantities = async () => {
    try {
      const res = await axios.get(
        `/api/admin/statistic/products/quantity/product=${querystring}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 191 ~ getSoldQuantities ~ res",
        res
      );
      totalSold = res.data;
      setTotalSold(totalSold);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleAddCateogry = async (e) => {
    e.preventDefault();
    const body = {
      CategoryName: categogryField,
      Description: categogryDescribe,
    };
    try {
      const res = await axios.post(`api/categories`, body);
      console.log(
        "🚀 ~ file: index.jsx ~ line 255 ~ handleAddCateogry ~ res",
        res
      );

      getCategories();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleAddSize = async (e) => {
    e.preventDefault();
    const body = {
      SizeName: sizeField,
      Description: sizeDescribe,
    };
    try {
      const res = await axios.post(`api/sizes`, body);
      console.log("🚀 ~ file: index.jsx ~ line 273 ~ handleAddSize ~ res", res);

      getSize();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    const body = {
      NameTag: tagField,
    };
    try {
      const res = await axios.post(`api/tags`, body);
      console.log("🚀 ~ file: index.jsx ~ line 287 ~ handleAddTag ~ res", res);

      getTags();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: index.jsx ~ line 290 ~ handleSubmit ~ id", id);

    if (id === 1) await handleDelProduct();
    else await handleUpdateProduct();
  };

  const handleDelProduct = async () => {
    try {
      const res = await axios.delete(`api/products/${querystring}`);
      console.log(
        "🚀 ~ file: index.jsx ~ line 299 ~ handleDelProduct ~ res",
        res
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleUpdateProduct = async () => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 310 ~ handleUpdateProduct ~ ",
      categories,
      sizes,
      tags
    );
    const body = {
      CategoryId: categoryOption ? categoryOption : categories[0].categoryId,
      SizeId: sizeOption ? sizeOption : sizes[0].sizeId,
      TagId: tagOption ? tagOption : tags[0].tagId,
      ProductName: productName ? productName : productCurrent.productName,
      UnitPrice: unitPrice ? unitPrice : productCurrent.unitPrice,
      Description: description ? description : productCurrent.description,
      EventId: productCurrent.eventId,
    };
    console.log(
      "🚀 ~ file: index.jsx ~ line 309 ~ handleUpdateProduct ~ body",
      body
    );

    try {
      const res = await axios.put(`api/products/${querystring}`, body);
      console.log(
        "🚀 ~ file: index.jsx ~ line 309 ~ handleUpdateProduct ~ res",
        res
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleYearSold = (value) => {
    setYearSold(value.label);
    console.log("🚀 ~ file: index.jsx ~ line 182 ~ handleMonth ~ value", value);
  };

  const categoriesOptions = categories.map((item) => ({
    label: item.categoryName,
    value: item.categoryId,
  }));

  const sizesOptions = sizes.map((item) => ({
    label: item.sizeName,
    value: item.sizeId,
  }));

  const tagsOptions = tags.map((item) => ({
    label: item.nameTag,
    value: item.tagId,
  }));

  return (
    <div className={styles.detail_product}>
      {/* Edit product */}
      <form onSubmit={handleSubmit} className={styles.detail_edit_form}>
        <div className={styles.detail_form}>
          <div className={styles.detail_form_img}>
            <img src={productCurrent.image} alt="" />
            <div className={styles.gall_picker}>
              <div className={styles.gall_picker_circle}>
                <i class="fas fa-camera"></i>
              </div>
            </div>
          </div>
          <div className={styles.detail_form_content}>
            <div className={styles.content_name}>
              <input
                onChange={(e) => setProductName(e.target.value)}
                disabled={nameDisabled}
                style={{ backgroundColor: nameDisabled ? "#fff" : "#e0e0e0" }}
                placeholder={productCurrent.productName}
              />
              <button
                type="button"
                onClick={() => setNameDisabled(!nameDisabled)}
              >
                <i class="fas fa-pen"></i>
              </button>
            </div>
            <div className={styles.content_price}>
              <h3>Unit Price</h3>
              <input
                onChange={(e) => setUnitPrice(e.target.value)}
                disabled={priceDisabled}
                placeholder={`đ ${productCurrent.unitPrice}.000`}
                style={{ backgroundColor: priceDisabled ? "#fff" : "#e0e0e0" }}
              />
              <button
                type="button"
                onClick={() => setPriceDisabled(!priceDisabled)}
              >
                <i class="fas fa-pen"></i>
              </button>
            </div>
            <div className={styles.content_description}>
              <textarea
                placeholder={productCurrent.description}
                // name=""
                // id=""
                cols="30"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
                disabled={describeDisabled}
              ></textarea>
              <button
                type="button"
                onClick={() => setDescribeDisabled(!describeDisabled)}
              >
                <i class="fas fa-pen"></i>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.edit_form}>
          {/* category label */}
          <div className={styles.edit_form_general}>
            <Select
              placeholder={categoryName}
              isDisabled={categoryDisabled}
              components={animatedComponents}
              onChange={(e) => setCategoryOption(e.value)}
              className={styles.options_label}
              options={categoriesOptions}
              isSearchable
            />

            <button
              type="button"
              className={styles.edit_icon}
              onClick={() => setCategoryDisabled(!categoryDisabled)}
            >
              <i class="fas fa-pen"></i>
            </button>

            <button
              type="button"
              className={styles.add_icon}
              onClick={() => setOpenAddCategory(!openAddCategory)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                  fill="black"
                />
              </svg>
            </button>
            <div className={styles.tag_name}>
              <span>Category</span>
            </div>
          </div>
          {/* size label */}
          <div className={styles.edit_form_general}>
            <Select
              placeholder={sizeName}
              isDisabled={sizeDisabled}
              className={styles.options_label}
              options={sizesOptions}
              isSearchable={false}
              components={animatedComponents}
              onChange={(e) => setSizeOption(e.value)}
            />
            <button
              type="button"
              className={styles.edit_icon}
              onClick={() => setSizeDisabled(!sizeDisabled)}
            >
              <i class="fas fa-pen"></i>
            </button>
            <button
              type="button"
              className={styles.add_icon}
              onClick={() => setOpenAddSize(!openAddSize)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                  fill="black"
                />
              </svg>
            </button>
            <div className={styles.tag_name}>
              <span>Size</span>
            </div>
          </div>
          {/* tag label */}
          <div className={styles.edit_form_general}>
            <Select
              // value={tags[0]}
              placeholder={tagName}
              isDisabled={tagDisabled}
              className={styles.options_label}
              options={tagsOptions}
              isSearchable={false}
              components={animatedComponents}
              onChange={(e) => {
                console.log("🚀 ~ file: index.jsx ~ line 508 ~  ~ e", e);

                setTagOption(e.value);
              }}
            />
            <button
              type="button"
              className={styles.edit_icon}
              onClick={() => setTagDisabled(!tagDisabled)}
            >
              <i class="fas fa-pen"></i>
            </button>
            <button
              type="button"
              className={styles.add_icon}
              onClick={() => setOpenAddTag(!openAddTag)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM18 14V10H16V14H12V16H16V20H18V16H22V14H18ZM2 16H10V14H2V16Z"
                  fill="black"
                />
              </svg>
            </button>
            <div className={styles.tag_name}>
              <span>Tag</span>
            </div>
          </div>
          <div className={styles.group_3_btns}>
            <button
              onClick={() => history.push(`/adminPage/product`)}
              className={styles.btns_3color}
            >
              <i class="fas fa-arrow-left"></i>
              {"/"}
              <i class="fas fa-times-circle"></i>
            </button>

            <button
              type="submit"
              onClick={() => setId(1)}
              className={styles.btns_3color}
            >
              <i class="fas fa-trash"></i>
            </button>

            <button
              type="submit"
              onClick={() => setId(2)}
              className={styles.btns_3color}
            >
              <i class="fas fa-save"></i>
            </button>
          </div>
        </div>
      </form>

      {/* Info's product */}
      <div className={styles.detail_info_form}>
        {/* Sold monthly left */}
        <div className={styles.product_sold}>
          <div className={styles.product_sold_header}>
            <span>Sold Monthly in</span>

            <Select
              className="select soldmonth react-select-container"
              classNamePrefix="react-select"
              onChange={handleYearSold}
              options={Year}
              isSearchable={false}
              components={animatedComponents}
              placeholder="year..."
            />
          </div>
          <div className={styles.product_sold_body}>
            {soldPerMonth.length === 0 && (
              <div className={styles.null}>
                <img
                  src={Images.IMG_NULL}
                  alt="we have not sold anything yet"
                />
                <label htmlFor="">
                  Please choose another year to see the results{" "}
                </label>
              </div>
            )}
            {soldPerMonth.length !== 0 &&
              soldPerMonth.map((item, key) => {
                return (
                  <div key={key} className={styles.each_month}>
                    <label htmlFor="">{item.month} :</label>
                    <span>{item.quantity} products</span>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Rated, sold and followed, comment */}
        <div className={styles.star_buy_cmt}>
          <div className={styles.star_buy}>
            {/* Rated */}
            <div className={styles.star_average}>
              <span className={styles.star_average_title}>Rated</span>
              <div className={styles.star_average_content}>
                <div className={styles.average}>
                  <span>Average</span>
                  <span>
                    {rated.averageStar ? rated.averageStar.toFixed(1) : 0}{" "}
                  </span>
                  <span>{rated.sumAll} Users</span>
                </div>
                <div className={styles.group_five_star}>
                  <div className={styles.five_star}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>{rated.fiveStar} </span>
                  </div>
                  <div className={styles.four_star}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>{rated.fourStar}</span>
                  </div>
                  <div className={styles.three_star}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>{rated.threeStar}</span>
                  </div>
                  <div className={styles.two_star}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>{rated.twoStar}</span>
                  </div>
                  <div className={styles.one_star}>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <span>{rated.oneStar}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Sold and followed */}
            <div className={styles.buy_follow}>
              <span className={styles.buy_follow_title}>Sold and followed</span>
              <div className={styles.buy_follow_content}>
                <div className={styles.buy}>
                  <i class="fas fa-cookie-bite"></i>
                  <span>
                    Total <p>{totalSold.soldQuantites} </p> products sold
                  </span>
                </div>

                <div className={styles.follow}>
                  <i class="fas fa-heart"></i>
                  <span>
                    Followed <p>{totalFollower.totalFollowers} </p> Users
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.comment}>
            <span className={styles.comment_title}>Comment</span>
            <div className={styles.comment_content}>
              <div className={styles.five_tags}>
                <div className={styles.tag_five}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <div className={styles.tag_four}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
                <div className={styles.tag_three}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
                <div className={styles.tag_two}>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
                <div className={styles.tag_one}>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
              </div>
              <div className={styles.show_cmt}>
                {comment.map((item, key) => {
                  return (
                    <div key={key} className={styles.cmt_user_1}>
                      <div className={styles.cmt_user_1_img}>
                        <img
                          src={
                            !item.user.avatar ? Images.SEXY : item.user.avatar
                          }
                          alt=""
                        />
                      </div>
                      <div className={styles.cmt_user_name_cmt}>
                        <div className={styles.cmt_user_name}>
                          (
                          <span>
                            {item.starRating} <i class="fas fa-star"></i>
                          </span>
                          ) {item.user.username}
                        </div>
                        <div className={styles.cmt_user_cmt}>
                          {item.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add new category */}
      <form
        onSubmit={handleAddCateogry}
        className={
          openAddCategory ? `${styles.modal}` : `${styles.disable_modal}`
        }
      >
        <div className={styles.add_new_form}>
          <div className={styles.add_new_header}>
            <span>Add Brand New Category</span>
          </div>
          <div className={styles.add_new_body}>
            <div className={styles.name_form}>
              <label for="cate">Category name</label>
              <br />
              <input
                onChange={(e) => setCategogryField(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
            <div className={styles.des_form}>
              <label for="cate">Description</label>
              <br />
              <textarea
                onChange={(e) => setCategogryDescribe(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
          </div>
          <div className={styles.add_new_footer}>
            <button
              type="button"
              onClick={() => setOpenAddCategory(!openAddCategory)}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.apply_btn}>
              Apply
            </button>
          </div>
        </div>
      </form>

      {/* Add new size */}
      <form
        onSubmit={handleAddSize}
        className={openAddSize ? `${styles.modal}` : `${styles.disable_modal}`}
      >
        <div className={styles.add_new_form}>
          <div className={styles.add_new_header}>
            <span>Add Brand New Size</span>
          </div>
          <div className={styles.add_new_body}>
            <div className={styles.name_form}>
              <label for="cate">Size name</label>
              <br />
              <input
                onChange={(e) => setSizeField(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
            <div className={styles.des_form}>
              <label for="cate">Description</label>
              <br />
              <textarea
                onChange={(e) => setSizeDescribe(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
          </div>
          <div className={styles.add_new_footer}>
            <button
              type="button"
              onClick={() => setOpenAddSize(!openAddSize)}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.apply_btn}>
              Apply
            </button>
          </div>
        </div>
      </form>

      {/* Add new tag */}
      <form
        onSubmit={handleAddTag}
        className={openAddTag ? `${styles.modal}` : `${styles.disable_modal}`}
      >
        <div className={styles.add_new_form}>
          <div className={styles.add_new_header}>
            <span>Add Brand New Tag</span>
          </div>
          <div className={styles.add_new_body}>
            <div className={styles.name_form}>
              <label for="cate">Tag name</label>
              <br />
              <input
                onChange={(e) => setTagField(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
            <div className={styles.des_form}>
              <label for="cate">Description</label>
              <br />
              <textarea
                onChange={(e) => setTagDescribe(e.target.value)}
                type="text"
                id="cate"
                name="cate"
              />
            </div>
          </div>
          <div className={styles.add_new_footer}>
            <button
              type="button"
              onClick={() => setOpenAddTag(!openAddTag)}
              className={styles.cancel_btn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.apply_btn}>
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdDetailProduct;
