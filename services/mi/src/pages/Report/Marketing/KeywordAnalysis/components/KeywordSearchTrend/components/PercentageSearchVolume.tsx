import { Content, ContentTitle } from '$pages/Report/commonStyled';
import { IStackChartProps } from 'mi-ui/src';
import { ChartWrap } from './commonStyled';
import { StackChart } from '$components/Charts';

export interface IPercentageSearchVolume {
  data: IStackChartProps['data'];
  xAixData: string[];
}

const gridOption = {
  left: '4%',
  right: '20',
  bottom: '15%',
};
const yAxisOption = {
  max: 100,
  name: '[단위: %]',
};
export const PercentageSearchVolume = ({ data, xAixData }: IPercentageSearchVolume) => {
  return (
    <Content>
      <ContentTitle>검색량 비중</ContentTitle>
      <ChartWrap>
        <StackChart
          data={data}
          xAixData={xAixData}
          grid={gridOption}
          yAxis={yAxisOption}
        />
      </ChartWrap>
    </Content>
  );
};
