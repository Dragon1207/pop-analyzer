import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import GlobalChart from "./CategoryChart/GlobalChart";
import CountryChart from "./CategoryChart/CountryChart";
import StateChart from "./CategoryChart/StateChart";

export default function ({ category, statistic }) {
  return (
    <>
      <h2>Chart by {category}</h2>
      <Box border="1px solid #3A8DFF7F" p={3} my={2}>
        {statistic && (
          <>
            <GlobalChart data={statistic.global} />
            <CountryChart data={statistic.country} />
            <StateChart data={statistic.state} />
          </>
        )}
      </Box>
    </>
  );
}
