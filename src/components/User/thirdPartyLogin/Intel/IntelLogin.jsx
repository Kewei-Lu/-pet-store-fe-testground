import { Password } from '@mui/icons-material';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';

import { postV1 } from '../../../../api/axios/v1';
import { login } from '../../../../state/slices/userSlice';

export default function IntelLogin(props) {
  const dispatch = useDispatch();
  const { open, handleClose } = props;
  const [passWord, setPassWord] = useState('');
  const [agree, setAgree] = useState(false);
  const idsid = cookie.load('IDSID');
  const wwid = cookie.load('WWID');
  const handleThirdPartyLogin = async () => {
    try {
      await postV1('user/register', {
        userName: idsid,
        passWord: passWord,
      });
      alert('registering success');
      await postV1('user/login', {
        userName: idsid,
        passWord: passWord,
      });
      alert(`Welcome back ${idsid}`);
      dispatch(login({ userName: idsid }));
    } catch (err) {
      alert(err);
    }
  };
  if (idsid && wwid) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login From Intel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1">{`Hi ${idsid} (WWID: ${wwid}):`}</Typography>
            <Typography variant="body1"> Do you want to sign up as Intel member?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {agree ? (
            <Button
              sx={{ mr: 2 }}
              onClick={() => {
                setAgree(false);
              }}
            >
              Go Back
            </Button>
          ) : (
            <>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={() => {
                  setAgree(true);
                }}
              >
                Agree
              </Button>
            </>
          )}
        </DialogActions>

        {agree ? (
          <DialogContent>
            <DialogContentText>
              <Typography> Set Your PassWord:</Typography>
            </DialogContentText>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mt: 2 }}
            >
              <InputBase
                type="password"
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
                maxRows={3}
                sx={{
                  width: '100%',
                  height: '100%',
                  ml: 1,
                }}
              />
            </Paper>
            {Password ? (
              <Button
                sx={{ mt: 2, mr: 0, ml: 'auto', display: 'block' }}
                onClick={handleThirdPartyLogin}
              >
                Submit
              </Button>
            ) : null}
          </DialogContent>
        ) : null}
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Alert severity="info">Seems you have no records in login with Intel</Alert>
    </Dialog>
  );
}
