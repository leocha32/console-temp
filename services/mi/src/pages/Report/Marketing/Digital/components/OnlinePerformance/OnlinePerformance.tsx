import React from 'react';
import { TMarketingDigitalCampaignPerformance } from '$modules/report';
import { CardSection, ChartSection } from './components';

export interface IOnlinePerformanceProps {
  data: TMarketingDigitalCampaignPerformance;
}
export const OnlinePerformance = ({ data: propsData }: IOnlinePerformanceProps) => {
  const { onlinePerformance, ...data } = propsData || {
    onlinePerformance: {},
  };
  return (
    <>
      <CardSection data={onlinePerformance} />
      <ChartSection {...data} />
    </>
  );
};
