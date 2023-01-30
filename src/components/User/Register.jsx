import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { postV1 } from '../../api/axios/v1';

export default function Register() {
  const [showPassWord, setShowPassWord] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    try {
      await postV1('user/register', {
        userName: data.userName,
        passWord: data.passWord,
      });
      alert('Success in registering');
    } catch (error) {
      console.log('res', JSON.stringify(error));
      alert(`error :>> ${JSON.stringify(error)}`);
    }
  };
  const passWord = watch('passWord');
  return (
    <Card sx={{ border: 'none' }} variant="outlined">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <CardHeader title="Register" />
        </Grid>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Grid item xs={12}>
            <CardContent sx={{ pt: 0, pb: 0 }}>
              <Controller
                defaultValue=""
                name="userName"
                control={control}
                rules={{ required: 'UserName is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.userName?.message)}
                    label="UserName"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
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
                      ) : null,
                      type: showPassWord ? 'text' : 'password',
                    }}
                    variant="standard"
                  />
                )}
              />
            </CardContent>
          </Grid>

          <Grid item textAlign="center">
            <Button sx={{ ml: 1 }} type="submit">
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}
