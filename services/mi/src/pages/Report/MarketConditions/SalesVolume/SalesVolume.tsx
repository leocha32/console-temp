import React, { useCallback, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { PageLayout, Spinner } from 'mi-ui';
import { useSalesVolume } from '$modules/report/research';
import { getCrumbs } from '$utils/utils';
import { MarketSpread, MarketShareByBrand } from './components';
import { Tabs, Section } from '$pages/Report/commonStyled';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { researchSalesVolume } from '$recoils/filter';
import { selectableItemsSelector } from '$recoils/resarchSelectItem';
import { ReportIndex } from '$constants/enum';

const tabItems = [
  {
    value: '청정기',
    label: '청정기',
  },
  {
    value: '제습기',
    label: '제습기',
  },
  {
    value: '가습기',
    label: '가습기',
  },
  {
    value: '전기레인지',
    label: '전기레인지',
  },
];

const Footer = styled.div`
  padding-top: 10px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
`;

const TITLE = '시판 판매량';
const SalesVolume = () => {
  const [filter, setFilter] = useRecoilState(researchSalesVolume);
  const selectOption = useRecoilValue(
    selectableItemsSelector(ReportIndex.reportSalesVolume),
  );
  const { yyyy } = filter;
  const year = yyyy || selectOption[0]?.value;
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const { data, isLoading } = useSalesVolume(
    {
      year,
      'product-groups': activeTab,
    },
    { enabled: !!year },
  );

  const handleTabChange = useCallback(
    (e, value) => {
      setActiveTab(value);
    },
    [setActiveTab],
  );

  const handleSelectChange = useCallback(
    (value) => {
      setFilter({
        yyyy: value,
      });
    },
    [setFilter],
  );

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        researchReportFileUrl={data?.researchReportFileUrl}
        selectYear={String(year)}
        selectOptions={selectOption}
        onChangeSelect={handleSelectChange}
        element={contentRef.current as HTMLElement}
        title={TITLE}
      />
      <Tabs items={tabItems} value={activeTab} onChange={handleTabChange} />
      <Section direction={'row'}>
        {isLoading ? <Spinner /> : null}
        <MarketSpread data={data?.marketSpread || []} year={year} />
        <MarketShareByBrand data={data?.marketShareByBrand || []} />
      </Section>
      <Footer>
        [출처] 시판 판매 데이터(POS) : 오프라인(양판점, 백화점, 할인점), 온라인(인터넷
        종합몰, 오픈마켓, 소셜커머스, TV홈쇼핑) 채널 판매량 및 매출액 데이터
      </Footer>
    </PageLayout>
  );
};

export default SalesVolume;
