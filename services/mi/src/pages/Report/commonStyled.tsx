import styled from '@emotion/styled';
import { Card as MiCard, Tabs as CTabs } from 'mi-ui/src';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 15px;
  justify-content: space-between;
`;

export const ContentsWrap = styled.div`
  display: flex;
  height: 100%;
  min-height: 600px;
  position: relative;
  gap: 20px;
  flex-direction: ${({ direction = 'row' }: { direction?: string }) => direction};
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

export const Card = styled(MiCard)`
  min-height: 180px;
  padding: 20px;
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
`;

export const Section = styled.div`
  height: calc(100% - 35px);
  display: flex;
  flex-direction: row;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  height: 100%;
  :not(:last-of-type) {
    border-right: ${({ theme }) => `1px solid ${theme.palettes.gray.GRAY_300}`};
    margin-right: 20px;
  }
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
