import React, { useState, useEffect } from "react";
import StatisticChart from "./StatisticChart";

const renderChart = (type, data, index) => {
  switch (type) {
    case "byFemale":
      return <StatisticChart key={index} category="Female" statistic={data} />;
    case "byLastName":
      return (
        <StatisticChart key={index} category="Last Name" statistic={data} />
      );
    case "byAge":
      return <StatisticChart key={index} category="Age" statistic={data} />;
  }

  return "";
};

export default function ({ statistic }) {
  return (
    <>
      {statistic &&
        Object.entries(statistic).map(([key, data], index) =>
          renderChart(key, data, index)
        )}
    </>
  );
}
