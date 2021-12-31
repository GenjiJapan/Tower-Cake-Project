import axios from "axios";
import BestSellerIncome from "components/BestSellerIncome";
import CompleteIncome from "components/CompleteIncome";
import NewOrderIncome from "components/NewOrderIncome";
import RevenueIncome from "components/RevenueIncome";
import React, { useEffect, useState } from "react";
import styles from "./AdIncome.module.css";

function AdIncome(props) {
  var [totalRevenue, setTotalRevenue] = useState(null);
  var [isGrow, setIsGrow] = useState(null);
  var [totalRevenueNew, setTotalRevenueNew] = useState(null);
  var [isGrowNew, setIsGrowNew] = useState(null);
  var [totalRevenueCompleted, setTotalRevenueCompleted] = useState(null);
  var [isGrowCompleted, setIsGrowCompleted] = useState(null);
  var [bestSeller, setBestSeller] = useState([]);

  const [dateTime, setDateTime] = useState({});
  const [rank, setRank] = useState("unknown");

  const [monthCompleted, setMonthCompleted] = useState("");
  const [yearCompleted, setYearCompleted] = useState("");

  const [monthNew, setMonthNew] = useState("");
  const [yearNew, setYearNew] = useState("");

  const [monthRevenue, setMonthRevenue] = useState("");
  const [yearRevenue, setYearRevenue] = useState("");

  const [monthBestSeller, setMonthBestSeller] = useState("");
  const [yearBestSeller, setYearBestSeller] = useState("");

  useEffect(() => {
    if (monthRevenue.length === 0 || yearRevenue === 0)
      return console.log("tạch");

    getRevenue(monthRevenue, yearRevenue);
  }, [monthRevenue, yearRevenue]);

  useEffect(() => {
    if (monthNew.length === 0 || yearNew === 0) return console.log("tạch");
    getNew(monthNew, yearNew);
  }, [monthNew, yearNew]);

  useEffect(() => {
    if (monthBestSeller.length === 0 || yearBestSeller === 0)
      return console.log("tạch");

    getBestSeller(monthBestSeller, yearBestSeller);
  }, [monthBestSeller, yearBestSeller]);

  useEffect(() => {
    if (monthCompleted.length === 0 || yearCompleted === 0)
      return console.log("tạch");
    getCompleted(monthCompleted, yearCompleted);
  }, [monthCompleted, yearCompleted]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ year",
      yearCompleted
    );
  }, [yearCompleted]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ month",
      monthCompleted
    );
  }, [monthCompleted]);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ month", monthNew);
  }, [monthNew]);

  useEffect(() => {
    console.log("🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ year", yearNew);
  }, [yearNew]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ month",
      monthRevenue
    );
  }, [monthRevenue]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 36 ~ AdIncome ~ year",
      yearRevenue
    );
  }, [yearRevenue]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 100 ~ AdIncome ~ monthBestSeller",
      monthBestSeller
    );
  }, [monthBestSeller]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 108 ~ AdIncome ~ yearBestSeller",
      yearBestSeller
    );
  }, [yearBestSeller]);

  const getRevenue = async (monthRevenue, yearRevenue) => {
    try {
      const res = await axios.get(
        `api/admin/statistic/revenue/?Year=${yearRevenue}&Month=${monthRevenue}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 16 ~ getIncome ~ res income",
        res
      );

      totalRevenue = res.data.totalRevenue;
      isGrow = res.data.isGrow;

      setTotalRevenue(totalRevenue);
      setIsGrow(isGrow);
      console.log(
        "🚀 ~ file: index.jsx ~ line 12 ~ AdIncome ~ totalRevenue",
        totalRevenue
      );
      console.log("🚀 ~ file: index.jsx ~ line 14 ~ AdIncome ~ isGrow", isGrow);
    } catch (error) {
      // if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getNew = async (monthNew, yearNew) => {
    try {
      const res = await axios.get(
        `api/admin/countingorders/status=new/?Year=${yearNew}&Month=${monthNew}`
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 16 ~ getIncome ~ res income",
        res
      );

      totalRevenueNew = res.data.totalRevenue;
      isGrowNew = res.data.isGrow;

      setTotalRevenueNew(totalRevenueNew);
      setIsGrowNew(isGrowNew);
      console.log(
        "🚀 ~ file: index.jsx ~ line 12 ~ AdIncome ~ totalRevenueNew",
        totalRevenueNew
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 14 ~ AdIncome ~ isGrowNew",
        isGrowNew
      );
    } catch (error) {
      // if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getCompleted = async (monthCompleted, yearCompleted) => {
    try {
      const res = await axios.get(
        `api/admin/countingorders/status=completed/?Year=${yearCompleted}&Month=${monthCompleted}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 128 ~ getCompleted ~ res", res);

      totalRevenueCompleted = res.data.totalRevenue;
      isGrowCompleted = res.data.isGrow;

      setTotalRevenueCompleted(totalRevenueCompleted);
      setIsGrowCompleted(isGrowCompleted);
      console.log(
        "🚀 ~ file: index.jsx ~ line 12 ~ AdIncome ~ totalRevenueCompleted",
        totalRevenueCompleted
      );
      console.log(
        "🚀 ~ file: index.jsx ~ line 14 ~ AdIncome ~ isGrowCompleted",
        isGrowCompleted
      );
    } catch (error) {
      // if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const getBestSeller = async (monthBestSeller, yearBestSeller) => {
    try {
      const res = await axios.get(
        `/api/admin/statistic/products/top/?Year=${yearBestSeller}&Month=${monthBestSeller}`
      );
      console.log("🚀 ~ file: index.jsx ~ line 118 ~ getBestSeller ~ res", res);

      bestSeller = res.data;
      setBestSeller(bestSeller);
      console.log(
        "🚀 ~ file: index.jsx ~ line 120 ~ getBestSeller ~ bestSeller",
        bestSeller
      );

      ranking(bestSeller);
    } catch (error) {
      // if (error.response.status === 400) return;
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  const ranking = (item) => {
    console.log("🚀 ~ file: index.jsx ~ line 138 ~ ranking ~ item", item);

    var a = [];

    item.forEach((el) => {
      a.push(el.soldQuantites);
    });
    console.log("🚀 ~ file: index.jsx ~ line 145 ~ ranking ~ a", a);

    const maxSoldQuantites = Math.max(...a);
    console.log(
      "🚀 ~ file: index.jsx ~ line 141 ~ ranking ~ maxSoldQuantites",
      maxSoldQuantites
    );

    if (maxSoldQuantites) setRank("1nd");
    else setRank("3nd");
    return setRank("2nd");
  };

  return (
    <div className={styles.income_border}>
      <div className={styles.income_border_container}>
        {/* Orders Statistic */}
        <div className={styles.group}>
          <div className={styles.group_header}>
            <span>Orders Statistic</span>
          </div>
          <div className={styles.group_body}>
            {/* Revenue */}
            <RevenueIncome
              setMonthRevenue={setMonthRevenue}
              setYearRevenue={setYearRevenue}
              isGrow={isGrow}
              totalRevenue={totalRevenue}
            />

            {/* New Order */}
            <NewOrderIncome
              setMonthNew={setMonthNew}
              setYearNew={setYearNew}
              isGrowNew={isGrowNew}
              totalRevenueNew={totalRevenueNew}
            />

            {/* Complete Order */}
            <CompleteIncome
              setYearCompleted={setYearCompleted}
              setMonthCompleted={setMonthCompleted}
              isGrowCompleted={isGrowCompleted}
              totalRevenueCompleted={totalRevenueCompleted}
            />
          </div>
        </div>

        {/* Top tier products */}

        <BestSellerIncome
          setMonthBestSeller={setMonthBestSeller}
          setYearBestSeller={setYearBestSeller}
          bestSeller={bestSeller}
        />
      </div>
    </div>
  );
}

export default AdIncome;
