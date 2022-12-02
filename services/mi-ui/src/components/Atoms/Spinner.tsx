import React from 'react';
import * as Spinners from 'react-spinners';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

export interface ISpinnerProps extends LoaderSizeMarginProps {
  /** Spinner color */
  color?: string;
  /** Spinner 상단 text */
  text?: string;
  /** Spinner type */
  type?: SpinnerType;
}
export enum SpinnerType {
  BAR = 'bar',
  BEAT = 'beat',
  BOUNCE = 'bounce',
  CIRCLE = 'circle',
  CLIMBINGBOX = 'climbingBox',
  CLIP = 'clip',
  CLOCK = 'clock',
  DOT = 'dot',
  FADE = 'fade',
  GRID = 'grid',
  HASH = 'hash',
  MOON = 'moon',
  PACMAN = 'pacman',
  PROPAGATE = 'propagate',
  PUFF = 'puff',
  PULSE = 'pulse',
  RING = 'ring',
  RISE = 'rise',
  ROTATE = 'rotate',
  SCALE = 'scale',
  SKEW = 'skew',
  SQUARE = 'square',
  SYNC = 'sync',
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

const Component = ({ type, ...props }: Omit<ISpinnerProps, 'text'>) => {
  let Spinner;
  switch (type) {
    case SpinnerType.BAR:
      Spinner = Spinners.BarLoader;
      break;
    case SpinnerType.FADE:
      Spinner = Spinners.FadeLoader;
      break;
    case SpinnerType.DOT:
      Spinner = Spinners.DotLoader;
      break;
    case SpinnerType.CLIP:
      Spinner = Spinners.ClipLoader;
      break;
    case SpinnerType.CLOCK:
      Spinner = Spinners.ClockLoader;
      break;
    case SpinnerType.PULSE:
      Spinner = Spinners.PulseLoader;
      break;
    case SpinnerType.PUFF:
      Spinner = Spinners.PuffLoader;
      break;
    case SpinnerType.RING:
      Spinner = Spinners.RingLoader;
      break;
    case SpinnerType.RISE:
      Spinner = Spinners.RiseLoader;
      break;
    case SpinnerType.ROTATE:
      Spinner = Spinners.RotateLoader;
      break;
    case SpinnerType.BOUNCE:
      Spinner = Spinners.BounceLoader;
      break;
    case SpinnerType.CLIMBINGBOX:
      Spinner = Spinners.ClimbingBoxLoader;
      break;
    case SpinnerType.SYNC:
      Spinner = Spinners.SyncLoader;
      break;
    case SpinnerType.CIRCLE:
      Spinner = Spinners.CircleLoader;
      break;
    case SpinnerType.GRID:
      Spinner = Spinners.GridLoader;
      break;
    case SpinnerType.HASH:
      Spinner = Spinners.HashLoader;
      break;
    case SpinnerType.MOON:
      Spinner = Spinners.MoonLoader;
      break;
    case SpinnerType.PACMAN:
      Spinner = Spinners.PacmanLoader;
      break;
    case SpinnerType.SCALE:
      Spinner = Spinners.ScaleLoader;
      break;
    case SpinnerType.SQUARE:
      Spinner = Spinners.SquareLoader;
      break;
    case SpinnerType.SKEW:
      Spinner = Spinners.SkewLoader;
      break;
    case SpinnerType.PROPAGATE:
      Spinner = Spinners.PropagateLoader;
      break;
    case SpinnerType.BEAT:
    default:
      Spinner = Spinners.BeatLoader;
      break;
  }
  return <Spinner {...props} />;
};
export const Spinner = ({
  color,
  text = '데이터를 조회 중입니다.',
  type = SpinnerType.BEAT,
  ...props
}: ISpinnerProps) => {
  const theme = useTheme();
  return (
    <Wrap>
      <ContentWrap>
        <TextWrap> {text}</TextWrap>
        <Component
          type={type}
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
