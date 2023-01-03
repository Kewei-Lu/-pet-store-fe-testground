import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "../../../../../api/axios";

export default function Money() {
  const userName = useSelector((state) => state.user.userName);
  const [amount, setAmount] = useState("NaN");
  useEffect(() => {
    get("money", { UserName: userName }).then((res) => {
      console.log("res :>> ", res);
      setAmount(res.data.Amount);
    });
  }, []);

  return <Typography>Money: {amount / 1000}</Typography>;
}
