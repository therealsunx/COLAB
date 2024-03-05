import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { SocketContext } from './Context';

// Import clipboard.js
import ClipboardJS from 'clipboard';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px 20px',
  border: '2px solid black',
  position: 'bottom',
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const containerWidth = '300px';

  // Create a ref for the button element
  const copyButtonRef = useRef(null);

  useEffect(() => {
    // Initialize clipboard.js instance on component mount
    const clipboard = new ClipboardJS(copyButtonRef.current);

    // Handle successful copy event
    clipboard.on('success', () => {
      console.log('ID copied to clipboard!');
      // Optionally display a success message here
    });

    // Cleanup on component unmount
    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <Container maxWidth={containerWidth}>
      <StyledPaper elevation={0}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Assignment fontSize="large" />}
                ref={copyButtonRef}
                data-clipboard-text={me}
              >
                Copy Your ID
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </StyledPaper>
    </Container>
  );
};

export default Sidebar;
