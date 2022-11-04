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
  background-color: rgba(255, 255, 255, 0);
`;

export const Spinner = ({ color, ...props }: ISpinnerProps) => {
  const theme = useTheme();
  return (
    <Wrap>
      <BeatLoader
        color={color || theme.color.primary.PRIMARY_500}
        css={css`
          margin: auto;
        `}
        {...props}
      />
    </Wrap>
  );
};
