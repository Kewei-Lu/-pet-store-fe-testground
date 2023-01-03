import React, { useState, useRef } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Popover,
  SpeedDialIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
export default function ChatBox() {
  const ws = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [messageBox, setMessageBox] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    ws.current = new WebSocket("ws://10.67.103.83:7070");
    ws.current.onmessage = (e) => {
      setNewMsg(e.data);
    };
    return () => {
      ws.current?.close();
    };
  }, []);
  useEffect(() => {
    const newMsgBox = [...messageBox, newMsg];
    setNewMsg("");
    setMessageBox(newMsgBox);
  }, [newMsg]);

  return (
    <React.Fragment>
      <PersonIcon
        sx={{ position: "fixed", bgcolor: "cyan", bottom: 16, right: 16 }}
        onClick={handleClick}
      />
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "float",
        }}
      >
        <Popover
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={() => {
            setAnchorEl(null);
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
        >
          <Box sx={{ height: "600px", width: "400px" }}>
            <header>Messages</header>
            {[...messageBox].map((msg) => (
              <Typography key={msg}>{msg}</Typography>
            ))}
          </Box>
        </Popover>
      </Box>
    </React.Fragment>
  );
}
