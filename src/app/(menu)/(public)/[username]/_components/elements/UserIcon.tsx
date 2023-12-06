'use client';

import { Avatar, styled } from '@mui/material';

const UserIcon = styled(Avatar)`
  width: 120px;
  height: 120px;

  margin-top: -80px;
  border-color: ${({ theme }) => theme.palette.background.paper};
  border-style: solid;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 80px;
    height: 80px;
    margin-top: -48px;
  }
`;

export default UserIcon;
