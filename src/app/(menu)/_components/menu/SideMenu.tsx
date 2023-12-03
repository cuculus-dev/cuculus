'use client';

import { Box, styled } from '@mui/material';
import {
  Home,
  HomeOutlined,
  Notifications,
  NotificationsOutlined,
  PersonAddAlt1,
  PersonAddAlt1Outlined,
  Search,
  SearchOutlined,
  Settings,
  SettingsOutlined,
} from '@mui/icons-material';
import SideMenuAccountButton from '@/app/(menu)/_components/menu/elements/SideMenuAccountButton';
import SideMenuPostButton from '@/app/(menu)/_components/menu/elements/SideMenuPostButton';
import SideMenuLinkItem from '@/app/(menu)/_components/menu/elements/SideMenuLinkItem';
import { useProfile } from '@/swr/client/auth';
import LogoLink from '@/app/(menu)/_components/menu/elements/LogoLink';

const Root = styled('div')`
  // Desktop
  margin-left: auto;
  padding: 0 8px;
  width: 275px;
  background-color: ${({ theme }) => theme.palette.background.paper};

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

const SideMenu = () => {
  const { data: profile } = useProfile();

  return (
    <Root>
      <StyledMenu>
        <LogoLink />
        <SideMenuLinkItem
          href={'/home'}
          icon={<HomeOutlined />}
          activeIcon={<Home />}
          label={'ホーム'}
        />
        <SideMenuLinkItem
          href={'/search'}
          icon={<SearchOutlined />}
          activeIcon={<Search />}
          label={'検索'}
        />
        {profile && (
          <>
            <SideMenuLinkItem
              href={'/notifications'}
              icon={<NotificationsOutlined />}
              activeIcon={<Notifications />}
              label={'通知'}
            />
            <SideMenuLinkItem
              href={'/invitations'}
              icon={<PersonAddAlt1Outlined />}
              activeIcon={<PersonAddAlt1 />}
              label={'招待コード'}
            />
            <SideMenuLinkItem
              href={'/settings'}
              icon={<SettingsOutlined />}
              activeIcon={<Settings />}
              label={'設定'}
            />
          </>
        )}
        {profile && <SideMenuPostButton />}
        <Spacer />
        {profile && (
          <SideMenuAccountButton
            profileAvatarImageUrl={profile.profileImageUrl}
            displayName={profile.name}
            userName={profile.username}
          />
        )}
      </StyledMenu>
    </Root>
  );
};
export default SideMenu;
