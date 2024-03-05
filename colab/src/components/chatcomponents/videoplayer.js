import React, { useContext } from 'react';
import { Grid, Typography, Paper, styled } from '@mui/material';
import { SocketContext } from './Context';

// Using styled-components for custom styles
const StyledVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, calls } = useContext(SocketContext);

  return (
    <Grid container justifyContent="center">
      <style jsx>
        {`
          #video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 25px);
            grid-auto-rows: 25px;
          }

          video {
            width: 800%;
            height: 80%;
            object-fit: cover;
          }
        `}
      </style>
      <Grid container id="video-grid" spacing={2}>
        {stream && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '10px', border: '2px solid black' }}>
              <Typography variant="h5" gutterBottom>{name}</Typography>
              <StyledVideo playsInline muted ref={myVideo} autoPlay />
            </Paper>
          </Grid>
        )}
        {callAccepted && !callEnded && calls?.map((call) => (
          <Grid item xs={12} md={6} key={call.name}>
            <Paper sx={{ padding: '10px', border: '2px solid black' }}>
              <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
              <StyledVideo playsInline ref={userVideo} autoPlay />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
