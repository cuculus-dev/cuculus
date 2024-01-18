'use client';

import { Avatar, styled } from '@mui/material';

const UserIcon = styled(Avatar)`
  width: 120px;
  height: 120px;

  margin-top: -80px;
  border-color: ${({ theme }) => theme.palette.background.paper};
  border-style: solid;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 92px;
    height: 92px;
    margin-top: -61px;
  }
`;

export default UserIcon;
