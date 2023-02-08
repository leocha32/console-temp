import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styled from '@emotion/styled';
import { CardTitle, Card, Content, ContentWrap } from '$pages/Report/commonStyled';
import { TProductPenetration } from '$modules/report/research';
import { css } from '@emotion/react';

const DiffInfoWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.palettes.gray.GRAY_500};
`;

const dataValueStyle = (theme) => ({
  color: theme.color.primary.PRIMARY_900,
  fontSize: '72px',
  fontWeight: 600,
});

export interface IProductPenetrationRateProps {
  data: TProductPenetration[];
}
export const ProductPenetrationRate = ({ data }: IProductPenetrationRateProps) => {
  const { productPenetrationValue } = data[0] || {};
  return (
    <Card
      css={css`
        height: 30%;
      `}
    >
      <CardTitle>제품 보급률</CardTitle>
      <ContentWrap>
        <Content
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div css={dataValueStyle}>{productPenetrationValue || 0}%</div>
          <DiffInfoWrap>
            <InfoIcon sx={{ fontSize: 15 }} />
            제품이 보급된 가구/전체 가구 * 100
          </DiffInfoWrap>
        </Content>
      </ContentWrap>
    </Card>
  );
};
