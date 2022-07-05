import { Box } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import getDataSet from "./helpers/getDataSet";

export default function ({ data }) {
  return (
    <>
      <h3>Country Chart</h3>
      <Box
        sx={{ display: "flex", flexWrap: "wrap" }}
        width={"100%"}
        px={5}
        py={2}
      >
        {Object.entries(data).map(([country, data], index) => (
          <Box
            key={index}
            sx={{ flexDirection: "column" }}
            width={220}
            height={240}
          >
            {country}
            <Doughnut data={getDataSet(data)} />
          </Box>
        ))}
      </Box>
    </>
  );
}
