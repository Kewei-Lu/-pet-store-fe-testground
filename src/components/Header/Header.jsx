import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import SideNav from '../SideNav/SideNav';
import TopNav from './components/TopNav/TopNav';
import User from './components/User/User';
import petShop from './petShop.jpg';

export default function Header() {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <>
      <Grid
        container
        columnSpacing={3}
        alignItems="center"
        sx={{ maxHeight: '50px' }}
        bgcolor="#0071c6"
      >
        <Grid item sx={{ maxHeight: '50px' }}>
          <Box
            component="img"
            src={petShop}
            sx={{ maxHeight: '50px' }}
            onClick={() => {
              setShowSideNav(true);
            }}
          />
        </Grid>
        <Grid item sx={{ bgcolor: '#0071c6', flex: 1 }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography color="white">NSWE PET STORE</Typography>
            </Grid>
            <Grid item flex={1} sx={{ ml: 10 }}>
              <TopNav />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ bgcolor: '#0071c6' }} xs={3}>
          <User />
        </Grid>
      </Grid>

      <SideNav show={showSideNav} anchorPosition="left" setShow={setShowSideNav} />
    </>
  );
}
