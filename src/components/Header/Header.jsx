import React, { useState } from "react";
import petShop from "./petShop.jpg";
import { Grid, Box, Typography } from "@mui/material";
import TopNav from "./components/TopNav/TopNav";
import User from "./components/User/User";
import SideNav from "../SideNav/SideNav";

export default function Header() {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <React.Fragment>
      <Grid
        container
        columnSpacing={3}
        alignItems="stretch"
        sx={{ maxHeight: "50px" }}
      >
        <Grid item sx={{ maxHeight: "50px" }}>
          <Box
            component="img"
            src={petShop}
            sx={{ maxHeight: "50px" }}
            onClick={() => {
              setShowSideNav(true);
            }}
          ></Box>
        </Grid>
        <Grid item sx={{ bgcolor: "#0071c6", flex: 1 }}>
          <Grid container width="100%" height="100%" alignItems="center">
            <Grid item>
              <Typography color="white">NSWE PET STORE</Typography>
            </Grid>
            <Grid item flex={1} sx={{ ml: 10 }}>
              <TopNav />
            </Grid>
            <Grid item sx={{ ml: "auto" }}>
              <User />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SideNav show={showSideNav} anchor="left" setShow={setShowSideNav} />
    </React.Fragment>
  );
}
