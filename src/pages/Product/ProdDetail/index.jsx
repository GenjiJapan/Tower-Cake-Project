import {
  faArrowDown,
  faMinus,
  faPlus,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Notification from "components/Notification";
import RatingTag from "components/RatingTag";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import add from "./AddFav.module.css";
import styles from "./Detail.module.css";

function ProdDetail(props) {
  const listCart = useSelector((state) => state.cart);
  const loginStorage = useSelector((state) => state.login);

  const { account } = loginStorage;
  const { id } = useParams();

  console.log("id  : ", id);

  const [count, setCount] = useState(
    Number(localStorage.getItem("count") || 1)
  );
  const [tagList, setTagList] = useState([]);
  const [page, setPage] = useState(1);
  var [lighted, setLighted] = useState(false);
  var [listReviewer, setListReviewer] = useState([]);
  var [pageInfo, setPageInfo] = useState({});

  const [productCurrent, setProductCurrent] = useState({
    productName: null,
    productId: null,
    unitPrice: null,
    qty: null,
    image: null,
    description: null,
    tagId: null,
  });

  const [favList, setFavList] = useState({
    productName: null,
    productId: null,
    unitPrice: null,
    qty: null,
    image: null,
    description: null,
  });

  const [ratingInfo, setRatingInfo] = useState(null);
  const [notify, setNotify] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    getData();
    checkinFavs();
  }, [id]);

  useEffect(() => {
    getTags();
    getRating();
  }, [productCurrent]);

  useEffect(() => {}, [productCurrent]);

  const getData = async () => {
    const res = await axios.get(`/api/products/${id}`);
    const { data } = res;
    console.log("data : ", data);
    setProductCurrent(data);
    setFavList(data);
    console.log("res ", res);
  };

  const checkinFavs = async () => {
    try {
      const res = await axios.get(
        `/api/users/favorites/user=${account.accountId}/product=${id}`
      );
      console.log("checkin : ", res);
      if (res.data.productId) {
        setLighted(true);

        console.log("lighted true : ", lighted);
        return;
      }
      return setLighted(false);
    } catch (error) {
      console.log("error : ", error.response.data);
    }
  };

  const getRating = async () => {
    try {
      const res = await axios.get(
        `/api/products/ratings/product=${id}?page=${page}`
      );
      console.log("rating res : ", res);
      setRatingInfo(res.data.ratingSummary);
      console.log("res data : ", res.data.ratingSummary.averageStar);

      console.log(
        "🚀 ~ file: index.jsx ~ line 116 ~ getRating ~ res.data.ratingSets.result.value",
        res.data.ratingSets.result.value
      );
      setListReviewer(res.data.ratingSets.result.value.mappingResults);

      setPageInfo(res.data.ratingSets.result.value.metadata);
    } catch (error) {
      if (!error.response) return console.log("tạch");

      console.log(error.response.data);
    }
  };

  const handleEditFavList = async (e, item) => {
    const body = {
      accountId: account.accountId,
      productId: item.productId,
    };

    try {
      const res = await axios.post("/api/users/favorites/", body);
      console.log("add res : ", res);
      setLighted(true);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "Record is Existed") {
        try {
          const res = await axios.delete(
            `/api/users/favorites/user=${account.accountId}/product=${id}`,
            body
          );
          console.log("del res : ", res);
          setLighted(false);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.get(`api/products/tag=${productCurrent.tagId}`);
      console.log("tag res : ", res);
      const { mappingResults } = res.data;
      setTagList(mappingResults);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const goToRating = () => {
    document.body.scrollTop = 1500;
    document.documentElement.scrollTop = 1500;
  };

  const handleIncrease = (item) => {
    setCount(count + 1);
    localStorage.setItem("count", count + 1);
  };

  const handleDecrease = (item) => {
    if (count == 1) return;
    setCount(count - 1);
    localStorage.setItem("count", count - 1);
  };

  const handleAddToCart = async (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 181 ~ handleAddToCart ~ item",
      item
    );

    const body = {
      accountId: account.accountId,
      productId: id,
      quantity: count,
    };

    try {
      const res = await axios.post(`/api/users/carts/details/`, body);
      console.log("add to cart : ", res);

      setCount(1);
      localStorage.setItem("count", 1);
    } catch (error) {
      if (error.response.status === 400)
        setNotify({
          message: "Your account is banned",
          type: "error",
        });
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.detail} id="detail">
          <div className={styles.info}>
            <h2 className={styles.name}>{productCurrent.productName} </h2>
            <div className={styles.description}>
              <p>{productCurrent.description}</p>
            </div>
            <span className={styles.price}>
              Price <p>đ</p> {productCurrent.unitPrice}.000
            </span>
          </div>
          <div className={styles.item_img}>
            <img
              src={
                productCurrent.image ? productCurrent.image : Images.IMG_NULL
              }
              alt="Cant find ur img"
            />
          </div>

          <div className={styles.item_img_BG}>
            <img
              src={
                productCurrent.image ? productCurrent.image : Images.IMG_NULL
              }
              alt="Cant find ur img"
            />
          </div>

          <div className={styles.social_btn}>
            <div className={add.wrapper}>
              <input
                type="checkbox"
                name="like"
                id="like"
                onChange={(e) => handleEditFavList(e, favList)}
                checked={lighted}
              />
              <label htmlFor="like">
                <span className={add.do}>Add to favorite list</span>
                <span className={add.done}>Added to favourites list</span>
              </label>
            </div>

            <div className={styles.share}>
              <FontAwesomeIcon
                className={`${styles.shares} ${styles.icon}`}
                size="2x"
                icon={faShareAlt}
                style={{ color: "#000" }}
              />
              <p className={styles.title}>Share</p>
              <FontAwesomeIcon
                className={`${styles.fb} ${styles.icon}`}
                size="2x"
                icon={["fab", "facebook-square"]}
                style={{ color: "#000" }}
              />
              <FontAwesomeIcon
                className={`${styles.ig} ${styles.icon}`}
                size="2x"
                icon={["fab", "instagram"]}
                style={{ color: "#000" }}
              />
              <FontAwesomeIcon
                className={`${styles.twitter} ${styles.icon}`}
                size="2x"
                icon={["fab", "twitter-square"]}
                style={{ color: "#000" }}
              />
            </div>
          </div>
          <div className={styles.preservation}>
            <h2 className={styles.title}>Preservation</h2>
            <div className={styles.content}>
              <svg
                className={styles.svg}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.24 7.76C15.07 6.59 13.54 6 12 6V12L7.76 16.24C10.1 18.58 13.9 18.58 16.25 16.24C18.59 13.9 18.59 10.1 16.24 7.76ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                  fill="black"
                />
              </svg>
              <p>less than 24h in refrigerator</p>
              <p>Best for enjoying cake in 12h of purchase</p>
            </div>
          </div>

          <div className={styles.flavor}>
            <div className={styles.flavor_content}>
              {console.log("taglist : ", tagList)}
              {tagList.map((item, key) => {
                if (item.productId === productCurrent.productId) return null;
                return (
                  <Link key={key} to={`/product/item-detail/${item.productId}`}>
                    <div className={styles.flavor_item}>
                      <div className={styles.flavor_img}>
                        <img
                          src={item.image ? item.image : Images.IMG_NULL}
                          alt={item.productName}
                        />
                      </div>
                      <p className={styles.flavor_name}>
                        {item.productName} {item.productId}{" "}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.item_interact}>
            <div className={styles.rating}>
              <RatingTag
                rating={
                  ratingInfo && ratingInfo.averageStar
                    ? ratingInfo.averageStar
                    : 0
                }
              />
              <span>
                {ratingInfo && ratingInfo.averageStar
                  ? ratingInfo.averageStar.toFixed(1)
                  : ""}
              </span>
            </div>

            <div className={styles.quantity}>
              <p>Quantity</p>
              <div className={styles.qty_contain}>
                <button onClick={() => handleDecrease()} disabled={count === 1}>
                  <FontAwesomeIcon
                    className={styles.minus}
                    icon={faMinus}
                    style={{ color: "#00A490" }}
                  />
                </button>

                <span className={styles.qty}> {count} </span>

                <button onClick={() => handleIncrease()}>
                  <FontAwesomeIcon
                    className={styles.plus}
                    icon={faPlus}
                    style={{ color: "#00A490" }}
                  />
                </button>
              </div>
            </div>
            <div
              className={styles.btn}
              onClick={() => handleAddToCart(productCurrent)}
            >
              <button>Add to Cart</button>
            </div>
          </div>
          <div className={styles.scroll} onClick={goToRating}>
            <button>
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ color: " #FFC683" }}
              />
            </button>
          </div>
          <div className={styles.notify}>
            <Notification notify={notify} setNotify={setNotify} />
          </div>
        </div>
        <div className={styles.rating_section}>
          <Rating
            id={id}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            listReviewer={listReviewer}
            setListReviewer={setListReviewer}
            ratingInfo={ratingInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default ProdDetail;
