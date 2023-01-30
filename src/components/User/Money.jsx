import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getV2 } from '../../api/axios/v2';
import Wallet from '../Wallet/Wallet';

export default function Money() {
  const userName = useSelector((state) => state.user.userName);
  const [amount, setAmount] = useState('NaN');
  const [showWalletModal, setShowWalletMoadl] = useState(false);
  useEffect(() => {
    getV2('money', { UserName: userName }).then((res) => {
      console.log('res :>> ', res);
      setAmount(res.data.Amount);
    });
  }, []);

  return (
    <>
      <Typography display="inline">Money: {amount / 1000}</Typography>
      <Button
        sx={{ ml: 2 }}
        onClick={() => {
          setShowWalletMoadl(true);
        }}
      >
        Transfer
      </Button>
      <Wallet
        open={showWalletModal}
        closeCb={() => {
          setShowWalletMoadl(false);
        }}
      />
    </>
  );
}
