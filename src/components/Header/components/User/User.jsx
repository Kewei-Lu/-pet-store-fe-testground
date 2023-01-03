import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, Popover, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../../../state/slices/userSlice";
import Money from "./components/Money";
import { get, post } from "../../../../api/axios";
import cookie from "react-cookies";

export default function User() {
  const logined = useSelector((state) => state.user.logined);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const [anchorEl, setAnchorEl] = useState(null);
  const [registerMode, setRegisterMode] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // const cookieDic = new Map();
    const cookieUserName = cookie.load("user-name");
    const cookieIssueTime = cookie.load("issue-time");
    console.log("cookie: ", cookie.load("user-name"));
    // const arrCookie = document.cookie.split("; ");
    // for (var i = 0; i < arrCookie.length; i++) {
    //   var arr = arrCookie[i].split("=");
    //   if (arr[0] === "user-name") {
    //     cookieDic["user-name"] = arr[1];
    //   } else if (arr[0] === "issue-time") {
    //     cookieDic["issue-time"] = arr[1];
    //   }
    // }
    // console.log("cookieDic :>> ", cookieDic["user-name"]);
    if (cookieUserName && cookieIssueTime) {
      post("user/cookies", {
        UserName: cookieUserName,
        IssueTime: cookieIssueTime,
      }).then((res) => {
        dispatch(login({ userName: cookieUserName }));
      });
    }
  }, []);

  const popOver = (
    <Popover
      onClose={() => {
        setAnchorEl(null);
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
    >
      <Box sx={{ height: "300px", width: "200px" }}>
        {logined ? (
          <Grid
            container
            direction="column"
            sx={{ height: "100%" }}
            alignItems="stretch"
            rowSpacing={2}
          >
            <Grid item alignContent="center" sx={{ mt: 2 }}>
              <Avatar sx={{ ml: "auto", mr: "auto" }}>
                {userName.length > 3 ? userName.substring(0, 3) : userName}
              </Avatar>
            </Grid>
            <Grid item sx={{ ml: "auto", mr: "auto" }}>
              <Typography>{userName}</Typography>
            </Grid>
            <Grid item sx={{ ml: "auto", mr: "auto" }}>
              <Money />
            </Grid>
            <Grid item flex={1}>
              <Grid
                container
                alignItems="flex-end"
                justifyContent="flex-end"
                height="100%"
              >
                <Grid item>
                  <Button
                    onClick={() => {
                      dispatch(logout());
                      cookie.remove("user-name");
                      cookie.remove("issue-time");
                    }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column" sx={{ height: "100%" }}>
            <Grid item>{registerMode ? <Register /> : <Login />}</Grid>
            <Grid item flex={1}>
              {registerMode ? (
                <Button
                  sx={{ ml: 1, mt: 2 }}
                  onClick={() => {
                    setRegisterMode(false);
                  }}
                >
                  <Typography sx={{ fontSize: "0.675rem" }}>
                    Back to Login
                  </Typography>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setRegisterMode(true);
                  }}
                  sx={{ ml: 1, mt: 2 }}
                >
                  <Typography sx={{ fontSize: "0.675rem" }}>
                    Do not have an accout?
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Popover>
  );
  return (
    <React.Fragment>
      <PersonIcon onClick={handleClick} />
      {popOver}
    </React.Fragment>
  );
}
