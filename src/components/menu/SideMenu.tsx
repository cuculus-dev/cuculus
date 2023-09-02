'use client';

import { styled } from '@mui/material';

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
    <div>
      <StyledMenu>
        <div>ホーム</div>
        <div>検索</div>
        <div>通知</div>
        <div>DM</div>
      </StyledMenu>
    </div>
  );
};
export default SideMenu;
