import { CardSection, ChartSection, TableSection } from './components';
import { TMarketingDigitalCampaignStatus } from '$modules/report';

export interface IOnlineStatusProps {
  data: TMarketingDigitalCampaignStatus;
}

export const OnlineStatus = ({ data: propsData }: IOnlineStatusProps) => {
  return (
    <div>
      <CardSection data={propsData?.paidAdsStatus}></CardSection>
      <ChartSection
        funnelData={propsData?.funnelByAttributeTypeRows}
        stackData={propsData?.ratioByAdsTypeRows}
      ></ChartSection>
      <TableSection data={propsData?.mediaSourceDetailRows}></TableSection>
    </div>
  );
};
