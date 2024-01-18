'use client';

import Editor from '@/pages/_components/post/elements/Editor';
import { useProfile } from '@/swr/client/auth';
import { Avatar, Box, styled } from '@mui/material';

// FIXME: レイアウト
//        Textareaの高さの調整が厄介っぽいのでスマホはスタイルじゃなくて別コンポーネントで用意する方がいいかも？

const Flex = styled(Box)`
  display: flex;
`;

const VFlex = styled(Flex)`
  flex-direction: column;
`;

const Wrapper = styled(VFlex)`
  height: 100%;
  min-height: auto;

  width: 600px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    width: 450px;
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`;

const HFlex = styled(Flex)`
  flex-direction: row;
  height: 100%;
`;

const Spacer = styled(Box)<{ size?: number | string }>(({ size }) => {
  return {
    margin: size ?? 'auto',
  };
});

interface Props {
  getContent: string;
  setContent: (content: string) => void;
  focusEditor?: boolean;
}

export default function PostForm({
  getContent,
  setContent,
  focusEditor,
}: Props) {
  const { data: profile } = useProfile();

  return (
    <Wrapper>
      <HFlex>
        <Avatar src={profile?.profileImageUrl ?? '/icons/icon.png'} />

        <Spacer width={'1em'} />

        <Editor
          getContent={getContent}
          setContent={setContent}
          minRows={2}
          focusEditor={focusEditor}
        />
      </HFlex>

      <Spacer height={'1em'} />
    </Wrapper>
  );
}
