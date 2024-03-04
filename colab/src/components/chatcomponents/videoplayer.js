import React, { useContext } from 'react';
import { Grid, Typography, Paper, styled } from '@mui/material';
import { SocketContext } from './Context';

// Using styled-components for custom styles
const StyledVideo = styled('video')(({ theme }) => ({
  width: '550px',
  [theme.breakpoints.down('xs')]: {
    width: '300px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid container justifyContent="center" sx={{ flexDirection: 'column', xs: 1 }}>
      {stream && (
        <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <StyledVideo playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper sx={{ padding: '10px', border: '2px solid black', margin: '10px' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <StyledVideo playsInline ref={userVideo} autoPlay />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
