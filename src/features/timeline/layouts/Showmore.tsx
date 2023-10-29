import { CardActionArea, styled } from '@mui/material';

const Article = styled('article')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};
  max-width: 640px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: rgba(0, 0, 0, 0.87);
`;

const Content = styled('div')`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export default function Showmore({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <Article>
      <CardActionArea component={'div'} onClick={onClick} disableRipple>
        <Content aria-label={text}>
          <span>{text}</span>
        </Content>
      </CardActionArea>
    </Article>
  );
}
