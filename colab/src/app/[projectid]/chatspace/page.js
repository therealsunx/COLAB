'use client';

import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatSideBar from '@/src/components/chatcomponents/sidebar';
import Notifications from '@/src/components/chatcomponents/notification';
import VideoPlayer from '@/src/components/chatcomponents/videoplayer';


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
      <ChatSideBar>
        <Notifications />
      </ChatSideBar>
    </Wrapper>
  );
};

export default Chatspace;
