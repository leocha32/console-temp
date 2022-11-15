import {
  Card,
  Section,
  ContentWrap,
  CardTitle,
  ContentTitle,
  ChartWrap,
} from '$pages/Report/commonStyled';
import _ from 'lodash';
import {
  StackChart,
  BarChart,
  IBarChartProps,
  IStackBarChartProps,
  PieChart,
  IPieChartProps,
} from 'mi-ui';
import { IATLMediaCostStatus } from '$modules/report/marketing/atl';

export interface IMediaCostStatusProps {
  data?: IATLMediaCostStatus;
}

const gridOptions = {
  bottom: 20,
  left: 30,
  top: 40,
  right: 30,
};

const makeBarChartXAix = (xAixData): string[] =>
  xAixData.map((yearMonth) => {
    const year = yearMonth.substr(2, 2);
    const month = yearMonth.substr(-2);
    return `${year}년 ${month}월`;
  });

const makeBarChartData = (
  originData,
  xAixData,
  nameKey,
  isStack = false,
): IBarChartProps['data'] | IStackBarChartProps['data'] => {
  const data = {};
  originData.forEach((d) => {
    const xAixDataIdx = xAixData.indexOf(d.yearMonth);
    const name = d[nameKey];
    if (!data[name]) {
      data[name] = {
        name,
        stack: isStack ? 'stack' : null,
        data: Array(xAixData.length),
      };
    }
    data[name].data[xAixDataIdx] = d.cost;
  });
  return Object.values(data);
};
const makeChartData = (
  originData: IATLMediaCostStatus,
): {
  monthlyCostByMedia: {
    xAixData: IBarChartProps['xAixData'];
    data: IBarChartProps['data'];
  };
  monthlyCostByProductGroup: {
    xAixData: IStackBarChartProps['xAixData'];
    data: IStackBarChartProps['data'];
  };
  shareByCompanies: {
    data: IPieChartProps['data'];
  };
} => {
  const monthlyCostByMediaXAixData = _.uniqBy(
    originData.monthlyCostByMedia,
    'yearMonth',
  ).map(({ yearMonth }) => yearMonth);
  const monthlyCostByProductGroupXAixData = _.uniqBy(
    originData.monthlyCostByProductGroup,
    'yearMonth',
  ).map(({ yearMonth }) => yearMonth);

  return {
    monthlyCostByMedia: {
      xAixData: makeBarChartXAix(monthlyCostByMediaXAixData),
      data: makeBarChartData(
        originData.monthlyCostByMedia,
        monthlyCostByMediaXAixData,
        'media',
      ),
    },
    monthlyCostByProductGroup: {
      xAixData: makeBarChartXAix(monthlyCostByProductGroupXAixData),
      data: makeBarChartData(
        originData.monthlyCostByProductGroup,
        monthlyCostByProductGroupXAixData,
        'productGroup',
        true,
      ) as IStackBarChartProps['data'],
    },
    shareByCompanies: {
      data: {
        data:
          originData.shareByCompanies?.map(({ company, shareValue }) => ({
            value: shareValue,
            name: company,
          })) || [],
        label: {
          formatter: '{c}%',
        },
        radius: '60%',
        center: ['50%', '70%'],
      },
    },
  };
};

const MediaCostStatus = ({ data }: IMediaCostStatusProps) => {
  const { monthlyCostByMedia, monthlyCostByProductGroup, shareByCompanies } =
    makeChartData(data || {});
  return (
    <Card>
      <CardTitle>ATL 매체비 현황</CardTitle>
      <Section>
        <ContentWrap>
          <ContentTitle>매체별 광고 추이</ContentTitle>
          <ChartWrap>
            <BarChart
              data={monthlyCostByMedia.data}
              grid={gridOptions}
              xAixData={monthlyCostByMedia.xAixData}
            />
          </ChartWrap>
        </ContentWrap>
        <ContentWrap>
          <ContentTitle>제품군별 광고 추이</ContentTitle>
          <ChartWrap>
            <StackChart
              grid={gridOptions}
              data={monthlyCostByProductGroup.data}
              xAixData={monthlyCostByProductGroup.xAixData}
            />
          </ChartWrap>
        </ContentWrap>
        <ContentWrap>
          <ContentTitle>SOS</ContentTitle>
          <ChartWrap>
            <PieChart
              data={shareByCompanies.data}
              tooltip={{
                valueFormatter: (value) => `${value}%`,
              }}
              legend={{
                type:
                  (shareByCompanies?.data?.data || []).length > 13 ? 'scroll' : 'plain',
              }}
            />
          </ChartWrap>
        </ContentWrap>
      </Section>
    </Card>
  );
};

export default MediaCostStatus;
