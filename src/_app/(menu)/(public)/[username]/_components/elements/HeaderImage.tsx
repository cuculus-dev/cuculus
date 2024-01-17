'use client';

import { styled } from '@mui/material';

const HeaderImage = styled('div')<{
  image?: string;
}>`
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  aspect-ratio: 3 / 1;
  background-color: ${({ theme }) => theme.palette.primary.light};
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
`;

export default HeaderImage;
