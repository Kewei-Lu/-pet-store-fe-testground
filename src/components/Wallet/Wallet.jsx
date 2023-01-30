import { Box, Button, Grid, Modal, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

import AddFundForm from './AddFundForm';
import TransformFund from './TransformFund';

export default function Wallet(props) {
  const { open, closeCb } = props;
  const [selectedTab, setSelectedTab] = useState(1);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const renderSwitchTab = () => {
    switch (selectedTab) {
      case 1:
        return <AddFundForm />;
      case 2:
        return <TransformFund />;
      default:
        return null;
    }
  };
  return (
    <Modal open={open} onClose={closeCb}>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              My Wallet
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Tabs
              sx={{ mt: 3 }}
              value={selectedTab}
              onChange={(event, newValue) => {
                setSelectedTab(newValue);
              }}
              aria-label="lab API tabs example"
            >
              <Tab label="Add Fund" value={1} />
              <Tab label="Transfer" value={2} />
            </Tabs>
          </Grid>
          <Grid item flex={1}>
            {renderSwitchTab()}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
