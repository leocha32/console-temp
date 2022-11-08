import React, { useCallback, useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { PageLayout, Spinner } from 'mi-ui';
import { useMarketShare } from '$modules/report';
import { getCrumbs } from '$utils/utils';
import { Tabs } from '../components/commonStyled';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { HalfYear } from '$constants/enum';
import {
  CowayMarketSare,
  MajorBrandShare,
  MarketShareContrast,
  ProductPenetrationRate,
} from './components';

const ContentsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  height: calc(100% - 30px);
  margin: 15px 10px;
  position: relative;
`;
const Footer = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
`;

const tabItems = [
  {
    value: '정수기',
    label: '정수기',
  },
  {
    value: '청정기',
    label: '청정기',
  },
  {
    value: '비데',
    label: '비데',
  },
  {
    value: '매트리스',
    label: '매트리스',
  },
  {
    value: '안마의자',
    label: '안마의자',
  },
];

const TITLE = '시장 점유율(M/S)';
const currentMonth = dayjs().month();
const currentYear = dayjs().year();

const selectOption = () => {
  const lastYear = 2020;
  const options: { value: string; label: string }[] = [];

  for (let i = currentYear; i >= lastYear; i--) {
    if (currentMonth < 6 && i === currentYear) continue;
    if (i === currentYear) {
      options.push(
        ...[{ value: `${String(i)}-${HalfYear.First}`, label: `${i}년 상반기` }],
      );
    } else {
      options.push(
        ...[
          { value: `${String(i)}-${HalfYear.First}`, label: `${i}년 상반기` },
          { value: `${String(i)}-${HalfYear.Second}`, label: `${i}년 하반기` },
        ],
      );
    }
  }
  return options;
};

const MarketShare = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [selectYear, setSelectYear] = useState<string>(selectOption()[0]?.value);
  const [year, half] = selectYear.split('-');
  const { data, isLoading, refetch } = useMarketShare(
    {
      year: year,
      half: half as HalfYear,
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

      <ContentsWrap>
        {isLoading ? <Spinner /> : null}
        <CowayMarketSare data={data?.cowayMarketShare || []} />
        <MarketShareContrast data={data?.competitorComparison || []} />
        <MajorBrandShare data={data?.majorBrandMarketShare || []} />
        <ProductPenetrationRate data={data?.productPenetration || []} />
      </ContentsWrap>
      <Footer>
        [출처]
        <br />
        시장 점유율 조사 : 매년 상·하반기 조사, 전국(제주 제외), 만 25~59세 여성 가구 패널
        (가구주 or 가구주 부인), 통계청 가구 정보 근거하여 6개 변인 할당
        <br />
        (지역/연령/도시 규모/가구소득/가구 규모/자녀 연령), n=5000명, 온라인 조사
      </Footer>
    </PageLayout>
  );
};

export default MarketShare;
