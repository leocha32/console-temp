import React from 'react';

import {
  Card,
  CardTitle,
  Content,
  ContentTitle,
  ContentWrap,
} from '$pages/Report/commonStyled';
import DataCard from '$pages/Report/Marketing/components/DataCard';
import { TKeywordSearchAnalysis } from '$modules/report/marketing';

export interface IKeywordSearchTermAnalysisProps {
  data: TKeywordSearchAnalysis;
  keyword: string;
  isCompare: boolean;
}
export const KeywordSearchTermAnalysis = ({
  data,
  keyword,
  isCompare,
}: IKeywordSearchTermAnalysisProps) => {
  return (
    <Card>
      <CardTitle>키워드 검색어 분석</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle> {`${keyword} 카테고리 검색량`} </ContentTitle>
          <DataCard
            isCompare={isCompare}
            value={data?.categorySearchVolume?.searchVolume.toLocaleString()}
            diffValue={data?.categorySearchVolume?.compDiffRate}
            compValue={data?.categorySearchVolume.searchVolumeComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle> {`코웨이 ${keyword} 검색량`} </ContentTitle>
          <DataCard
            isCompare={isCompare}
            value={data?.categorySearchVolume?.searchVolumeCoway.toLocaleString()}
            diffValue={data?.categorySearchVolume?.compDiffRateCoway}
            compValue={data?.categorySearchVolume.searchVolumeCompCoway}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>코웨이 제품 검색 비중(경쟁사 比)</ContentTitle>
          <DataCard
            isCompare={isCompare}
            value={data?.cowayCategorySearchRate?.searchRate}
            unit={'%'}
            diffValue={data?.cowayCategorySearchRate?.compDiffRate}
            compValue={data?.cowayCategorySearchRate.searchRateComp}
          ></DataCard>
        </Content>
      </ContentWrap>
    </Card>
  );
};
