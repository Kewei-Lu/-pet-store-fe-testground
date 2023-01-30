import { Box, Button, Grid, Modal, Tab, Tabs, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { postV2 } from '../../api/axios/v2';

export default function TransformFund() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const userName = useSelector((state) => state.user.userName);
  console.log('errors: ', errors);

  const handleTransfer = async (data) => {
    try {
      await postV2(
        `money/transfer?from=${data.sender}&to=${data.receiver}&amount=${data.amount * 1000}`,
        {},
      );
      alert('success');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleTransfer)}>
      <Grid container sx={{ ml: 2 }} rowSpacing={3}>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Controller
            name="sender"
            control={control}
            defaultValue={userName}
            render={({ field }) => (
              <TextField
                {...field}
                // disabled
                defaultValue={userName}
                FormHelperTextProps={{ sx: { display: 'inline' } }}
                label="Sender"
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="receiver"
            control={control}
            rules={{ required: 'Receiver is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.receiver?.message)}
                label="Receiver"
                helperText={errors.receiver?.message ? errors.receiver.message : null}
                variant="standard"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Amount is required',
              pattern: {
                value: /^[1-9]+[0-9]*/i,
                message: 'the amount should follow: ^[1-9]+[0-9]*',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.amount?.message)}
                label="Amount"
                variant="standard"
                helperText={errors.amount?.message ? errors.amount.message : null}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ ml: 'auto', display: 'block' }} type="submit">
            Confirm
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
