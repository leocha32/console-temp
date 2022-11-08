import styled from '@emotion/styled';
import { Card as MiCard, Tabs as CTabs } from 'mi-ui/src';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 10px;
  justify-content: space-between;
`;

export const ContentsWrap = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: ${({ direction = 'row' }: { direction?: string }) => direction};
`;

export const Tabs = styled(CTabs)`
  margin: 10px 0 15px;
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
  background-color: #fafafa;
  padding: 20px;
  flex: ${({ flex = 1 }: { flex?: number }) => flex};
  :not(:last-of-type){
    margin-bottom: ${({
      direction = 'row',
    }: {
      direction?: 'row' | 'column';
      flex?: number;
    }) => (direction === 'row' ? '0' : '20px')};
    margin-right:  ${({
      direction = 'row',
    }: {
      direction?: 'row' | 'column';
      flex?: number;
    }) => (direction === 'row' ? '20px' : '0px')};
  },
`;

export const Section = styled.div`
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  :not(:last-of-type) {
    border-right: ${({ theme }) => `1px solid ${theme.palettes.gray.GRAY_300}`};
    margin-right: 20px;
  }
`;

export const ChartWrap = styled.div`
  height: 100%;
  min-height: 300px;
`;

export const CardTitle = styled.h3`
  color: ${({ theme }) => ` ${theme.palettes.gray.GRAY_900}`};
  margin: 0 0 10px;
`;

export const ContentTitle = styled.h4`
  margin: 15px 0 5px;
`;
