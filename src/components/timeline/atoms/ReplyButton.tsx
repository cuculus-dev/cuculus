'use client';

import { IconButton, styled } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

const StyledButton = styled(IconButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.more.main};
  }
`;

type Props = {
  count: number;
};
export default function ReplyButton({ count }: Props) {
  return (
    <div aria-label={`${count}件の返信。返信する`}>
      <StyledButton
        aria-label="リプライ"
        onClick={(event) => event.stopPropagation()}
      >
        <ChatBubbleOutline />
      </StyledButton>
    </div>
  );
}
