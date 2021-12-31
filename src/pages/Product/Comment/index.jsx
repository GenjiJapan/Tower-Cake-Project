import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Notification from "components/Notification";
import Images from "constants/images";
import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { useParams } from "react-router";
import Cookies from "universal-cookie";
import Rate from "../Rate";
import styles from "./Comment.module.css";

const useStyles = makeStyles({
  root: {
    top: 100,
  },
});

function Comment(props) {
  const cookies = new Cookies();
  const account = cookies.get("account");
  const styleClass = useStyles();

  const { id } = useParams();
  const { openComment, setOpenComment, listReviewer, setListReviewer } = props;

  const [comment, setComment] = useState("");
  const [cmtStar, setCmtStar] = useState(0);
  const [notify, setNotify] = useState({
    message: "",
    type: "",
  });
  var [isDisabled, setIsDisabled] = useState(true);
  var [latestComment, setLatestComment] = useState(null);
  var [isRated, setIsRated] = useState(false);

  useEffect(() => {
    console.log("cmt star : ", cmtStar);
    console.log("isRated : ", isRated);
    console.log(
      "🚀 ~ file: index.jsx ~ line 19 ~ Comment ~ listReviewer",
      listReviewer
    );
  }, [cmtStar, isRated, listReviewer]);

  useEffect(() => {
    getLatestComment();
  }, []);

  useEffect(() => {
    setCmtStar(cmtStar);
  }, [cmtStar]);

  const commentForm = document.querySelector("#cmt_form");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cmtStar === 0)
      return setNotify({
        message: "Please rate and type comment for your product",
        type: "error",
      });

    const body = {
      userId: account.accountId,
      productId: id,
      starRating: cmtStar,
      comment,
    };

    if (latestComment && !isDisabled) return updateComment(body);

    newComment(body);

    // commentForm.reset();
  };

  const updateComment = async (body) => {
    // alert("can update");

    try {
      const res = await axios.put(
        `/api/products/ratings/user=${account.accountId}/product=${id}`,
        body
      );
      console.log("🚀 ~ file: index.jsx ~ line 86 ~ updateComment ~ res", res);

      if (!res.data) return alert("tạch");

      var index = listReviewer.findIndex(
        (item) =>
          item.productId == body.productId && item.userId === body.userId
      );

      var finalList = [].concat(listReviewer);
      finalList[index].comment = body.comment;
      finalList[index].starRating = body.starRating;

      setListReviewer(finalList);

      // khi axios thành công thì bê cục trên try vào ngoại trừ alert

      setNotify({
        message: "Update comment successful",
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.data.message === "Record is Existed")
        setNotify({
          message: "Your comment existed",
          type: "error",
        });

      if (
        error.response &&
        error.response.data.message ===
          "The Rating Star is not support or You have not bought product yet"
      )
        setNotify({
          message:
            "The Rating Star is not support or You have not bought product yet",
          type: "error",
        });

      if (error.response.status === 400)
        setNotify({
          message: "Your account is banned",
          type: "error",
        });

      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const newComment = async (body) => {
    console.log("account & id : ", account.accountId, id);

    try {
      const res = await axios.post("/api/products/ratings/", body);

      var d = new Date();

      let hour = d.getUTCHours();

      var reviewerObject = [
        {
          productId: id,
          userId: account.accountId,
          starRating: cmtStar,
          comment: comment,
          createdAt: d.setHours(d.getHours() - hour),
          updatedAt: res.data.updatedAt,
          user: account.accountId,
        },
      ];

      // listReviewer.unshift(reviewerObject);
      var finalList = reviewerObject.concat(listReviewer);

      setListReviewer(finalList);
      setNotify({
        message: "Post comment successful",
        type: "success",
      });
    } catch (error) {
      if (error.response && error.response.data.message === "Record is Existed")
        setNotify({
          message: "Your comment existed",
          type: "error",
        });

      if (
        error.response &&
        error.response.data.message ===
          "The Rating Star is not support or You have not bought product yet"
      )
        setNotify({
          message:
            "The Rating Star is not support or You have not bought product yet",
          type: "error",
        });

      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getLatestComment = async () => {
    try {
      const res = await axios.get(
        `/api/products/ratings/user=${account.accountId}/product=${id}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 129 ~ getLatestComment ~ res",
        res
      );
      latestComment = res.data;
      setLatestComment(latestComment);
      // setCmtStar(0)
      console.log(
        "🚀 ~ file: index.jsx ~ line 141 ~ getLatestComment ~ latestComment",
        latestComment.comment
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleEdit = () => {
    if (!isDisabled) alert("update data");

    // đổi trạng thái text area
    isDisabled = !isDisabled;
    setIsDisabled(isDisabled);
  };

  return (
    <div>
      <Fade right when={openComment}>
        <form
          id="cmt_form"
          onSubmit={handleSubmit}
          className={openComment ? `${styles.my_cmt}` : `${styles.disable_cmt}`}
        >
          <div className={styles.avatar}>
            <img
              src={account.avatar ? account.avatar : Images.IMG_NULL}
              alt="avatar"
            />
          </div>
          <span className={styles.name}>
            {`${account.lastName} ${account.firstName}`}
          </span>
          <div className={styles.star}>
            <Rate
              rating={
                latestComment && latestComment.starRating && !isRated
                  ? latestComment.starRating
                  : cmtStar
              }
              disabled={isDisabled}
              onRating={(rate) => {
                isRated = !isRated;
                setIsRated(isRated);
                setCmtStar(isRated ? rate : 0);
              }}
            />
          </div>
          <div className={styles.text_area}>
            <textarea
              placeholder={
                latestComment && latestComment.comment
                  ? latestComment.comment
                  : "Write your comment here..."
              }
              name="your_comment"
              id="my_cmt"
              cols="50"
              rows="10"
              spellCheck="false"
              required
              onChange={(e) => setComment(e.target.value)}
              disabled={
                latestComment && latestComment.comment && !isRated
                  ? isDisabled
                  : ""
              }
            ></textarea>
          </div>
          <span className={styles.warn}>
            Your review will be on public.You can rate star only!
            <FontAwesomeIcon
              className={styles.icon}
              size="1x"
              icon={faInfoCircle}
              style={{ color: "#000" }}
            />
          </span>
          <div
            className={
              latestComment && latestComment.comment
                ? `${styles.submit_2}`
                : `${styles.submit}`
            }
          >
            <button
              type="button"
              onClick={() => setOpenComment(false)}
              className={styles.cancel}
            >
              Cancel
            </button>
            {latestComment && latestComment.comment ? (
              <button
                type="button"
                className={styles.cancel}
                onClick={() => handleEdit()}
              >
                Show / hide rating
              </button>
            ) : null}
            <button className={styles.send} type="submit">
              Send
            </button>
          </div>
          <div className={styles.notify}>
            <Notification
              styleClass={styleClass.root}
              notify={notify}
              setNotify={setNotify}
            />
          </div>
        </form>
      </Fade>
    </div>
  );
}

export default Comment;
