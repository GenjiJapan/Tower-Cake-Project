import axios from "axios";
import Indicator from "components/Pagination";
import Images from "constants/images";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styles from "./AdOrder.module.css";

function AdOrder(props) {
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);

  const cookies = new Cookies();

  const [isLoading, setIsLoading] = useState(false);
  const [statusId, setStatusId] = useState(-1);
  const [statusName, setStatusName] = useState("");
  const [checked, setChecked] = useState(false);
  const [orderBy, setOrderBy] = useState(true);
  const [colorStatus, setColorStatus] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });

  var [changeStatusId, setChangeStatusId] = useState(0);
  var [orderInfoDetail, setOrderInfoDetail] = useState({
    accountId: null,
    cartId: null,
  });
  var [orderDetail, setOrderDetail] = useState({});
  var [orderInfoList, setOrderInfoList] = useState([]);
  var [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getNewStatus();
  }, [statusName, orderBy, page]);

  useEffect(() => {
    getDetailOrder();
  }, [orderInfoDetail]);

  useEffect(() => {
    var page = queryString.parse(window.location.search).page;
    console.log("🚀 ~ file: index.jsx ~ line 35 ~ useEffect ~ page", page);
    console.log(
      "🚀 ~ file: index.jsx ~ line 42 ~ getFavList ~ pagination._page",
      pagination._page,
      page
    );
  }, [page]);

  const getNewStatus = async () => {
    try {
      const res = await axios.get(
        `/api/admin/statistic/orders/status=${statusName}/?page=${page}&limit=${15}&orderBy=${orderBy}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 10 ~ getNewStatus ~ res", res);

      orderList = res.data.readDTOs;
      setOrderList(orderList);

      setIsLoading(true);

      setPagination({
        _page: res.data.metadata.currentPage,
        _limit: res.data.metadata.limit,
        _totalRows: res.data.metadata.totalRows,
      });
      setTotalPages(res.data.metadata.totalPages);
      console.log(
        "🚀 ~ file: index.jsx ~ line 23 ~ getNewStatus ~ orderList",
        orderList
      );
    } catch (error) {
      if (error.response.status === 404) setOrderList([]);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getDetailOrder = async () => {
    try {
      const res = await axios.get(
        `/api/users/orders/detail/user=${orderInfoDetail.accountId}/order=${orderInfoDetail.cartId}`
      );
      // console.log(
      //   "🚀 ~ file: index.jsx ~ line 45 ~ getDetailOrder ~ res",
      //   res.data
      // );
      orderInfoList = res.data.cartDto.detailDto;
      orderDetail = res.data;
      orderInfoDetail = res.data.status;
      setOrderDetail(orderDetail);
      setOrderInfoList(orderInfoList);

      // console.log(
      //   "🚀 ~ file: index.jsx ~ line 62 ~ getDetailOrder ~ orderDetail",
      //   orderDetail
      // );
      // console.log(
      //   "🚀 ~ file: index.jsx ~ line 56 ~ getDetailOrder ~ orderInfoList",
      //   orderInfoList
      // );
    } catch (error) {
      //   if (error.response.status === 404) return setOrderList([]);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const handlingColor = {
    color: "#930061",
    backgroundColor: "#930061",
  };

  const completedColor = {
    color: "#48FF5A",
    backgroundColor: "#48FF5A",
  };

  const toReceiveColor = {
    color: "#4785FF",
    backgroundColor: "#4785FF",
  };

  const toShip = {
    color: "#FFBF5F",
    backgroundColor: "#FFBF5F",
  };

  const newColor = {
    color: "#2BD0D0",
    backgroundColor: "#2BD0D0",
  };

  const cancelColor = {
    color: "#FF4848",
    backgroundColor: "#FF4848",
  };

  const activeStatus = (id, name) => {
    setStatusId(id);
    setStatusName(name);
    console.log(
      "🚀 ~ file: index.jsx ~ line 26 ~ activeStatus ~ id, name",
      id,
      name
    );
  };

  const handleStatusName = (item) => {
    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 61 ~ handleStatusDescribe ~ item",
    //   item
    // );
    if (item.statusId === 1)
      return <b style={{ color: handlingColor.color }}>{item.statusName} </b>;

    if (item.statusId === 2)
      return <b style={{ color: toShip.color }}>{item.statusName} </b>;

    if (item.statusId === 3)
      return <b style={{ color: toReceiveColor.color }}>{item.statusName} </b>;

    if (item.statusId === 4)
      return <b style={{ color: completedColor.color }}>{item.statusName} </b>;

    if (item.statusId === 5)
      return <b style={{ color: cancelColor.color }}>{item.statusName} </b>;

    if (item.statusId === 6)
      return <b style={{ color: newColor.color }}>{item.statusName} </b>;
  };

  const handleOrderDetail = (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 116 ~ handleOrderDetail ~ item",
      item
    );

    orderInfoDetail = item;
    setOrderInfoDetail(orderInfoDetail);

    // statusId = orderInfoDetail.status.statusId;
    console.log(
      "🚀 ~ file: index.jsx ~ line 122 ~ handleOrderDetail ~ changeStatusId",
      changeStatusId
    );

    // console.log(
    //   "🚀 ~ file: index.jsx ~ line 118 ~ handleOrderDetail ~ OrderInfoDetail",
    //   item.statusId
    // );
  };

  const handleStatusDetail = (id) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 61 ~ handleStatusDetails ~ id",
      id
    );

    if (id <= 0 || id >= 7) return id === 1;

    if (id === 1)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: handlingColor.backgroundColor }}
        ></div>
      );

    if (id === 2)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: toShip.backgroundColor }}
        ></div>
      );

    if (id === 3)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: toReceiveColor.backgroundColor }}
        ></div>
      );

    if (id === 4)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: completedColor.backgroundColor }}
        ></div>
      );

    if (id === 5)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: cancelColor.backgroundColor }}
        ></div>
      );

    if (id === 6)
      return (
        <div
          className={styles.div}
          style={{ backgroundColor: newColor.backgroundColor }}
        ></div>
      );
  };

  const handleCancelOrder = async (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 266 ~ handleCancelOrder ~ item",
      item
    );

    // if (item.status.statusId - 1 <= 0 || item.status.statusId - 1 >= 7)
    //   return alert("tạch");

    const body = {
      CartId: item.cartId,
      AccountId: item.accountId,
      StatusId: 5,
      Note: item.note,
    };

    console.log(
      "🚀 ~ file: index.jsx ~ line 276 ~ handleCancelOrder ~ body",
      body
    );

    try {
      const res = await axios.put(
        `api/users/orders/update/user=${item.accountId}/order=${item.cartId}`,
        body
      );
      console.log("🚀 ~ file: index.jsx ~ line 65 ~ //updateOrder ~ res", res);

      var index = orderList.findIndex(
        (elm) => elm.cartId === item.cartId && elm.accountId === item.accountId
      );
      orderList.splice(index, 1);

      var a = [].concat(orderList);
      setOrderList(a);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const handleNextStepOrder = async (item) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 266 ~ handleCancelOrder ~ item",
      item
    );

    // if (item.status.statusId - 1 <= 0 || item.status.statusId - 1 >= 7)
    //   return alert("tạch");

    var newStatus = (item.status.statusId + 1) % 6;

    const body = {
      CartId: item.cartId,
      AccountId: item.accountId,
      StatusId: newStatus,
      Note: item.note,
    };

    console.log(
      "🚀 ~ file: index.jsx ~ line 276 ~ handleCancelOrder ~ body",
      body
    );

    try {
      const res = await axios.put(
        `api/users/orders/update/user=${item.accountId}/order=${item.cartId}`,
        body
      );
      console.log("🚀 ~ file: index.jsx ~ line 65 ~ //updateOrder ~ res", res);

      var index = orderList.findIndex(
        (elm) => elm.cartId === item.cartId && elm.accountId === item.accountId
      );
      orderList.splice(index, 1);

      var a = [].concat(orderList);
      setOrderList(a);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  return (
    <div className={styles.order_border}>
      <div className={styles.sort_list}>
        {/* Sort */}
        <div className={styles.sort_container} id="group 1">
          <div className={styles.new_oldest}>
            <div
              onClick={() => setColorStatus(6)}
              className={`${styles.square} ${styles.new_square}`}
            >
              <span>New</span>
              <label
                onClick={() => activeStatus(0, "new")}
                className={styles.checkbox_container}
              >
                <input
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>
            <div
              onClick={() => setOrderBy(!orderBy)}
              className={`${styles.square} ${styles.oldest_square}`}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 30H15V26.6667H5V30ZM5 10V13.3333H35V10H5ZM5 21.6667H25V18.3333H5V21.6667Z"
                  fill="black"
                />
              </svg>
              <span>{orderBy ? "Oldest" : "Newest"} </span>
            </div>
          </div>

          <div className={styles.five_sort}>
            <div
              onClick={() => setColorStatus(1)}
              className={`${styles.square} ${styles.handing_square}`}
            >
              <span>Handling</span>
              <label
                onClick={() => activeStatus(1, "In Handle")}
                className={styles.checkbox_container}
              >
                <input
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>

            <div
              onClick={() => setColorStatus(2)}
              className={`${styles.square} ${styles.to_ship_square}`}
            >
              <span>To Ship</span>
              <label
                onClick={() => activeStatus(2, "To Ship")}
                className={styles.checkbox_container}
              >
                <input
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>

            <div
              onClick={() => setColorStatus(3)}
              className={`${styles.square} ${styles.to_receive_square}`}
            >
              <span>To Receive</span>
              <label
                onClick={() => activeStatus(3, "To Receive")}
                className={styles.checkbox_container}
              >
                <input
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>

            <div
              onClick={() => setColorStatus()}
              className={`${styles.square} ${styles.completed_square}`}
            >
              <span>Conmpleted</span>
              <label
                onClick={() => activeStatus(4, "completed")}
                className={styles.checkbox_container}
              >
                <input
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>

            <div className={`${styles.square} ${styles.cancelled_square}`}>
              <span>Cancelled</span>
              <label
                onClick={() => activeStatus(5, "cancelled")}
                className={styles.checkbox_container}
              >
                <input
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                  className={styles.checkbox_input}
                  type="radio"
                  name="radio group1"
                />
                <label className={styles.checkbox_label}>
                  <span className={styles.checkbox_span}></span>
                </label>
              </label>
            </div>
          </div>
        </div>

        {/* List orders */}
        <div className={styles.list_orders}>
          <table>
            <tr>
              <th>User</th>
              <th>Order</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
            {orderList.length === 0 && (
              <div className={styles.order_null}>
                <img
                  src={Images.IMG_NULL}
                  alt="Sorry we cant find everythings you need"
                />
                <span>Please choose another status to see the results</span>
              </div>
            )}
            {orderList.length !== 0 &&
              orderList.map((item, key) => {
                return (
                  <tr key={key} onClick={() => handleOrderDetail(item)}>
                    <td>{`#${item.accountId}`} </td>
                    <td>{`#${item.cartId}`}</td>
                    <td>{handleStatusName(item.status)} </td>
                    <td>{item.createdAt.substring(0, 10)} </td>
                  </tr>
                );
              })}
          </table>
          <div className={styles.pagination}>
            <Indicator
              setPage={setPage}
              totalPages={totalPages}
              pagination={pagination}
            />
          </div>
        </div>
      </div>

      <div className={styles.detail}>
        <div className={styles.user_order_id}>
          <div className={styles.user_id}>
            User:{`#${orderInfoDetail.accountId}`}{" "}
          </div>
          <div className={styles.order_id}>
            Order:{`#${orderInfoDetail.cartId}`}{" "}
          </div>
        </div>

        <div className={styles.list_products}>
          <ul className={styles.list_products_container}>
            {orderInfoList.length === 0 && (
              <div className={styles.user_null}>
                <img
                  src={Images.IMG_NULL}
                  alt="Sorry we cant find everythings you need"
                />
                <span>Please choose another account to see the details</span>
              </div>
            )}
            {orderInfoList.length !== 0 &&
              orderInfoList.map((item, key) => {
                return (
                  <li key={key} className={styles.list_products_item}>
                    <div className={styles.item_img_name}>
                      <div className={styles.item_img}>
                        <img
                          src={
                            item.product.image
                              ? item.product.image
                              : Images.MACARON_CAKE
                          }
                          alt=""
                        />
                      </div>
                      <span>{item.product.productName} </span>
                    </div>
                    <div className={styles.item_qty}>
                      <span>Qty:{item.quantity} </span>
                    </div>
                    <div className={styles.item_price}>
                      <span>Price:{item.finalPrice}.000</span>
                    </div>
                  </li>
                );
              })}

            {/* {isLoading ? (
              orderInfoList.length !== 0 &&
              orderInfoList.map((item, key) => {
                return (
                  <li key={key} className={styles.list_products_item}>
                    <div className={styles.item_img_name}>
                      <div className={styles.item_img}>
                        <img
                          src={
                            item.product.image
                              ? item.product.image
                              : Images.MACARON_CAKE
                          }
                          alt=""
                        />
                      </div>
                      <span>{item.product.productName} </span>
                    </div>
                    <div className={styles.item_qty}>
                      <span>Qty:{item.quantity} </span>
                    </div>
                    <div className={styles.item_price}>
                      <span>Price:{item.finalPrice}.000</span>
                    </div>
                  </li>
                );
              })
            ) : (
              <CircularProgress color="success" />
            )} */}
          </ul>
        </div>

        <div className={styles.info_note}>
          <div className={styles.info_price}>
            <ul className={styles.info}>
              <li>Address:{orderDetail.shipAddress}.</li>
              <li>Ward:{orderDetail.shipWard}.</li>
              <li>Distrist/City:{orderDetail.shipDistrict}.</li>
              <li>
                Receiver: {orderDetail.receiverFirstName}{" "}
                {orderDetail.receiverLastName}{" "}
              </li>
              <li>Phone{orderDetail.phone}: </li>
            </ul>
            <ul className={styles.price}>
              <li>
                Ship Fee:{" "}
                {parseFloat(orderDetail.shipFee * 1000).toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                    // minimumFractionDigits: 3,
                  }
                )}
              </li>
              <li>Member: 5%</li>
              <li>Discount: 10%</li>
              <li>
                Total:{" "}
                {parseFloat(orderDetail.finalTotalPrice * 1000).toLocaleString(
                  "it-IT",
                  {
                    style: "currency",
                    currency: "VND",
                    // minimumFractionDigits: 3,
                  }
                )}
              </li>
            </ul>
          </div>
          <div className={styles.status_and_btns}>
            <div className={styles.status}>
              <span>Status</span>

              {handleStatusDetail(orderInfoDetail.statusId)}
            </div>
            <div className={styles.btns}>
              <button
                onClick={() => handleNextStepOrder(orderInfoDetail)}
                className={styles.btns_next}
              >
                Next Step
              </button>
              <button
                onClick={() => handleCancelOrder(orderInfoDetail)}
                className={styles.btns_cancle}
              >
                Cancel Order
              </button>
            </div>
          </div>
          <textarea
            name=""
            id=""
            cols="50"
            rows="10"
            placeholder="Note..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default AdOrder;
