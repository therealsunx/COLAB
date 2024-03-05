'use client';

import React, {useState,useEffect} from 'react';
import { Typography, AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChatSideBar from '@/src/components/chatcomponents/sidebar';
import Notifications from '@/src/components/chatcomponents/notification';
import VideoPlayer from '@/src/components/chatcomponents/videoplayer';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useProject } from "@/src/components/ProjectContext";




const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height:'100vh',
  alignItems: 'center',
  width: '100%',
}));

const SidebarWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  
}));


const Chatspace = () => {
  // const { project } = useProject();
  const { project } = useProject();

  // Fetch data when project changes (if needed)
  const fetchData = async () => {
    if (!project) return;
    await listMembersAndManagers(project.id); // Call the function to fetch data
  };
  
  return (
    <Wrapper>
      <VideoPlayer />
      <SidebarWrapper>
      <ChatSideBar>
        <Notifications />
      </ChatSideBar>
      </SidebarWrapper>
    </Wrapper>
  );
};

export default Chatspace;
