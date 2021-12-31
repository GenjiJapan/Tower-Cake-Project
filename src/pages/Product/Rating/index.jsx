import { faArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StarRatings from "components/StarRating/star-rating";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Comment from "../Comment";
import styles from "./Rating.module.css";

function Rating(props) {
  const cookies = new Cookies();
  const { ratingInfo, listReviewer, pageInfo, id, setListReviewer } = props;

  const account = cookies.get("account");

  const [openComment, setOpenComment] = useState(true);
  const [moreItems, setMoreItems] = useState(false);
  var [page, setPage] = useState(0);
  var [numberOfItems, setNumberOfItems] = useState(0);
  var [listNewReviewer, setListNewReviewer] = useState([]);

  useEffect(() => {
    numberOfItems = page === 0 ? 3 : listReviewer.length;
    setNumberOfItems(numberOfItems);
  }, [page]);

  useEffect(() => {
    setListReviewer(listReviewer);
  }, [listReviewer]);

  useEffect(() => {
    console.log("rating info : ", ratingInfo);
  }, [ratingInfo]);

  const goTop = () => {
    document.body.scrollTop = 560;
    document.documentElement.scrollTop = 560;
  };

  const DateGap = (currentDate, reviewerDate) => {
    reviewerDate = handleReviewDate(reviewerDate);
    // reviewerDate = new Date(handleReviewDate(reviewerDate));
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 44 ~ DateGap ~ reviewerDate",
    //   reviewerDate
    // );

    const time = Math.abs(currentDate - reviewerDate) / 1000;

    if (time < 60) return timeDisplay(Math.round(time), "second");

    if (time < 360) return timeDisplay(Math.round(time / 60), "minute");

    if (time < 84000) return timeDisplay(Math.round(time / 60 / 60), "hour");

    if (time < 84000 * 7)
      return timeDisplay(Math.round(time / 60 / 60 / 24), "day");

    if (time < 84000 * 30)
      return timeDisplay(Math.round(time / 60 / 60 / 24 / 7), "week");

    if (time < 84000 * 365)
      return timeDisplay(Math.round(time / 60 / 60 / 24 / 30), "month");

    return timeDisplay(Math.round(time / 60 / 60 / 24 / 365), "year");
  };

  const handleReviewDate = (reviewerDate) => {
    const d = new Date(reviewerDate);
    const today = new Date();
    let hour = today.getUTCHours();

    d.setHours(d.getHours() + hour);

    return d;
  };

  const timeDisplay = (time, unit) => {
    if (time > 1) return `${time} ${unit}s ago`;
    return `${time} ${unit} ago`;
  };

  const handleShowMore = async () => {
    page = page + 1;
    if (page === 1) return setPage(page);

    if (page > 1 && page <= pageInfo.totalPages) {
      try {
        const res = await axios.get(
          `/api/products/ratings/product=${id}?page=${page}`
        );
        console.log(
          "🚀 ~ file: index.jsx ~ line 77 ~ handleShowMore ~ res",
          res
        );

        var temp = res.data.ratingSets.result.value;

        listNewReviewer = temp.mappingResults;

        var finalList = listReviewer.concat(listNewReviewer);

        console.log(
          "🚀 ~ file: index.jsx ~ line 106 ~ handleShowMore ~ listReview",
          finalList
        );

        setListReviewer(finalList);
        if (page === pageInfo.totalPages) setMoreItems(!moreItems);

        setPage(page);
      } catch (error) {
        console.log(error.response.data);
      }
      setPage(page);
      return;
    }

    if (page > pageInfo.totalPages) {
      setMoreItems(!moreItems);
      setPage(0);
    }
  };

  return (
    <div>
      <div className={styles.rating} id="rating">
        <div
          className={
            openComment ? `${styles.total_rate_left}` : `${styles.total_rate}`
          }
        >
          <div className={styles.average}>
            <span className={styles.avg_number}>
              {ratingInfo && ratingInfo.averageStar
                ? ratingInfo.averageStar.toFixed(1)
                : 0}
            </span>

            <span className={styles.line}></span>

            <span className={styles.avg_total}>
              {ratingInfo
                ? ratingInfo.fiveStar +
                  ratingInfo.fourStar +
                  ratingInfo.threeStar +
                  ratingInfo.twoStar +
                  ratingInfo.oneStar
                : 0}{" "}
              rating
            </span>
          </div>

          <div className={styles.rating_star}>
            <div className={styles.rate}>
              <div className={styles.star}>
                <img src={Images.FIVE} alt="" />
              </div>
              <span className={styles.avg_count}>
                {ratingInfo && ratingInfo.averageStar ? ratingInfo.fiveStar : 0}
              </span>
            </div>
            <div className={styles.rate}>
              <div className={styles.star}>
                <img src={Images.FOUR} alt="" />
              </div>
              <span className={styles.avg_count}>
                {ratingInfo && ratingInfo.averageStar ? ratingInfo.fourStar : 0}
              </span>
            </div>
            <div className={styles.rate}>
              <div className={styles.star}>
                <img src={Images.THREE} alt="" />
              </div>

              <span className={styles.avg_count}>
                {ratingInfo && ratingInfo.averageStar
                  ? ratingInfo.threeStar
                  : 0}
              </span>
            </div>
            <div className={styles.rate}>
              <div className={styles.star}>
                <img src={Images.TWO} alt="" />
              </div>

              <span className={styles.avg_count}>
                {ratingInfo && ratingInfo.averageStar ? ratingInfo.twoStar : 0}
              </span>
            </div>
            <div className={styles.rate}>
              <div className={styles.star}>
                <img src={Images.ONE} alt="" />
              </div>

              <span className={styles.avg_count}>
                {ratingInfo && ratingInfo.averageStar ? ratingInfo.oneStar : 0}
              </span>
            </div>
          </div>
        </div>

        <Comment
          listReviewer={listReviewer}
          setListReviewer={setListReviewer}
          setOpenComment={setOpenComment}
          openComment={openComment}
        />

        <div
          className={styles.add_cmt}
          onClick={() => setOpenComment(!openComment)}
        >
          <FontAwesomeIcon
            className={openComment ? `${styles.times}` : `${styles.plus}`}
            icon={faPlus}
            style={{ color: "#000" }}
          />
        </div>

        {listReviewer && listReviewer.length === 0 && (
          <div className={styles.outline}>
            <div className={styles.inline}>
              <p className={styles.review_warn}>
                There is nobody reviews about this product. <br />
                Let's become the first reviewer!!!
              </p>
            </div>
          </div>
        )}

        {listReviewer &&
          listReviewer.length !== 0 &&
          listReviewer.slice(0, numberOfItems).map((item, key) => {
            return (
              <div key={key}>
                <div className={styles.commented}>
                  <div className={styles.user}>
                    <div className={styles.avatar}>
                      <img
                        src={
                          item.user.avatar ? item.user.avatar : Images.IMG_NULL
                        }
                        alt={item.user.username}
                      />
                    </div>

                    <div className={styles.name_time}>
                      <span className={styles.name}>
                        {account.accountId === item.userId
                          ? "You"
                          : item.user.username}
                      </span>

                      <span className={styles.time}>
                        {DateGap(new Date(), new Date(item.createdAt))}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cmt_contain}>
                    <div className={styles.rated}>
                      <StarRatings
                        svgIconViewBox="0 0 51 48"
                        starRatedColor="#fdd43c"
                        starEmptyColor="#fff"
                        rating={item.starRating}
                        starSpacing="15px"
                      />
                    </div>
                    <span className={styles.cmt}>{item.comment}</span>
                  </div>
                </div>
              </div>
            );
          })}

        {listReviewer && listReviewer.length > 3 && (
          <div className={styles.more}>
            <button className={styles.expand} onClick={() => handleShowMore()}>
              <svg
                width="4"
                height="16"
                viewBox="0 0 4 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
                  fill="black"
                />
              </svg>
              {moreItems ? "show less" : "more comments"}
            </button>
          </div>
        )}

        <div className={styles.scroll} onClick={goTop}>
          <button>
            <FontAwesomeIcon
              // className={openComment ? `${styles.times}` : `${styles.plus}`}
              icon={faArrowUp}
              style={{ color: " #FFC683" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rating;
// <img src={Images.RATING} alt="rating" />
