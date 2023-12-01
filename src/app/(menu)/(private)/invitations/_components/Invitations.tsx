'use client';

import { styled } from '@mui/material';
import { useInvitations } from '@/swr/client/invitations';
import { useEffect, useState } from 'react';
import { Invitation } from '@cuculus/cuculus-api/dist/models/Invitation';
import Loading from '@/app/(menu)/_components/main/Loading';

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.palette.grey[100]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[100]};
  min-height: 100vh;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    min-height: calc(
      100vh - ${({ theme }) => theme.mixins.bottomMenu.height}px +
        env(safe-area-inset-bottom)
    );
  }
`;

export default function Invitations() {
  const { data } = useInvitations();
  const [invitations, setInvitations] = useState<Array<Invitation>>([]);

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

  // TODO 仮実装
  return (
    <Root>
      <span>あと{data.remainingInvitations}件発行可能</span>
      {invitations.map((invitation) => (
        <div key={invitation.code}>{JSON.stringify(invitation)}</div>
      ))}
    </Root>
  );
}
