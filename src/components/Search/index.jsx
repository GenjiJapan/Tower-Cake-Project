import { resetFilter } from "actions/Cart";
import { searchList, searchPage } from "actions/Search";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styles from "./Search.module.css";

function Search(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  var [page, setPage] = useState(0);
  var [pageInfo, setPageInfo] = useState({});
  var [search, setSearch] = useState("");
  var [listSearch, setListSearch] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (search.length <= 0) return console.log("tạch");

    try {
      console.log("searching....");

      const res = await axios.get(
        `/api/products/search=${search}/page-${page}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 12 ~ getSearch ~ search completed",
        res
      );

      listSearch = res.data.mappingResults;
      pageInfo = res.data.metadata;

      setListSearch(listSearch);
      setPageInfo(pageInfo);

      dispatch(searchList(listSearch));
      dispatch(searchPage(pageInfo));

      dispatch(resetFilter());

      console.log(
        "🚀 ~ file: index.jsx ~ line 32 ~ handleSubmit ",
        listSearch,
        pageInfo
      );

      console.log(
        "🚀 ~ file: index.jsx ~ line 34 ~ handleSubmit ~ dispatch",
        dispatch(searchList(listSearch)),
        dispatch(searchPage(pageInfo))
      );
    } catch (error) {
      if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

    setTimeout(() => {
      history.push("/product");
    }, 1000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles.open_search}
        autoComplete="on"
      >
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Search;
