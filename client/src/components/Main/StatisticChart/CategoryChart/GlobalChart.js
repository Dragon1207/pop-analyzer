import { Box } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import getDataSet from "./helpers/getDataSet";

export default function ({ data }) {
  return (
    <>
      <h3>Global Chart</h3>
      <Box width={220} height={240} px={5} py={2}>
        <Doughnut data={getDataSet(data)} />
      </Box>
    </>
  );
}
