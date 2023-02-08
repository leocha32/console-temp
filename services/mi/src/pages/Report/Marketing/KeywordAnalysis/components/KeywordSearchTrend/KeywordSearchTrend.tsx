import { useCallback, useMemo, useState } from 'react';
import { Card, ContentWrap, CardHeader } from '$pages/Report/commonStyled';
import {
  IPercentageSearchVolume,
  ISearchVolumeTrendProps,
  PercentageSearchVolume,
  SearchVolumeTrend,
} from './components';
import { FlexDirection, RadioButton } from 'mi-ui/src';
import { useRecoilState } from 'recoil';
import { marketingKeywordAnalysis } from '$recoils/filter';
import { SearchType } from '$constants/enum';
import _ from 'lodash';
import {
  TKeywordSearchTrend,
  TKeywordSearchVolumeRateRow,
} from '$modules/report/marketing';

const SEARCH_TYPE = [SearchType.month, SearchType.daily];

export interface IKeywordSearchTrendProps {
  data: TKeywordSearchTrend;
}

const makeChartData = (
  data: TKeywordSearchVolumeRateRow[],
): {
  xAixData: string[];
  searchVolumeData: ISearchVolumeTrendProps['data']; //트렌드
  searchRateData: IPercentageSearchVolume['data']; //비중
} => {
  const xAixData = _.uniqBy(data, 'date')
    .map(({ date }) => date)
    .sort();

  const searchRateData = {};
  const searchVolumeData = {};

  data
    ?.sort((a) => {
      if (a.company === '코웨이') {
        return -1;
      }
      return 1;
    })
    .forEach(({ date, company, searchRate, searchVolume }) => {
      const xAixDataIdx = xAixData.indexOf(date);
      if (!searchVolumeData[company]) {
        searchVolumeData[company] = {
          name: company,
          data: Array(xAixData.length),
        };
      }
      if (!searchRateData[company]) {
        searchRateData[company] = {
          name: company,
          data: Array(xAixData.length),
          stack: 'stack',
        };
      }
      searchRateData[company].data[xAixDataIdx] = searchRate;
      searchVolumeData[company].data[xAixDataIdx] = searchVolume;
    });
  return {
    xAixData: xAixData.map((date) => {
      const year = date.substr(0, 4);
      const month = date.substr(4, 2);
      const day = date.substr(6, 2);
      const str = `${year}년 \n ${month}월`;
      return day ? `${str} ${day}일` : str;
    }),
    searchRateData: Object.values(searchRateData),
    searchVolumeData: Object.values(searchVolumeData),
  };
};

export const KeywordSearchTrend = ({ data: originData }: IKeywordSearchTrendProps) => {
  const [{ searchType, ...filter }, setFilter] = useRecoilState(marketingKeywordAnalysis);
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>(searchType);

  const handleChangeSearchType = useCallback(
    (target, value) => {
      setSelectedSearchType(value);
      setFilter({
        ...filter,
        searchType: value,
      });
    },
    [setFilter, filter],
  );

  const { xAixData, searchVolumeData, searchRateData } = useMemo(() => {
    return selectedSearchType === SearchType.month
      ? makeChartData(originData?.keywordSearchMonthlyTrends)
      : makeChartData(originData?.keywordSearchDailyTrends);
  }, [originData, selectedSearchType]);
  return (
    <Card>
      <CardHeader>
        <RadioButton
          flexDirection={FlexDirection.ROW}
          options={SEARCH_TYPE}
          value={selectedSearchType}
          onChange={handleChangeSearchType}
        ></RadioButton>
      </CardHeader>
      <ContentWrap direction={'column'}>
        <SearchVolumeTrend data={searchVolumeData} xAixData={xAixData} />
        <PercentageSearchVolume data={searchRateData} xAixData={xAixData} />
      </ContentWrap>
    </Card>
  );
};
