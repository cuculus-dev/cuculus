'use client';

import { Box, styled, useTheme } from '@mui/material';
import { Home, Notifications, Search, Settings } from '@mui/icons-material';
import SideMenuAccountButton from '@/components/menu/atoms/SideMenuAccountButton';
import SideMenuPostButton from '@/components/menu/atoms/SideMenuPostButton';
import SideMenuLinkItem from '@/components/menu/atoms/SideMenuLinkItem';

const Root = styled('div')`
  // Desktop
  margin-left: auto;
  padding: 0 8px;
  width: 275px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    margin-left: 0.25rem;
    width: 72px;
  }
`;

const StyledMenu = styled('nav')`
  // TODO モバイルは下に移動する(普通に非表示にしたほうが楽かも？)
  // デスクトップ
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 1rem 0;
  position: fixed;
  width: 259px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    // ラップトップ
    width: 56px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    // タブレット
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    // モバイル
    display: none;
  }
`;

const Spacer = styled(Box)<{ size?: number | string }>(({ size }) => {
  return {
    margin: size ?? 'auto',
  };
});

// FIXME
const userName = 'cuculus';
const displayName = '11111111112222222222333333333344444444445555555555'; // 50文字
const profileAvatarImageUrl = '/mock/profileAvatarImage.png';

// FIXME 引数にprops受け取る
const SideMenu = () => {
  const theme = useTheme();

  // FIXME
  const Logo = styled('h1')`
    text-align: center;
    &::after {
      content: 'Cuculus';
      ${({ theme }) => theme.breakpoints.down('desktop')} {
        content: 'C';
      }
    }
    margin-top: 5px;
    margin-bottom: 5px;
  `;

  return (
    <Root>
      <StyledMenu>
        <SideMenuPostButton userId={0} />

        <Spacer
          size={'1rem'}
          sx={{
            [theme.breakpoints.down('desktop')]: {
              display: 'none',
            },
          }}
        />

        <SideMenuLinkItem href={'/home'} icon={<Home />} label={'ホーム'} />
        <SideMenuLinkItem href={'/search'} icon={<Search />} label={'検索'} />
        <SideMenuLinkItem
          href={'/notifications'}
          icon={<Notifications />}
          label={'通知'}
        />
        <SideMenuLinkItem
          href={'/settings'}
          icon={<Settings />}
          label={'設定'}
        />

        <Spacer />

        <SideMenuAccountButton
          profileAvatarImageUrl={profileAvatarImageUrl}
          displayName={displayName}
          userName={userName}
        />

        <Logo />
      </StyledMenu>
    </Root>
  );
};
export default SideMenu;
