import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import { get, post } from "../../../../../api/axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../../../state/slices/userSlice";
export default function Login() {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data) => {
    console.log("object :>> ", data);
    try {
      var res = await post(
        "user/login",
        {
          userName: data.userName,
          passWord: data.passWord,
        },
        { skipToken: true }
      );
      alert(`Welcome back ${data.userName}`);
      dispatch(login({ userName: data.userName }));
    } catch (res) {
      alert(`error :>> ${JSON.stringify(res.response.data)}`);
    }
  };
  return (
    <Card sx={{ border: "none" }} variant="outlined">
      <Grid container>
        <Grid item>
          <CardHeader title="Login"></CardHeader>
        </Grid>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Grid item xs={12}>
            <CardContent sx={{ pt: 0, pb: 0 }}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: "UserName is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // helperText={
                    //   errors.userName?.message ? errors.userName?.message : null
                    // }
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
                  ></TextField>
                )}
              />
            </CardContent>
          </Grid>
          <Grid item xs={12}>
            <CardContent sx={{ pt: 0 }}>
              <Controller
                name="passWord"
                control={control}
                rules={{ required: "PassWord is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="input-with-icon-textfield"
                    label="PassWord"
                    error={Boolean(errors.userName?.message)}
                    // helperText={
                    //   errors.passWord?.message ? errors.passWord?.message : null
                    // }
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
          <Grid item>
            <Button sx={{ ml: 1 }} type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}
