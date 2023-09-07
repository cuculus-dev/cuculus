'use client';

import { IconButton } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

type Props = {
  count: number;
};
export default function ReplyButton({ count }: Props) {
  return (
    <div aria-label={`${count}件の返信。返信する`}>
      <IconButton
        color="more"
        aria-label="リプライ"
        onClick={(event) => event.stopPropagation()}
      >
        <ChatBubbleOutline />
      </IconButton>
    </div>
  );
}
