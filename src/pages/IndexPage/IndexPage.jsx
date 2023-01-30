import { Box, Fade } from '@mui/material';
import React, { useEffect } from 'react';

import petStore1 from './petStore-1.png';
import petStore2 from './petStore-2.jpg';
import petStore3 from './petStore-3.jpg';
import petStore0 from './petStore.jpeg';

export default function IndexPage() {
  const [checked, setChecked] = React.useState(true);
  const currentPicNumber = React.useRef(0);
  const petStorePic = [petStore0, petStore1, petStore2, petStore3];
  useEffect(() => {
    if (checked) {
      setTimeout(() => {
        setChecked(false);
      }, 10000);
    } else {
      setTimeout(() => {
        currentPicNumber.current =
          currentPicNumber.current === 3 ? 0 : currentPicNumber.current + 1;
        setChecked(true);
      }, 4000);
    }
  }, [checked]);
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Fade in={checked} timeout={{ enter: 3000, exit: 3000 }}>
        <Box
          component="img"
          src={petStorePic[currentPicNumber.current]}
          sx={{ maxHeight: `calc(100vh - 50px)`, width: '100%' }}
        />
      </Fade>
    </Box>
  );
}
