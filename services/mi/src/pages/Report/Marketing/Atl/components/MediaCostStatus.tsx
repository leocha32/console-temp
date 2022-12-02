import {
  Card,
  CardTitle,
  ContentTitle,
  ContentWrap,
  Content,
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
import { IATLMediaCostStatus } from '$modules/report/marketing';
import { useSortFamily } from '$utils/hooks/useSortFamily';
export interface IMediaCostStatusProps {
  data: IATLMediaCostStatus;
  category: string;
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
  originData?.forEach((d) => {
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
          originData?.shareByCompanies
            ?.sort((a, b) => {
              if (a.company === '코웨이' || b.company === '코웨이') {
                return 1;
              }
              return b.shareValue - a.shareValue;
            })
            .map(({ company, shareValue }) => ({
              value: shareValue,
              name: company,
            })) || [],
        label: {
          formatter: '{c}%',
        },
        radius: '50%',
        center: ['50%', '60%'],
      },
    },
  };
};

const MediaCostStatus = ({ data, category }: IMediaCostStatusProps) => {
  const sortMonthlyCostByProductGroup = useSortFamily({
    category,
    data: data?.monthlyCostByProductGroup || [],
    key: 'productGroup',
  });
  const { monthlyCostByMedia, monthlyCostByProductGroup, shareByCompanies } =
    makeChartData(
      { ...data, monthlyCostByProductGroup: sortMonthlyCostByProductGroup } || {},
    );
  return (
    <Card height={350}>
      <CardTitle>ATL 매체비 현황</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle>매체별 광고 추이</ContentTitle>
          <BarChart
            data={monthlyCostByMedia.data}
            grid={gridOptions}
            xAixData={monthlyCostByMedia.xAixData}
          />
        </Content>
        <Content>
          <ContentTitle>제품군별 광고 추이</ContentTitle>
          <StackChart
            grid={gridOptions}
            data={monthlyCostByProductGroup.data}
            xAixData={monthlyCostByProductGroup.xAixData}
          />
        </Content>
        <Content>
          <ContentTitle>SOS</ContentTitle>
          <PieChart
            data={shareByCompanies.data}
            tooltip={{
              valueFormatter: (value) => `${value}%`,
            }}
            legend={{
              type: (shareByCompanies?.data?.data || []).length > 13 ? 'scroll' : 'plain',
            }}
          />
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default MediaCostStatus;
