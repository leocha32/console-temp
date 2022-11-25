import styled from '@emotion/styled';
import { Card as MiCard, Tabs as CTabs } from 'mi-ui/src';
import { Theme } from '@emotion/react';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = styled.div`
  padding-top: 10px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
`;

export const Card = styled(MiCard)`
  min-height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  ${({ height }: { height?: number }) => (height ? `height: ${height}px` : '')};
  ${({ flex }: { height?: number; flex?: number }) => (flex ? `flex: ${flex}` : '')};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 15px;
  flex-direction: ${({ direction = 'column' }: { direction?: string }) => direction};
  position: relative;
  gap: 20px;
  min-height: 550px;
  ${Card} {
    ${({ direction = 'column' }: { direction?: string }) =>
      direction === 'row' ? ' flex: 1' : ''};
  }
`;

export const Tabs = styled(CTabs)`
  margin: 10px 0 0;
`;

export const ButtonsWrap = styled.div`
  display: flex;
  gap: 10px;
`;

export const DiffBox = styled.div`
  transform: ${({ value }: { value: number }) => (value > 0 ? 'rotate(180deg)' : 'none')};
  color: ${({ value }: { value: number }) => (value > 0 ? 'red' : 'blue')};
  margin-left: 3px;
`;

export const ChartWrap = styled.div`
  height: 100%;
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => ` ${theme.palettes.gray.GRAY_900}`};
  margin: 0 0 10px;
`;

export const ContentTitle = styled.h4`
  margin: 15px 0 5px;
`;

export const Content = styled.div`
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  height: auto;
  display: flex;
  flex-direction: column;
`;
export const ContentWrap = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: ${({ direction = 'row' }: { direction?: string }) => direction};
  flex: 1;
  ${Content} {
    :not(:last-of-type) {
      border-right: ${({
        direction = 'row',
        theme,
      }: {
        direction?: string;
        theme?: Theme;
      }) =>
        direction === 'row' ? `1px solid ${theme?.palettes.gray.GRAY_300}` : 'none'};
      border-bottom: ${({
        direction = 'row',
        theme,
      }: {
        direction?: string;
        theme?: Theme;
      }) =>
        direction === 'column' ? `1px solid ${theme?.palettes.gray.GRAY_300}` : 'none'};
      margin: ${({ direction = 'row' }: { direction?: string; theme?: Theme }) =>
        direction === 'column' ? '0 0 20px 0' : '0 20px 0 0'};
    }
  }
`;

export const HeaderCard = styled(MiCard)`
  margin-top: 15px;
  padding: 15px 20px;
  overflow: unset;
`;
