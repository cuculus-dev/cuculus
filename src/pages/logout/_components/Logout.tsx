'use client';

import { Button, Dialog, styled } from '@mui/material';
import CapsuleButton from '@/pages/_components/button/CapsuleButton';
import { useRouter } from 'next/navigation';
import { useSignOut } from '@/swr/client/auth';

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
  const { trigger, isMutating } = useSignOut();

  return (
    <>
      <Dialog open={true}>
        <Container>
          <h2>ログアウトの確認</h2>
          <span>本当にログアウトしますか？</span>
          <CapsuleButton
            disabled={isMutating}
            color={'primary'}
            variant="contained"
            onClick={() => {
              void trigger().then(() => {
                router.push('/');
              });
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
