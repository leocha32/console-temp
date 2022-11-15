import React from 'react';

import { Card, Section, CardTitle, ContentWrap } from '$pages/Report/commonStyled';
import { IATLMediaPerformanceStatus } from '$modules/report/marketing/atl';
import styled from '@emotion/styled';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';

export interface IMediaPerformanceProps {
  data?: IATLMediaPerformanceStatus;
}

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const SubContentWrap = styled.div`
  flex: 1;
  display: flex;
  :not(:last-of-type) {
    border-bottom: ${({ theme }) => `1px solid ${theme.palettes.gray.GRAY_300}`};
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.h4`
  flex-basis: 130px;
`;

const SubData = styled.div`
  color: ${({ theme }) => theme.color.primary.PRIMARY_900};
  font-size: 55px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MediaPerformance = ({ data }: IMediaPerformanceProps) => {
  console.log(data);
  return (
    <Card>
      <CardTitle>ATL 매체 퍼포먼스</CardTitle>
      <Section>
        <ContentWrap>
          <SubContents>
            <SubContentWrap>
              <SubTitle>R3</SubTitle>
              {data?.r3grp.r3 ? (
                <SubData>{`${data?.r3grp?.r3}%`}</SubData>
              ) : (
                <EmptyContent />
              )}
            </SubContentWrap>
            <SubContentWrap>
              <SubTitle>제품 누적 GRP</SubTitle>
              {data?.r3grp.grp ? (
                <SubData>{data?.r3grp?.grp?.toLocaleString()}</SubData>
              ) : (
                <EmptyContent />
              )}
            </SubContentWrap>
          </SubContents>
        </ContentWrap>
        <ContentWrap flex={2}></ContentWrap>
      </Section>
    </Card>
  );
};

export default MediaPerformance;
