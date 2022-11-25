import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

export interface ISpinnerProps extends LoaderSizeMarginProps {
  color?: string;
}

const Wrap = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;
const ContentWrap = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const TextWrap = styled.div`
  padding-bottom: 20px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_700};
  font-size: 18px;
  font-weight: 600;
`;
export const Spinner = ({ color, ...props }: ISpinnerProps) => {
  const theme = useTheme();
  return (
    <Wrap>
      <ContentWrap>
        <TextWrap> 데이터를 조회 중입니다.</TextWrap>
        <BeatLoader
          color={color || theme.color.primary.PRIMARY_900}
          css={css`
            margin: auto;
          `}
          {...props}
        />
      </ContentWrap>
    </Wrap>
  );
};
