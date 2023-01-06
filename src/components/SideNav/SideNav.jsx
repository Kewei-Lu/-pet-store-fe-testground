import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function SideNav(props) {
  const navigate = useNavigate();
  const { show, anchor, setShow } = props;
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["NSWE PET STORE", "ADD", "BUY"].map((text) => (
          <ListItem disablePadding key={text}>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding key="ABOUT ME">
          <ListItemButton>
            <ListItemText
              primary={"ABOUT ME"}
              onClick={() => {
                navigate("/account");
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding key="ABOUT US">
          <ListItemButton>
            <ListItemText
              primary={"ABOUT US"}
              onClick={() => {
                navigate("/index");
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        anchor={anchor}
        open={show}
        onClose={() => {
          setShow(false);
        }}
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
}
