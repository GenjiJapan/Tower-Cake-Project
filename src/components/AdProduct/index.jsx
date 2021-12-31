import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import ApplyEvent from "components/ApplyEvent";
import Indicator from "components/Pagination";
import PreviewImage from "components/PreviewImage/PreviewImage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";
import Images from "../../constants/images";
import "../AdIncome/SelectStyles.css";
import styles from "./AdProduct.module.css";

const animatedComponents = makeAnimated();

function AdProduct(props) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tagOption, setTagOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [sizeOption, setSizeOption] = useState("");
  const [eventName, setEventName] = useState("");
  const [discountValue, setDiscountValue] = useState(0);

  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState({
    _page: page ? page : 1,
    _limit: 6,
    _totalRows: 20,
  });
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [productList, setProductList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [image, setImage] = useState(null);
  const [eventItemsModal, seteventItemsModal] = useState(false);
  const [moreItems, setMoreItems] = useState(true);
  const [eventModal, setEventModal] = useState(false);
  const [productModal, setProductModal] = useState(false);

  var [nearestList, setNearestList] = useState([]);
  var [eventItems, setEventItems] = useState({
    eventId: null,
    eventName: null,
    discountValue: null,
    dateStart: null,
    dateEnd: null,
  });
  var [listSearch, setlistSearch] = useState([]);
  var [searchPage, setSearchPage] = useState({});
  var querystring = queryString.parse(window.location.search).page;
  var [page, setPage] = useState(querystring ? querystring : 1);
  var [categories, setCategories] = useState([]);
  var [sizes, setSizes] = useState([]);
  var [tags, setTags] = useState([]);
  var [pageEvent, setPageEvent] = useState(1);
  var [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    getProduct();
  }, [page]);

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    // getNearestEvent();
  }, []);

  useEffect(() => {
    console.log("abc", queryString);
  }, [queryString]);

  useEffect(() => {
    getCategories();
    getSize();
    getTags();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx ~ line 98 ~ #$% ~ page", eventList);
    console.log("🚀 ~ file: index.jsx ~ line 98 ~ #$% ~ page", pageInfo);
  }, [eventList, pageInfo]);

  useEffect(() => {
    setEventList(eventList);
  }, [eventList]);

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/products/page-${page}`);
      console.log("🚀 ~ file: index.jsx ~ line 15 ~ getProduct ~ res", res);
      setProductList(res.data.mappingResults);
      setPagination({
        _page: res.data.metadata.currentPage,
        _limit: res.data.metadata.limit,
        _totalRows: res.data.metadata.totalRows,
      });
      setTotalPages(res.data.metadata.totalPages);
      setIsLoading(true);
    } catch (error) {
      console.log("Failed to fetch Food List :", error.message);
    }
  };

  const getEventItems = async (item) => {
    try {
      const res = await axios.get(`api/discountevents/${item.eventId}`);
      console.log("🚀 ~ file: index.jsx ~ line 96 ~ openEventItems ~ res", res);
      console.log(
        "🚀 ~ file: index.jsx ~ line 98 ~ openEventItems ~ res.data",
        res.data
      );
      eventItems = res.data;
      setEventItems(eventItems);
      console.log("event item : ", eventItems);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getEvent = async () => {
    try {
      const res = await axios.get(`api/discountevents/page-${pageEvent}`);

      console.log("🚀 ~ file: index.jsx ~ line 173 ~ getEvent ~ res", res);

      var a = eventList.concat(res.data.mappingResults);
      console.log("🚀 ~ file: index.jsx ~ line 144 ~ getEvent ~ a", a);

      setEventList(a);
      setPageInfo(res.data.metadata);

      setIsLoading(true);
    } catch (error) {
      if (error && error.response) console.log(error.response.data);
    }
  };

  const getSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `api/discountevents/search=${search}/page-${pageEvent}/?limit=4`
      );
      console.log("🚀 ~ file: index.jsx ~ line 150 ~ getSearch ~ res", res);
      console.log(
        "🚀 ~ file: index.jsx ~ line 165 ~ getSearch ~ search",
        search
      );

      listSearch = res.data.mappingResults;
      searchPage = res.data.metadata;

      setlistSearch(listSearch);
      setSearchPage(searchPage);

      // dispatch(eventSearchList(listSearch));
      // dispatch(resetEvent());

      console.log(
        "🚀 ~ file: index.jsx ~ line 156 ~ getSearch ~ searchPage",
        searchPage
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 154 ~ getSearch ~ listSearch",
        listSearch
      );

      setEventList(listSearch);
      setPageInfo(searchPage);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getNearestEvent = async () => {
    try {
      const res = await axios.get(`/api/admin/events/nearest`);
      console.log(
        "🚀 ~ file: index.jsx ~ line 205 ~ getNearestEvent ~ res",
        res
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 222 ~ getNearestEvent ~ res.data",
        res.data
      );

      nearestList = res.data;
      setNearestList(nearestList);

      setEventList(nearestList);

      // setIsLoading(true)

      // nearestEvent(res.data);
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

  const removeTime = (time) => {
    if (!time) return "Coming soon";
    return time.substring(0, 10);
  };

  const openEventItems = (item) => {
    console.log("🚀 ~ file: index.jsx ~ line 85 ~ openEventItems ~ item", item);
    getEventItems(item);
    seteventItemsModal(!eventItemsModal);
  };

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const countEventItems = moreItems ? eventList.length : 4;
  const openDetail = (item) => {
    history.push(`/adminPage/detailProduct?productID=${item.productId}`);
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

  const handlePageEventChange = async () => {
    var res = null;
    pageEvent = pageEvent + 1;
    if (pageEvent === 1) return setPageEvent(pageEvent);

    if (pageEvent > 1 && pageEvent <= pageInfo.totalPages) {
      if (search.length >= 1) {
        res = await axios.get(
          `api/discountevents/search=${search}/page-${pageEvent}/?limit=4`
        );
        console.log(1);
      } else {
        res = await axios.get(
          // `/api/products/ratings/product=${id}?page=${page}`
          `api/discountevents/page-${pageEvent}`
        );
        console.log(2);
      }

      console.log(
        "🚀 ~ file: index.jsx ~ line 306 ~ handlePageEventChange ~ res",
        res
      );

      var a = eventList.concat(res.data.mappingResults);
      console.log(
        "🚀 ~ file: index.jsx ~ line 322 ~ handlePageEventChange ~ a",
        a
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 322 ~ handlePageEventChange ~ res.data.mappingResults",
        res.data.mappingResults
      );

      setEventList(a);

      try {
      } catch (error) {
        if (error && error.response) console.log(error.response.data);
      }
      setPageEvent(pageEvent);
      return;
    }

    if (pageEvent > pageInfo.totalPages) {
      // alert("page = limit");
      setMoreItems(!moreItems);
      setPageEvent(0);
    }
  };

  const validationSchema = Yup.object({
    productName: Yup.string()
      .max(30, "Must be at least 15 characters")
      .min(5, "Must be at least 15 characters")
      .required("Please give us know your product name"),
    unitPrice: Yup
      // .string()
      .number()
      .positive()
      .integer()
      .min(5000, "It's too cheap ")
      .max(900000000, "Cant be higher")
      .required("Please enter the price for your product"),
    description: Yup.string()
      .min(20, "Your description for this product is too short")
      .max(500, "You reached the limit of characters")
      .required("You should write something for your product to describe"),
    image: Yup.mixed()
      .nullable()
      .test(
        "FILE_SIZE",
        "File too large",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "FILE_FORMAT",
        "Unsupported file type",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      )
      .required("Please choose image for your product"),
    // tag: Yup.number().nullable().required("Please choose one Tag"),
    // category: Yup.number().nullable().required("Please choose one Category"),
    // size: Yup.number().nullable().required("Please choose one Size"),
  });

  const initialValues = {
    productName: "",
    unitPrice: "",
    description: "",
    image: null,
    // tag: null,
    // category: null,
    // size: null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await handleAddProduct(values, { setSubmitting });
    await handleUploadImg(values, { setSubmitting });
  };

  const handleAddProduct = async (values, { setSubmitting }) => {
    const body = {
      CategoryId: categoryOption,
      SizeId: sizeOption,
      TagId: tagOption,
      EventId: 1,
      ProductName: values.productName,
      UnitPrice: values.unitPrice,
      Image: values.image.name,
      Description: values.description,
    };

    try {
      const res = await axios.post(`api/products`, body);
      console.log(
        "🚀 ~ file: index.jsx ~ line 394 ~ handleAddProduct ~ res",
        res
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleUploadImg = async (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 424 ~ handleUploadImg ~ selectedFile",
      selectedFile
    );
    const formData = await new FormData();

    // Update the formData object
    await formData.append("image", selectedFile);
    await formData.append("OwnerName", values.productName);

    try {
      const res = await axios.post(`api/images/products`, formData);
      console.log("🚀 ~ file: index.jsx ~ line 439 ~ handleAddImg ~ res", res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    const body = {
      EventName: eventName,
      DateStart: startDate,
      DateEnd: endDate,
      DiscountValue: discountValue,
    };
    try {
      const res = await axios.post(`api/discountevents`, body);
      console.log(
        "🚀 ~ file: index.jsx ~ line 439 ~ handleSubmitEvent ~ res",
        res
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={styles.big_daddy}>
      {/* Products */}
      <div className={styles.product_border}>
        <div className={styles.list_product}>
          <table>
            <tr>
              <th style={{ background: "#FF4444", color: "#fff" }}>ID</th>
              <th style={{ background: "#FF9344" }}>Name</th>
              <th style={{ background: "#FFEC44" }}>Category</th>
              <th style={{ background: "#A2FF44" }}>Size</th>
              <th style={{ background: "#44FFDD" }}>Tag</th>
              <th style={{ background: "#446DFF", color: "#fff" }}>Event</th>
              <th style={{ background: "#CE44FF", color: "#fff" }}>
                Price per Unit
              </th>
            </tr>
            {isLoading ? (
              productList.map((item, key) => {
                return (
                  <tr key={key} onClick={() => openDetail(item)}>
                    <td>{`#${item.productId}`} </td>
                    <td>{item.productName} </td>
                    <td>{item.category.categoryName} </td>
                    <td>{item.size.sizeName} </td>
                    <td>{item.tag.nameTag} </td>
                    <td>{item.event.eventName} </td>
                    <td>đ {item.unitPrice}.000 </td>
                  </tr>
                );
              })
            ) : (
              <tr className={styles.product_Loading}>
                <CircularProgress
                  size={150}
                  className={styles.loading_icon}
                  color="success"
                />
                <img className={styles.logo} src={Images.LOGO} alt="" />
              </tr>
            )}
          </table>
        </div>
        <div className={styles.list_product_control}>
          <Indicator
            setPage={setPage}
            totalPages={totalPages}
            pagination={pagination}
          />
        </div>

        <div className={styles.event_addbtn}>
          <ApplyEvent
            isLoading={isLoading}
            nearestList={nearestList}
            getNearestEvent={getNearestEvent}
            openEventItems={openEventItems}
            getSearch={getSearch}
            removeTime={removeTime}
            countEventItems={countEventItems}
            handlePageEventChange={handlePageEventChange}
            setSearch={setSearch}
            eventList={eventList}
            setEventModal={setEventModal}
            eventModal={eventModal}
          />

          <div
            className={styles.add_new_btn}
            onClick={() => setProductModal(!productModal)}
          >
            <div className={styles.add_new_btn_logo}>
              <i class="fas fa-plus"></i>
            </div>
            <span>New Product</span>
          </div>
        </div>
      </div>

      {/* Add new products btn */}
      <div
        // onClick={() => setProductModal(!productModal)}
        className={productModal ? `${styles.modal}` : `${styles.disable_modal}`}
      >
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, { setSubmitting })
          }
          initialValues={initialValues}
        >
          {(formikProps) => {
            const {
              setFieldValue,
              values,
              errors,
              touched,
              isSubmitting,
              isValid,
            } = formikProps;
            console.log(
              "🚀 ~ file: index.jsx ~ line 284 ~ AdProduct ~ values, errors, touched",
              { values, errors, touched }
            );
            return (
              <Form
                className={
                  productList
                    ? `${styles.add_product_frame}`
                    : `${styles.disable_frame}`
                }
              >
                {values.image ? (
                  <PreviewImage file={values.image} />
                ) : (
                  <label className={styles.img_picker}>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faCamera}
                      size="3x"
                      style={{ color: "#464646" }}
                    />
                    <input
                      name="image"
                      type="file"
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
                        setSelectedFile(e.target.files[0]);
                      }}
                      required
                    />
                    <ErrorMessage name="image" />
                  </label>
                )}
                <div className={styles.content}>
                  <Field
                    name="productName"
                    placeholder="Product Name"
                    type="text"
                    className={styles.add_name}
                  />
                  <ErrorMessage name="productName" />

                  <div className={styles.group_4_input}>
                    <Field
                      name="unitPrice"
                      type="number"
                      placeholder="Unit Price"
                    />
                    <ErrorMessage name="unitPrice" />

                    <Select
                      // name="tag"
                      placeholder="Tags"
                      className="select tag react-select-container"
                      classNamePrefix="react-select"
                      options={tagsOptions}
                      isSearchable={false}
                      components={animatedComponents}
                      onChange={(e) => setTagOption(e.value)}
                    />
                    {/* <ErrorMessage name="tag" /> */}

                    <Select
                      // name="category"
                      placeholder="Categories"
                      className="select categories react-select-container"
                      classNamePrefix="react-select"
                      options={categoriesOptions}
                      isSearchable={false}
                      components={animatedComponents}
                      onChange={(e) => setCategoryOption(e.value)}
                    />
                    {/* <ErrorMessage name="category" /> */}

                    <Select
                      // name="size"
                      placeholder="Sizes"
                      className="select sizes react-select-container"
                      classNamePrefix="react-select"
                      options={sizesOptions}
                      isSearchable={false}
                      components={animatedComponents}
                      onChange={(e) => setSizeOption(e.value)}
                    />
                    {/* <ErrorMessage name="size" /> */}
                  </div>

                  <Field
                    name="description"
                    placeholder="Description"
                    className={styles.description}
                  />
                  <ErrorMessage name="description" />

                  <div className={styles.confirm_btns}>
                    <button
                      className={styles.cancel_btn}
                      onClick={() => setProductModal(!productModal)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={styles.add_btn}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      {/* Add new event btn */}
      <div
        // onClick={() => setEventModal(!eventModal)}
        className={eventModal ? `${styles.modal}` : `${styles.disable_modal}`}
      >
        <form
          onSubmit={handleSubmitEvent}
          className={
            eventModal ? `${styles.add_event_frame}` : `${styles.disable_frame}`
          }
        >
          <div className={styles.event_name}>
            <label htmlFor="">Event name</label>
            <input onChange={(e) => setEventName(e.target.value)} type="text" />
          </div>

          <div className={styles.date_value_picker}>
            <div className={styles.pick_date}>
              <label htmlFor="">Start</label>
              <DatePicker
                className={styles.date_picker}
                selected={startDate}
                onChange={(e) => {
                  setStartDate(e);

                  console.log(
                    "🚀 ~ file: index.jsx ~ line 664 ~ AdProduct ~ e",
                    e
                  );
                }}
                peekNextMonth
                dropdownMode="select"
                dateFormat="yyyy / MM / dd"
              />
            </div>

            <div className={styles.pick_date}>
              <label htmlFor="">End</label>
              <DatePicker
                className={styles.date_picker}
                selected={endDate}
                onChange={(e) => {
                  setEndDate(e);
                  console.log(
                    "🚀 ~ file: index.jsx ~ line 664 ~ AdProduct ~ e",
                    e
                  );
                }}
                peekNextMonth
                dropdownMode="select"
                dateFormat="yyyy / MM / dd"
              />
            </div>

            <div className={styles.picker_value}>
              <label htmlFor="">Value</label>
              <input
                onChange={(e) => setDiscountValue(e.target.value)}
                type="number"
              />
              <span>%</span>
            </div>
          </div>

          <div className={styles.askforsure}>Do you want to add this?</div>
          <div className={styles.confirm_btns_2}>
            <button
              type="button"
              className={styles.cancel_btn_2}
              onClick={() => setEventModal(!eventModal)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.add_btn_2}>
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Apply event when click on event table */}
      <div
        // onClick={() => seteventItemsModal(!eventItemsModal)}
        className={
          eventItemsModal ? `${styles.modal}` : `${styles.disable_modal}`
        }
      >
        <div
          className={
            eventItemsModal
              ? `${styles.apply_event_frame}`
              : `${styles.disable_frame}`
          }
        >
          <div className={styles.event_name_2}>
            <label htmlFor="">Event name</label>
            <span>
              {!eventItems.eventName
                ? "Event's coming soon"
                : eventItems.eventName}{" "}
            </span>
          </div>

          <div className={styles.date_end_value}>
            <div className={styles.start_date}>
              <label htmlFor="">Start</label>
              <span>{removeTime(eventItems.dateStart)}</span>
            </div>
            <div className={styles.end_date}>
              <label htmlFor="">End</label>
              <span>{removeTime(eventItems.dateEnd)}</span>
            </div>
            <div className={styles.value}>
              <label htmlFor="">Value</label>
              <span>{eventItems.discountValue * 100}%</span>
            </div>
          </div>

          <div className={styles.askforsure}>Do you want to apply this?</div>

          <div className={styles.confirm_btns_3}>
            <button
              onClick={() => seteventItemsModal(!eventItemsModal)}
              className={styles.cancel_btn_2}
            >
              Cancel
            </button>
            <button className={styles.apply_btn}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdProduct;
