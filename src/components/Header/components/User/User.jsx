import { Avatar, Box, Button, Grid, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../../state/slices/userSlice';
import Login from '../../../User/Login';
import Money from '../../../User/Money';
import Register from '../../../User/Register';

export default function User() {
  const logined = useSelector((state) => state.user.logined);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const [anchorEl, setAnchorEl] = useState(null);
  const [registerMode, setRegisterMode] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const popOver = (
    <Popover
      onClose={() => {
        setAnchorEl(null);
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
    >
      {logined ? (
        <Box sx={{ height: '380px', width: '300px' }}>
          <Grid
            container
            direction="column"
            sx={{ height: '100%' }}
            alignItems="stretch"
            rowSpacing={2}
          >
            <Grid item alignContent="center" sx={{ mt: 2 }}>
              <Avatar sx={{ ml: 'auto', mr: 'auto' }}>
                {userName.length > 3 ? userName.substring(0, 3) : userName}
              </Avatar>
            </Grid>
            <Grid item sx={{ ml: 'auto', mr: 'auto' }}>
              <Typography>{userName}</Typography>
            </Grid>
            <Grid item sx={{ ml: 'auto', mr: 'auto' }}>
              <Money />
            </Grid>
            <Grid item flex={1}>
              <Grid container alignItems="flex-end" justifyContent="flex-end" height="100%">
                <Grid item>
                  <Button
                    onClick={() => {
                      dispatch(logout());
                      cookie.remove('user-name', { path: '/' });
                      cookie.remove('issue-time', { path: '/' });
                      cookie.remove('X-Token', {
                        path: '/',
                        domain: 'kewei.sh.intel.com',
                      });
                      cookie.remove('refresh-token', { path: '/' });
                      cookie.remove('access-token', { path: '/' });
                    }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ height: '380px', width: '300px' }}>
          <Grid container direction="column" sx={{ height: '100%' }}>
            <Grid item>{registerMode ? <Register /> : <Login />}</Grid>
            <Grid item flex={1}>
              {registerMode ? (
                <Button
                  sx={{ ml: 1, mt: 2, position: 'absolute', bottom: '20px' }}
                  onClick={() => {
                    setRegisterMode(false);
                  }}
                >
                  <Typography sx={{ fontSize: '0.675rem' }}>Back to Login</Typography>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setRegisterMode(true);
                  }}
                  sx={{ ml: 1, mt: 2, position: 'absolute', bottom: '20px' }}
                >
                  <Typography sx={{ fontSize: '0.675rem' }}>Do not have an accout?</Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Popover>
  );
  return (
    <>
      <Box onClick={handleClick}>
        {logined ? (
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'cadetblue' }}>
            {userName.length > 3 ? userName.substring(0, 3) : userName}{' '}
          </Avatar>
        ) : (
          <Button>
            <Typography color="white">Sign In</Typography>
          </Button>
        )}
      </Box>
      {popOver}
    </>
  );
}
