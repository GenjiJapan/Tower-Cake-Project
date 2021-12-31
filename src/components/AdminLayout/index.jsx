import AdAcc from "components/AdAcc";
import AdDetailProduct from "components/AdDetailProduct";
import AdIncome from "components/AdIncome";
import AdOrder from "components/AdOrder";
import AdProduct from "components/AdProduct";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Error from "../NotFound";

function AdminLayout(props) {
  let { topicId } = useParams();

  if (topicId === "income") return <AdIncome />;
  if (topicId === "order") return <AdOrder />;
  if (topicId === "product") return <AdProduct />;
  if (topicId === "detailProduct") return <AdDetailProduct />;

  if (topicId === "adAccount") return <AdAcc />;

  return (
    <div>
      <Error /> <Link to="/">Click here!!!</Link>
    </div>
  );
}

export default AdminLayout;
