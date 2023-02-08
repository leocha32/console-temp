import React, { useCallback, useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  Content,
  ContentTitle,
  ContentWrap,
} from '$pages/Report/commonStyled';
import styled from '@emotion/styled';
import {
  FlexDirection,
  IMixedChartProps,
  IStackChartProps,
  RadioButton,
} from 'mi-ui/src';
import { MixedChart, StackChart } from '$components/Charts';
import { TMarketingDigitalCampaignPerformance } from '$modules/report';
import { SearchType } from '$constants/enum';
import { marketingDigital } from '$recoils/filter';
import { useRecoilState } from 'recoil';
import _ from 'lodash';

export type TChartSectionProps = Omit<
  TMarketingDigitalCampaignPerformance,
  'onlinePerformance'
>;

const SEARCH_TYPE = [SearchType.month, SearchType.daily];

interface IMakeChrtDataProps {
  trendInSalesByChannel: TMarketingDigitalCampaignPerformance['trendInSalesByChannelDaily'];
  trendInSalesAdsCost: TMarketingDigitalCampaignPerformance['trendInSalesAdsCostDaily'];
  trendInEroasNcpp: TMarketingDigitalCampaignPerformance['trendInEroasNcppDaily'];
}

const ChartWrap = styled.div`
  height: 300px;
`;

const trendInSalesAdsCostChartData = [
  {
    name: '주문건',
    type: 'bar' as const,
    key: 'orderVolume',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'right' as const,
    },
    yAisName: '[단위: 건]',
  },
  {
    name: '광고비',
    type: 'line' as const,
    key: 'adsCost',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'center' as const,
    },
    yAisName: '[단위: 원]',
  },
];

const trendInEroasNcppChartData = [
  {
    name: 'NCPP',
    type: 'bar' as const,
    key: 'ncpp',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'right' as const,
    },
    yAisName: '[단위: 원]',
  },
  {
    name: 'ROAS',
    type: 'line' as const,
    key: 'eroas',
    axisLabel: {
      formatter: '{value}',
    },
    nameTextStyle: {
      align: 'center' as const,
    },
    yAisName: '[단위: %]',
  },
];

const makeChartData = ({
  trendInSalesByChannel,
  trendInSalesAdsCost,
  trendInEroasNcpp,
}: IMakeChrtDataProps): {
  xAixData: string[];
  trendInSalesByChannel: IStackChartProps['data'];
  trendInSalesAdsCost: IMixedChartProps['data'];
  trendInEroasNcpp: IMixedChartProps['data'];
} => {
  const mainData: any = trendInSalesByChannel?.length
    ? trendInSalesByChannel
    : trendInSalesAdsCost?.length
    ? trendInSalesAdsCost
    : trendInEroasNcpp?.length
    ? trendInEroasNcpp
    : [];
  const xAixData = _.uniqBy(mainData, 'date')
    .map(({ date }: any) => date)
    .sort();

  const trendInSalesByChannelData = {};
  const trendInSalesAdsCostData = {};
  const trendInEroasNcppData = {};
  trendInSalesByChannel?.forEach(({ channel, orderVolume, date }) => {
    const xAixDataIdx = xAixData.indexOf(date);
    if (!trendInSalesByChannelData[channel]) {
      trendInSalesByChannelData[channel] = {
        name: channel,
        stack: 'channel',
        data: Array(xAixData.length),
      };
    }
    trendInSalesByChannelData[channel].data[xAixDataIdx] = orderVolume;
  });

  trendInSalesAdsCost?.forEach(({ date, ...props }) => {
    const xAixDataIdx = xAixData.indexOf(date);
    trendInSalesAdsCostChartData.forEach(({ key, name, type }) => {
      if (!trendInSalesAdsCostData[key]) {
        trendInSalesAdsCostData[key] = { name, type, data: Array(xAixData.length) };
      }
      trendInSalesAdsCostData[key].data[xAixDataIdx] = props[key];
    });
  });

  trendInEroasNcpp?.forEach(({ date, ...props }) => {
    const xAixDataIdx = xAixData.indexOf(date);
    trendInEroasNcppChartData.forEach(({ key, name, type }) => {
      if (!trendInEroasNcppData[key]) {
        trendInEroasNcppData[key] = { name, type, data: Array(xAixData.length) };
      }
      trendInEroasNcppData[key].data[xAixDataIdx] = props[key];
    });
  });

  return {
    xAixData: xAixData.map((date) => {
      const year = date.substr(0, 4);
      const month = date.substr(4, 2);
      const day = date.substr(6, 2);
      const str = `${year}년 \n ${month}월`;
      return day ? `${str} ${day}일` : str;
    }),
    trendInSalesByChannel: Object.values(trendInSalesByChannelData),
    trendInSalesAdsCost: Object.values(trendInSalesAdsCostData),
    trendInEroasNcpp: Object.values(trendInEroasNcppData),
  };
};

