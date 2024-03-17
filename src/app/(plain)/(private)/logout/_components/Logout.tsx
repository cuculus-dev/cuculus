'use client';

import { Button, Dialog, styled } from '@mui/material';
import CapsuleButton from '@/app/_components/button/CapsuleButton';
import { useRouter } from 'next/navigation';
import { useSignOut } from '@/react-query/client/auth';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;
  min-width: 400px;
  text-align: center;
`;

export default function Logout() {
  const router = useRouter();
  const { mutate, isPending } = useSignOut(() => {
    router.push('/');
  });

  return (
    <>
      <Dialog open={true}>
        <Container>
          <h2>ログアウトの確認</h2>
          <span>本当にログアウトしますか？</span>
          <CapsuleButton
            disabled={isPending}
            color={'primary'}
            variant="contained"
            onClick={() => {
              mutate();
            }}
          >
            ログアウト
          </CapsuleButton>
          <Button
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            戻る
          </Button>
        </Container>
      </Dialog>
    </>
  );
}
