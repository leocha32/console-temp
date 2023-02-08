import { Card, Content, ContentTitle, ContentWrap } from '$pages/Report/commonStyled';

import { FunnelStackChart, StackChart } from '$components/Charts';
import { TFunnelByAttributeTypeRow, TRatioByAdsTypeRow } from '$modules/report';
import { sumBy } from 'lodash';
export interface IChartSectionProps {
  funnelData: TFunnelByAttributeTypeRow[];
  stackData: TRatioByAdsTypeRow[];
}

const makeStackData = (stackData: TRatioByAdsTypeRow[] | undefined) => {
  if (!stackData) return [];

  return stackData.map((data) => {
    const { adsType, adsCostRate, attributesRate, requestsRate, completesRate } = data;
    return {
      name: adsType.toUpperCase(),
      stack: 'total',
      data: [adsCostRate, attributesRate, requestsRate, completesRate],
    };
  });
};

const makeFunnelData = (funnelData: TFunnelByAttributeTypeRow[] | undefined) => {
  if (!funnelData)
    return {
      data: [],
      label: '',
      diffData: [],
    };
  const data = funnelData.map((data) => {
    const { attributesType, attributes, requests, completes } = data;
    return {
      name: attributesType,
      stack: 'total',
      data: [attributes, requests, completes],
    };
  });

  const label = funnelData.map(({ attributesRate, requestsRate, completesRate }) => [
    attributesRate,
    requestsRate,
    completesRate,
  ]);
  const sumAttributes = sumBy(funnelData, ({ attributes }) => attributes);
  const sumRequests = sumBy(funnelData, ({ requests }) => requests);
  const sumCompletes = sumBy(funnelData, ({ completes }) => completes);

  const diffData = [
    Math.round((sumRequests / sumAttributes) * 100) || 0,
    Math.round((sumCompletes / sumRequests) * 100) || 0,
  ];

  return {
    data,
    label,
    diffData,
  };
};

export const ChartSection = ({ funnelData, stackData }: IChartSectionProps) => {
  const { data, label, diffData } = makeFunnelData(funnelData);
  return (
    <Card height={350} sx={{ marginTop: '20px' }}>
      <ContentWrap>
        <Content>
          <ContentTitle>광고 별 비중</ContentTitle>
          <StackChart
            yAxis={{
              max: 100,
              name: '[단위: %]',
            }}
            data={makeStackData(stackData)}
            xAixData={['광고비', '유입', '주문신청', '주문완료']}
          ></StackChart>
        </Content>
        <Content>
          <ContentTitle>UV x전환 퍼널</ContentTitle>
          <FunnelStackChart
            label={{
              formatter: ({ seriesIndex, dataIndex }) => {
                return String(label[seriesIndex || 0][dataIndex]) + '%';
              },
            }}
            useLabel={true}
            data={data}
            diffData={diffData}
            xAixData={['UV', '주문신청', '주문완료']}
          ></FunnelStackChart>
        </Content>
      </ContentWrap>
    </Card>
  );
};
