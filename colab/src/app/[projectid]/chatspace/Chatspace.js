import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';

import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Notifications from './components/Notifications';

// Using styled components for custom styles
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

const Chatspace = () => {
  return (
    <Wrapper>
      <AppBar className="appBar" position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </Wrapper>
  );
};

export default Chatspace;
