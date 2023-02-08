import {
  Card,
  CardTitle,
  Content,
  ContentTitle,
  ContentWrap,
} from '$pages/Report/commonStyled';
import DataCard from '$pages/Report/Marketing/components/DataCard';
import { TPaidAdsStatus } from '$modules/report';
import { marketingDigital } from '$recoils/filter';
import { useRecoilValue } from 'recoil';

export interface ICardSectionProps {
  data: TPaidAdsStatus;
}

export const CardSection = ({ data }: ICardSectionProps) => {
  const { isCompare } = useRecoilValue(marketingDigital);

  return (
    <Card>
      <ContentWrap>
        <Content>
          <ContentTitle>광고 노출수</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'건'}
            format={(value) => value.toLocaleString('ko-KR')}
            value={data?.impressions}
            diffValue={data?.impressionDiff}
            compValue={data?.impressionComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>광고 클릭수</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'건'}
            format={(value) => value.toLocaleString('ko-KR')}
            value={data?.clicks}
            diffValue={data?.clicksDiff}
            compValue={data?.clicksComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>CTR</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'%'}
            format={(value) => value.toLocaleString('ko-KR')}
            value={data?.ctr}
            diffValue={data?.ctrDiff}
            compValue={data?.ctrComp}
          ></DataCard>
        </Content>
        <Content>
          <ContentTitle>CPC</ContentTitle>
          <DataCard
            isCompare={isCompare}
            unit={'원'}
            format={(value) => value.toLocaleString('ko-KR')}
            value={data?.cpc}
            diffValue={data?.cpcDiff}
            compValue={data?.cpcComp}
          ></DataCard>
        </Content>
      </ContentWrap>
    </Card>
  );
};
