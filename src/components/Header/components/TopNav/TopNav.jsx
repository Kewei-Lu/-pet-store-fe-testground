import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { get, post } from "../../../../api/axios";

export default function TopNav() {
  get("hello").then((res) => {
    console.log("res：", res);
  });
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={1}>
          <Button>
            <Typography color="white">ADD</Typography>
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button>
            <Typography color="white">FIND</Typography>
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button>
            <Typography color="white">ABOUT US</Typography>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
