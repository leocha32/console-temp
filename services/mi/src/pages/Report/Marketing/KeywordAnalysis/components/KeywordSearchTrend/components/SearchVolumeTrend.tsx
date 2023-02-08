import { Content, ContentTitle } from '$pages/Report/commonStyled';
import { ILineChartProps } from 'mi-ui/src';
import { ChartWrap } from './commonStyled';
import { LineChart } from '$components/Charts';

export interface ISearchVolumeTrendProps {
  data: ILineChartProps['data'];
  xAixData: string[];
}

const gridOption = {
  left: '5%',
  right: '20',
  bottom: '15%',
};

export const SearchVolumeTrend = ({ data, xAixData }: ISearchVolumeTrendProps) => {
  return (
    <Content>
      <ContentTitle>검색량 트렌드</ContentTitle>
      <ChartWrap>
        <LineChart data={data} xAixData={xAixData} useLabel={false} grid={gridOption} />
      </ChartWrap>
    </Content>
  );
};
