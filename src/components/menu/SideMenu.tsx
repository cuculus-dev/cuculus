'use client';

import { styled } from '@mui/material';
import MenuItem from '@/components/menu/MenuItem';
import { Home, Mail, Notifications, Search } from '@mui/icons-material';

const Root = styled('div')`
  // Desktop
  padding: 0 8px;
  margin-left: auto;
  width: 275px;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    width: 72px;
  }
`;

const StyledMenu = styled('nav')`
  // TODO デスクトップは左、大きい(メニューラベルが表示)
  // TODO ラップトップは左、小さい(メニューラベル非表示)
  // TODO モバイルは下に移動する(普通に非表示にしたほうが楽かも？)
  // デスクトップ
  display: flex;
  position: fixed;
  flex-direction: column;
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

const SideMenu = () => {
  return (
    <Root>
      <StyledMenu>
        <MenuItem href={'/home'} icon={<Home />} label={'ホーム'} />
        <MenuItem href={'/search'} icon={<Search />} label={'検索'} />
        <MenuItem
          href={'/notifications'}
          icon={<Notifications />}
          label={'通知'}
        />
        <MenuItem href={'/messages'} icon={<Mail />} label={'メッセージ'} />
      </StyledMenu>
    </Root>
  );
};
export default SideMenu;
