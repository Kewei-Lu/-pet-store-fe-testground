import { Avatar, Box, Button, Fade, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Money from '../../components/User/Money';

export default function Account() {
  const userName = useSelector((state) => state.user.userName);
  const logined = useSelector((state) => state.user.logined);
  console.log('logined', logined);
  const navigate = useNavigate();
  const account = logined ? (
    <Grid container>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          rowSpacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid item alignContent="center">
            <Avatar sx={{ width: 56, height: 56 }}>
              {userName.length > 3 ? userName.substring(0, 3) : userName}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography display="inline">username: {userName}</Typography>
          </Grid>
          <Grid item>
            <Money />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column" sx={{ mt: 4 }}>
          <Grid item>
            <Typography>Message</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <p>You have not logined in</p>
  );
  return { account };
}
