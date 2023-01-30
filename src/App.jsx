import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import './App.css';
import { postV2 } from './api/axios/v2';
import ChatBox from './components/ChatBox/ChatBox';
import Header from './components/Header/Header';
import routers from './routes/route';
import { login } from './state/slices/userSlice';

function App() {
  const Routers = useRoutes(routers);
  const dispatch = useDispatch();
  useEffect(() => {
    // const cookieDic = new Map();
    const cookieRefreshToken = cookie.load('refresh-token');
    if (cookieRefreshToken) {
      postV2('auth/relogin', {
        Token: cookieRefreshToken,
      }).then((res) => {
        if (res.data.Success) {
          dispatch(login({ userName: res.data.UserName }));
        } else {
          console.error('API returns success but no username is returned');
        }
      });
    }
  }, []);
  return (
    <Grid container width="100vw" height="100vh" direction="column" sx={{ bgcolor: '#f0f0f0' }}>
      <Grid item sx={{ width: '100vw' }}>
        <Header />
      </Grid>
      <Grid item flex={1}>
        <Grid container sx={{ height: '100%' }}>
          {/* for side Nav Bar */}
          {/* <Grid item xs={1}></Grid> */}
          {/* for content */}
          <Grid item xs={12} sx={{ width: '100%', height: '100%' }}>
            {Routers}
          </Grid>
          <ChatBox />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
