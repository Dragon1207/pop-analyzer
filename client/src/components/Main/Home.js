import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StatisticChart from "./StatisticChart";

import RequestDialog from "./RequestDialog";
import UserContext from "../../context/userContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  formElement: {
    width: "30rem",
    margin: "1rem 2rem",
  },
}));

const Home = ({ user, logout }) => {
  const history = useHistory();
  const User = useContext(UserContext);

  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);
  const [statistic, setStatistic] = useState(null);
  const [currentRequestId, setCurrentRequestId] = useState("");

  // Lifecycle

  useEffect(() => {
    // when fetching, prevent redirect
    if (user?.isFetching) return;

    if (user && user.id) {
      setIsLoggedIn(true);
    } else {
      // If we were previously logged in, redirect to login instead of register
      if (isLoggedIn) history.push("/login");
      else history.push("/register");
    }
  }, [user, history, isLoggedIn]);

  useEffect(() => {
    const fetchPastRequests = async () => {
      try {
        const { data } = await axios.get("/api/requests");
        setCurrentRequestId(data[0].id);
        setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!user.isFetching) {
      fetchPastRequests();
    }
  }, [user]);

  useEffect(async () => {
    const { data } = await axios.get(
      `/api/requests/${currentRequestId}?format=json`
    );
    setStatistic(data.statistic);
  }, [currentRequestId]);

  const handleLogout = async () => {
    if (user && user.id) {
      await logout(user.id);
    }
  };

  const handleChange = (e) => {
    setCurrentRequestId(e.target.value);
  };

  const requestData = async ({ desiredTypes }) => {
    const { data } = await axios.post("/api/requests/new", { desiredTypes });
    setRequests([data, ...requests]);
    setCurrentRequestId(data.id);
  };

  function downloadCsv(csvString, filename) {
    var blob = new Blob([csvString]);
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, "filename.csv");
    } else {
      var a = window.document.createElement("a");

      a.href = window.URL.createObjectURL(blob, {
        type: "text/plain",
      });
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  const download = async (id) => {
    const { data } = await axios.get(`/api/requests/${id}?format=csv`);
    const createdAt = requests.find(
      (req) => req.id === currentRequestId
    ).created_at;

    downloadCsv(
      data.join("\n"),
      `report-${createdAt.slice(0, 10)} ${createdAt.slice(11, 19)}.csv`
    );
  };

  return (
    <Container>
      <Box className={classes.root}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Box mr={2}>
              <RequestDialog requestData={requestData} />
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => download(currentRequestId)}
              >
                Download
              </Button>
            </Box>
          </Box>
          <Box>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
        <FormControl className={classes.formElement}>
          <InputLabel id="request-date">Request Date</InputLabel>
          <Select
            id="request-select"
            label="Request Date"
            labelId="request-date-id"
            value={currentRequestId}
            onChange={handleChange}
          >
            {requests.map((request) => (
              <MenuItem key={request.id} value={request.id}>
                {request.created_at.slice(0, 10)}&nbsp;&nbsp;&nbsp;
                {request.created_at.slice(11, 19)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StatisticChart statistic={statistic} />
      </Box>
    </Container>
  );
};

export default Home;
