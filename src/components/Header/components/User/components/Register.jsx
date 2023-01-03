import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Grid, Card, CardContent, CardHeader } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { get, post } from "../../../../../api/axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data) => {
    try {
      var res = await post("user/register", {
        userName: data.userName,
        passWord: data.passWord,
      });
      alert("Success in registering");
    } catch (res) {
      console.log("res", JSON.stringify(res.response.data));
      alert(`error :>> ${JSON.stringify(res.response.data)}`);
    }
  };
  return (
    <Card sx={{ border: "none" }} variant="outlined">
      <Grid container>
        <Grid item>
          <CardHeader title="Register"></CardHeader>
        </Grid>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Grid item xs={12}>
            <CardContent sx={{ pt: 0, pb: 0 }}>
              <Controller
                name="userName"
                control={control}
                rules={{ required: "UserName is required" }}
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
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}
