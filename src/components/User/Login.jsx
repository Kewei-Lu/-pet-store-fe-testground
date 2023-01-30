import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { postV1 } from '../../api/axios/v1';
import { login } from '../../state/slices/userSlice';
import intel from './thirdPartyIcon/intel.png';
import IntelLogin from './thirdPartyLogin/Intel/IntelLogin';

export default function Login() {
  const dispatch = useDispatch();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showIntelLogin, setShowIntelLogin] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const passWord = watch('passWord');
  const handleLogin = async (data) => {
    console.log('object :>> ', data);
    try {
      await postV1('user/login', {
        userName: data.userName,
        passWord: data.passWord,
      });
      alert(`Welcome back ${data.userName}`);
      dispatch(login({ userName: data.userName }));
    } catch (error) {
      alert(`error :>> ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      <Card sx={{ border: 'none' }} variant="outlined">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <CardHeader title="Login" />
          </Grid>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Grid item xs={12}>
              <CardContent sx={{ pt: 0, pb: 0 }}>
                <Controller
                  defaultValue=""
                  name="userName"
                  control={control}
                  rules={{ required: 'UserName is required' }}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: '220px' }}
                      {...field}
                      error={Boolean(errors.userName?.message)}
                      label="UserName"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                        endAdornment: <Icon />,
                      }}
                      variant="standard"
                    />
                  )}
                />
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardContent sx={{ pt: 0 }}>
                <Controller
                  defaultValue=""
                  name="passWord"
                  control={control}
                  rules={{ required: 'PassWord is required' }}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: '220px' }}
                      {...field}
                      id="input-with-icon-textfield"
                      label="PassWord"
                      error={Boolean(errors.userName?.message)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                        endAdornment: passWord ? (
                          showPassWord ? (
                            <IconButton
                              sx={{ p: 0 }}
                              onClick={() => {
                                setShowPassWord(false);
                              }}
                            >
                              <VisibilityOffOutlinedIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              sx={{ p: 0, textAlign: 'center' }}
                              onClick={() => {
                                setShowPassWord(true);
                              }}
                            >
                              <VisibilityOutlinedIcon />
                            </IconButton>
                          )
                        ) : (
                          <Icon />
                        ),
                        type: showPassWord ? 'text' : 'password',
                      }}
                      variant="standard"
                    />
                  )}
                />
              </CardContent>
            </Grid>
            <Grid item textAlign="center">
              <Button size="large" type="submit">
                Login
              </Button>
            </Grid>
          </form>
          <Grid item sx={{ mt: 2 }}>
            <Typography sx={{ ml: 2, fontSize: '0.75rem', color: 'gray' }}>
              Login from third party
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <IconButton>
              <Box
                component="img"
                src={intel}
                onClick={() => {
                  setShowIntelLogin(true);
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      <IntelLogin
        open={showIntelLogin}
        handleClose={() => {
          setShowIntelLogin(false);
        }}
      />
    </>
  );
}
