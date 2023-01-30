import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

import { getV1 } from '../../../../api/axios/v1';

export default function TopNav() {
  getV1('hello', {}).then((res) => {
    console.log('res:', res);
  });
  return (
    <Grid container>
      <Grid item xs={2}>
        <Button>
          <Typography color="white">ADD</Typography>
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button>
          <Typography color="white">FIND</Typography>
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button>
          <Typography color="white">ABOUT US</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
