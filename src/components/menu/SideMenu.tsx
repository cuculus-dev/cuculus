'use client';

import { styled } from '@mui/material';
import MenuItem from '@/components/menu/MenuItem';
import { Home, Mail, Notifications, Search } from '@mui/icons-material';

const Root = styled('div')`
  width: 275px;
  padding: 0 8px;
  margin-left: auto;
`;

const StyledMenu = styled('nav')`
  // TODO デスクトップは左、大きい(メニューラベルが表示)
  // TODO ラップトップは左、小さい(メニューラベル非表示)
  // TODO モバイルは下に移動する(普通に非表示にしたほうが楽かも？)
  // デスクトップ
  display: flex;
  position: fixed;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('desktop')} {
    // ラップトップ
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    // タブレット
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    // モバイル
    flex-direction: row;
    bottom: 0;
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
