'use client';

import {
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  styled,
} from '@mui/material';
import { useInvitationCreate, useInvitations } from '@/swr/client/invitations';
import { useEffect, useState } from 'react';
import { Invitation } from '@cuculus/cuculus-api/dist/models/Invitation';
import Loading from '@/app/(menu)/_components/main/Loading';
import { ContentCopy } from '@mui/icons-material';
import LoadingButton from '@/app/_components/button/LoadingButton';

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Title = styled('h2')`
  font-size: 20px;
`;

const Text = styled('div')`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 16px;
`;

const StyledItem = styled(ListItem)`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export default function Invitations() {
  const { data, mutate } = useInvitations();
  const { trigger, isMutating } = useInvitationCreate();
  const [invitations, setInvitations] = useState<Array<Invitation>>([]);
  const [succeedMessage, setSucceedMessage] = useState('');

  useEffect(() => {
    if (data) {
      // コピーを作成
      const invitations = [...data.invitations];
      invitations.sort((a, b) => {
        // aまたはbのusedAtがundefinedの場合、それらを先頭に移動
        if (a.usedAt === undefined) return -1;
        if (b.usedAt === undefined) return 1;

        // 両方のdateが定義されている場合は、通常通り比較
        return b.usedAt.getTime() - a.usedAt.getTime();
      });
      setInvitations(invitations);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  const handleClick = () => {
    void trigger().then(() => void mutate());
  };

  return (
    <Root>
      <Title>招待コード</Title>
      <Text>あと{data.remainingInvitations}件の招待コードが発行可能です。</Text>
      <div style={{ marginBottom: '16px' }}>
        <LoadingButton
          variant="contained"
          disabled={data.remainingInvitations <= 0}
          onClick={handleClick}
          loading={isMutating}
        >
          発行する
        </LoadingButton>
      </div>
      <List>
        {invitations.map((invitation) => (
          <StyledItem
            key={invitation.code}
            disablePadding
            secondaryAction={
              invitation.usedAt ? undefined : (
                <IconButton
                  edge="end"
                  aria-label="copy"
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(invitation.code)
                      .then(() => {
                        setSucceedMessage('コピーしました！');
                      });
                  }}
                >
                  <ContentCopy />
                </IconButton>
              )
            }
          >
            <ListItemText
              primary={
                invitation.usedAt ? <s>{invitation.code}</s> : invitation.code
              }
            />
          </StyledItem>
        ))}
      </List>
      <Snackbar
        open={succeedMessage.length > 0}
        onClose={() => setSucceedMessage('')}
        autoHideDuration={2_000}
      >
        <Alert severity="success">{succeedMessage}</Alert>
      </Snackbar>
    </Root>
  );
}
