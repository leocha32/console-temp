import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styled from '@emotion/styled';
import { CardTitle } from '$pages/Report/commonStyled';
import { Card as MiCard } from 'mi-ui/src';
import { IProductPenetration } from '$modules/report';

const Card = styled(MiCard)`
  background-color: #fafafa;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

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
  data: IProductPenetration[];
}
export const ProductPenetrationRate = ({ data }: IProductPenetrationRateProps) => {
  const { productPenetrationValue } = data[0] || {};
  return (
    <Card>
      <CardTitle>제품 보급률</CardTitle>
      <Div>
        <div css={dataValueStyle}>{productPenetrationValue || 0}%</div>
        <DiffInfoWrap>
          <InfoIcon sx={{ fontSize: 15 }} />
          제품이 보급된 가구/전체 가구 * 100
        </DiffInfoWrap>
      </Div>
    </Card>
  );
};
