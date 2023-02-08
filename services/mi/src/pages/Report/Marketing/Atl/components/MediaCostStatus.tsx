import {
  Card,
  CardTitle,
  ContentTitle,
  ContentWrap,
  Content,
} from '$pages/Report/commonStyled';
import _ from 'lodash';
import { StackChart, BarChart, IBarChartProps, IStackChartProps } from 'mi-ui';
import { TATLMediaCostStatus } from '$modules/report/marketing';
import { useSortFamily } from '$utils/hooks/useSortFamily';
export interface IMediaCostStatusProps {
  data: TATLMediaCostStatus;
  category: string;
}

const gridOptions = {
  bottom: 20,
  left: 30,
  top: 55,
  right: 0,
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
): IBarChartProps['data'] | IStackChartProps['data'] => {
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
  originData: TATLMediaCostStatus,
): {
  monthlyCostByMedia: {
    xAixData: IBarChartProps['xAixData'];
    data: IBarChartProps['data'];
  };
  monthlyCostByProductGroup: {
    xAixData: IStackChartProps['xAixData'];
    data: IStackChartProps['data'];
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
      ) as IStackChartProps['data'],
    },
  };
};

const yAxisOptions = {
  name: '[단위: 억원]',
};

const MediaCostStatus = ({ data, category }: IMediaCostStatusProps) => {
  const sortMonthlyCostByProductGroup = useSortFamily({
    category,
    data: data?.monthlyCostByProductGroup || [],
    key: 'productGroup',
  });
  const { monthlyCostByMedia, monthlyCostByProductGroup } = makeChartData(
    { ...data, monthlyCostByProductGroup: sortMonthlyCostByProductGroup } || {},
  );
  return (
    <Card height={350}>
      <CardTitle>ATL 매체비 현황</CardTitle>
      <ContentWrap>
        <Content>
          <ContentTitle>매체 별 광고비 추이</ContentTitle>
          <BarChart
            data={monthlyCostByMedia.data}
            grid={gridOptions}
            xAixData={monthlyCostByMedia.xAixData}
            yAxis={yAxisOptions}
          />
        </Content>
        <Content>
          <ContentTitle>제품군 별 광고비 추이</ContentTitle>
          <StackChart
            grid={gridOptions}
            data={monthlyCostByProductGroup.data}
            xAixData={monthlyCostByProductGroup.xAixData}
            yAxis={yAxisOptions}
          />
        </Content>
      </ContentWrap>
    </Card>
  );
};

export default MediaCostStatus;
