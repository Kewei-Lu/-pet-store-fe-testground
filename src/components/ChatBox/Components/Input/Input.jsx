import SendIcon from '@mui/icons-material/Send';
import { Divider, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Input(props) {
  const { sendMsgCb } = props;
  const logined = useSelector((state) => state.user.logined);
  const userName = useSelector((state) => state.user.userName);
  const [currentInput, setCurrentInput] = useState('');
  return (
    <Paper component="form" sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Grid container alignItems="center" textAlign="center">
        <Grid item xs={9}>
          <InputBase
            multiline
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
            maxRows={3}
            sx={{
              width: '100%',
              height: '100%',
              ml: 1,
            }}
            placeholder="Input your message"
          />
        </Grid>
        <Grid item xs={1}>
          <Divider sx={{ height: 28, pt: 'auto', pb: 'auto' }} orientation="vertical" />
        </Grid>
        <Grid item flex={1} sx={{}}>
          <IconButton
            size="small"
            color="primary"
            sx={{ ml: 'auto', p: '10px' }}
            onClick={() => {
              // construct the data structure
              // type ChatMsg struct {
              //   SenderName   string
              //   Msg          string
              //   SendTime     int
              //   ReceiverName string
              //   Type         int
              // }

              const dataStructure = {
                SenderName: userName,
                Msg: currentInput,
                SendTime: Date.now(),
                ReceiverName: '@ALL',
                Type: 2,
              };
              sendMsgCb(JSON.stringify(dataStructure));
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
