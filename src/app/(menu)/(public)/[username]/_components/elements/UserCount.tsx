import Link from 'next/link';
import { styled } from '@mui/material';

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default function UserCount({
  label,
  href,
  num,
}: {
  label: string;
  href: string;
  num: number;
}) {
  return (
    <StyledLink href={href}>
      <span style={{ fontWeight: 'bold' }}>{num.toLocaleString()}</span>
      <span> {label}</span>
    </StyledLink>
  );
}
