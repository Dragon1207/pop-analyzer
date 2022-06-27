import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UserContext from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const Home = ({ user, logout }) => {
  const history = useHistory();
  const User = useContext(UserContext);

  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requests, setRequests] = useState([]);

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
        setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (!user.isFetching) {
      fetchPastRequests();
    }
  }, [user]);

  const handleLogout = async () => {
    if (user && user.id) {
      await logout(user.id);
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
      <Grid container component="main" className={classes.root}></Grid>
    </>
  );
};

export default Home;