const gridOption = {
  top: '20%',
  bottom: '15%',
};
export const ChartSection = ({
  trendInSalesByChannelDaily,
  trendInSalesByChannelMonthly,
  trendInEroasNcppDaily,
  trendInEroasNcppMonthly,
  trendInSalesAdsCostDaily,
  trendInSalesAdsCostMonthly,
}: TChartSectionProps) => {
  const [{ searchType, ...filter }, setFilter] = useRecoilState(marketingDigital);
  const isProduct = filter.category1 === '제품';
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>(searchType);
  const isMonth = selectedSearchType === SearchType.month;

  const { xAixData, trendInSalesByChannel, trendInSalesAdsCost, trendInEroasNcpp } =
    useMemo(
      () =>
        makeChartData({
          trendInSalesByChannel: isMonth
            ? trendInSalesByChannelMonthly
            : trendInSalesByChannelDaily,
          trendInSalesAdsCost: isMonth
            ? trendInSalesAdsCostMonthly
            : trendInSalesAdsCostDaily,
          trendInEroasNcpp: isMonth ? trendInEroasNcppMonthly : trendInEroasNcppDaily,
        }),
      [
        isMonth,
        trendInSalesByChannelMonthly,
        trendInSalesByChannelDaily,
        trendInSalesAdsCostMonthly,
        trendInSalesAdsCostDaily,
        trendInEroasNcppMonthly,
        trendInEroasNcppDaily,
      ],
    );
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
        {isProduct ? (
          <Content>
            <ContentTitle>판매 채널 별 실적 추이</ContentTitle>
            <ChartWrap>
              <StackChart
                useLabel={false}
                data={trendInSalesByChannel}
                xAixData={xAixData}
                yAxis={{ name: '[단위: 건]' }}
                grid={{ ...gridOption, left: '4%', right: '4%' }}
              />
            </ChartWrap>
          </Content>
        ) : null}

        <Content>
          <ContentTitle>광고비 x 판매 실적 추이</ContentTitle>
          <ChartWrap>
            <MixedChart
              useLabel={false}
              yAxis={trendInSalesAdsCostChartData.map(
                ({ axisLabel, yAisName, nameTextStyle }) => ({
                  type: 'value',
                  name: yAisName,
                  axisLabel,
                  nameTextStyle,
                }),
              )}
              data={trendInSalesAdsCost}
              xAixData={xAixData}
              legend={{
                data: trendInSalesAdsCostChartData.map(({ name }) => name),
              }}
              grid={{ ...gridOption, left: '4%', right: '6%' }}
              showLegendBottom={false}
              useYAxis
              useTooltip
            />
          </ChartWrap>
        </Content>
        <Content>
          <ContentTitle>NCPP x eROAS 추이</ContentTitle>
          <ChartWrap>
            <MixedChart
              useLabel={false}
              yAxis={trendInEroasNcppChartData.map(
                ({ axisLabel, yAisName, nameTextStyle }) => ({
                  type: 'value',
                  name: yAisName,
                  axisLabel,
                  nameTextStyle,
                }),
              )}
              data={trendInEroasNcpp}
              xAixData={xAixData}
              legend={{
                data: trendInEroasNcppChartData.map(({ name }) => name),
              }}
              grid={{ ...gridOption, left: '6%', right: '4%' }}
              showLegendBottom={false}
              useYAxis
              useTooltip
            />
          </ChartWrap>
        </Content>
      </ContentWrap>
    </Card>
  );
};
