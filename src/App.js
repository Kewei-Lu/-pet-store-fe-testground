import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "./components/Header/Header";
import { useRoutes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import routers from "./routes/route";
import { post } from "./api/axios";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { login } from "./state/slices/userSlice";

function App() {
  const Routers = useRoutes(routers);
  const dispatch = useDispatch();
  useEffect(() => {
    // const cookieDic = new Map();
    const cookieUserName = cookie.load("user-name");
    const cookieIssueTime = cookie.load("issue-time");
    if (cookieUserName && cookieIssueTime) {
      post("user/cookies", {
        UserName: cookieUserName,
        IssueTime: cookieIssueTime,
      }).then((res) => {
        if (res.data.Success) {
          dispatch(login({ userName: cookieUserName }));
        } else {
          console.error("API returns success but no username is returned");
        }
      });
    }
  }, []);
  return (
    <Grid
      container
      width="100vw"
      height="100vh"
      direction="column"
      sx={{ bgcolor: "#f0f0f0" }}
    >
      <Grid item sx={{ width: "100vw" }}>
        <Header />
      </Grid>
      <Grid item flex={1}>
        <Grid container sx={{ height: "100%" }}>
          {/* for side Nav Bar */}
          {/* <Grid item xs={1}></Grid> */}
          {/* for content */}
          <Grid item xs={12} sx={{ width: "100%", height: "100%" }}>
            {Routers}
          </Grid>
          <ChatBox />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
