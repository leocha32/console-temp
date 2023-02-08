import styled from '@emotion/styled';
import { Card, CardContent } from 'mi-ui';
import { ReactNode } from 'react';
import InfoIcon from '@mui/icons-material/Info';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;
const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: row;
  border-top: ${({ theme }) => `solid 1px ${theme.palettes.gray.GRAY_500}`};
  padding-top: 20px;
`;
const MessageWrap = styled.div``;

export const enum VariantType {
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export interface IInfoLayoutProps {
  title: ReactNode;
  description?: {
    variant: VariantType;
    message: ReactNode;
  };
}
export const InfoLayout = ({ title, description }: IInfoLayoutProps) => {
  return (
    <Wrap>
      <Card sx={{ marginBottom: '60px', minWidth: '500px' }}>
        <CardContent>
          <h2>{title}</h2>
          {description ? (
            <DescriptionWrap>
              <InfoIcon
                sx={{ paddingRight: '10px' }}
                color={description.variant === VariantType.INFO ? 'info' : 'error'}
              />
              <MessageWrap>{description.message}</MessageWrap>
            </DescriptionWrap>
          ) : null}
        </CardContent>
      </Card>
    </Wrap>
  );
};
