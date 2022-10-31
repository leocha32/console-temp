import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { PrimaryColor } from '$constants/color';

export interface ISpinnerProps {
  type?: string;
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
  background-color: rgba(255, 255, 255, 0.7);
`;

export const Spinner = ({ color = PrimaryColor.PRIMARY_500 }: ISpinnerProps) => {
  return (
    <Wrap>
      <BeatLoader
        color={color}
        css={css`
          margin: auto;
        `}
      />
    </Wrap>
  );
};
