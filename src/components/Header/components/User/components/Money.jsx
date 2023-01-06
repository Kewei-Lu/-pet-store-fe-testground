import { Button, Typography, Modal, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "../../../../../api/axios";
import Wallet from "../../../../Wallet/Wallet";

export default function Money() {
  const userName = useSelector((state) => state.user.userName);
  const [amount, setAmount] = useState("NaN");
  const [showWalletModal, setShowWalletMoadl] = useState(false);
  useEffect(() => {
    get("money", { UserName: userName }).then((res) => {
      console.log("res :>> ", res);
      setAmount(res.data.Amount);
    });
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
