import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Grid } from "@mui/material";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import ChatBox from "./components/ChatBox";
function App() {
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
            <Routes>
              <Route path="/index" element={<IndexPage />} />
              <Route path="*" element={<IndexPage />} />
            </Routes>
          </Grid>
          <ChatBox />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
