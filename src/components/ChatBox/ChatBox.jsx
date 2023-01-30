import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Grid, Popover, SpeedDialIcon, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Input from './Components/Input/Input';

export default function ChatBox() {
  const ws = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [messageBox, setMessageBox] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const userName = useSelector((state) => state.user.userName);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    ws.current = new WebSocket('ws://10.67.103.83:8000/wschat');
    console.log('connection established :>> ');
    ws.current.onopen = () => {
      console.log('userinfo', {
        SenderName: userName,
        // TODO
        Msg: 'I am an valid user',
        SendTime: Date.now(),
        ReceiverName: '@ALL',
        Type: 1,
      });
      ws.current.send(
        JSON.stringify({
          SenderName: userName,
          // TODO
          Msg: 'I am an valid user',
          SendTime: Date.now(),
          ReceiverName: '@ALL',
          Type: 1,
        }),
      );
    };
    ws.current.onmessage = (e) => {
      setNewMsg(e.data);
    };
    return () => {
      ws.current?.close();
    };
  }, [userName]);
  useEffect(() => {
    if (newMsg) {
      console.log('receive new msg :>> ', newMsg);
      const Msg = JSON.parse(newMsg);
      const newMsgBox = [...messageBox, Msg];
      setNewMsg(null);
      setMessageBox(newMsgBox);
    }
  }, [newMsg]);

  const sendMsgCb = (marshalledData) => {
    ws.current.send(marshalledData);
  };

  return (
    <>
      <PersonIcon
        sx={{
          position: 'fixed',
          bgcolor: 'cyan',
          bottom: 16,
          right: 16,
        }}
        onClick={handleClick}
      />
      <Box
        sx={{
          height: 320,
          transform: 'translateZ(0px)',
          flexGrow: 1,
          position: 'float',
        }}
      >
        <Popover
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={() => {
            setAnchorEl(null);
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
        >
          <Box sx={{ height: '600px', width: '400px' }}>
            <header>Messages</header>
            <Grid container rowSpacing={3} sx={{ mt: 4 }}>
              {[...messageBox].map((msgStruct) => {
                const d = new Date(msgStruct.SendTime);
                return (
                  <Grid item key={msgStruct.UUID}>
                    <Grid container>
                      <Grid item>
                        <Avatar sx={{ mr: 'auto', width: '35px', height: '35px' }}>
                          {msgStruct.SenderName.length > 3
                            ? msgStruct.SenderName.substring(0, 3)
                            : msgStruct.SenderName}
                        </Avatar>
                      </Grid>
                      <Grid item sx={{ ml: 2 }}>
                        <Typography sx={{ display: 'inline' }}> {msgStruct.SenderName}</Typography>
                        <Typography sx={{ display: 'inline', ml: 3 }}>
                          {new Intl.DateTimeFormat('en', {
                            dateStyle: 'medium',
                            timeStyle: 'medium',
                          }).format(d)}
                          {/* {msgStruct.SendTime} */}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography inline sx={{ ml: 3 }}>
                          {msgStruct.Msg}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            <Input sendMsgCb={sendMsgCb} />
          </Box>
        </Popover>
      </Box>
    </>
  );
}
