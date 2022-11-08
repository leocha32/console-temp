import React, { useCallback, useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { PageLayout, Spinner } from 'mi-ui';
import { useSalesVolume } from '$modules/report';
import { getCrumbs } from '$utils/utils';
import { MarketSpread, MarketShareByBrand } from './components';
import { Wrap, ContentsWrap, Tabs } from '../components/commonStyled';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { css } from '@emotion/react';

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
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
`;

const currentYear = dayjs().year();

const selectOption = () => {
  const lastYear = 2020;
  const options: { value: string; label: string }[] = [];

  for (let i = currentYear; i >= lastYear; i--) {
    options.push({
      value: String(i),
      label: `${i}년`,
    });
  }
  return options;
};
const TITLE = '시판 판매량';
const SalesVolume = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [selectYear, setSelectYear] = useState<string>(selectOption()[0]?.value);
  const { data, isLoading, refetch } = useSalesVolume(
    {
      year: selectYear,
      'product-groups': activeTab,
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [activeTab, selectYear]);

  const handleTabChange = useCallback(
    (e, value) => {
      setActiveTab(value);
    },
    [setActiveTab],
  );

  const handleSelectChange = useCallback(
    (value) => {
      setSelectYear(value.value);
    },
    [setSelectYear],
  );

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        researchReportFile={data?.researchReportFile}
        selectYear={selectYear}
        selectOptions={selectOption()}
        onChangeSelect={handleSelectChange}
        element={contentRef.current as HTMLElement}
        title={TITLE}
      />
      <Tabs items={tabItems} value={activeTab} onChange={handleTabChange} />
      <Wrap>
        <ContentsWrap
          css={css`
            height: calc(100% - 50px);
          `}
        >
          {isLoading ? <Spinner /> : null}
          <MarketSpread data={data?.marketSpread || []} year={selectYear} />
          <MarketShareByBrand data={data?.marketShareByBrand || []} />
        </ContentsWrap>
        <Footer>
          [출처] 시판 판매 데이터(POS) : 오프라인(양판점, 백화점, 할인점), 온라인(인터넷
          종합몰, 오픈마켓, 소셜커머스, TV홈쇼핑) 채널 판매량 및 매출액 데이터
        </Footer>
      </Wrap>
    </PageLayout>
  );
};

export default SalesVolume;
