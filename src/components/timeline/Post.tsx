'use client';

import { Avatar, styled } from '@mui/material';

const Article = styled('article')`
  padding: 0 16px;
  border-bottom: 1px solid rgb(239, 243, 244);
  max-width: 600px;
`;

const Original = styled('div')`
  padding: 12px 0;
  display: flex;
  gap: 10px;
`;

const Content = styled('div')`
  flex: 1;
`;

const Header = styled('div')`
  display: flex;
  margin-bottom: 5px;
  gap: 4px;
`;

const DisplayName = styled('span')`
  font-weight: bold;
`;

const UserName = styled('span')`
  color: #8899a6;
`;

const Text = styled('div')`
  white-space: pre-wrap;
`;

const Footer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  displayName: string;
  userName: string;
  profileImageUrl: string;
  text: string;
  postedAt: Date;
};

export default function Post({
  displayName,
  userName,
  profileImageUrl,
  text,
  postedAt,
}: Props) {
  return (
    <div>
      <Article>
        {/*<div>〇〇さんがリポストしました。</div>*/}
        <Original>
          <Avatar sx={{ backgroundColor: '' }}>TODO</Avatar>
          <Content>
            <Header>
              <DisplayName>{displayName}</DisplayName>
              <UserName>@{userName}</UserName>
              <UserName>·</UserName>
              <UserName>1分前</UserName>
            </Header>
            <Text>{text}</Text>
            <Footer>
              <div>返信</div>
              <div>リポスト</div>
              <div>ふぁぼ</div>
            </Footer>
          </Content>
        </Original>
      </Article>
    </div>
  );
}
