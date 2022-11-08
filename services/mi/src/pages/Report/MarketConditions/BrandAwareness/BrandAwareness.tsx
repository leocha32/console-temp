import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { PageLayout, Spinner } from 'mi-ui';
import { getCrumbs } from '$utils/utils';
import { CowayBrandAwareness, MajorBrandAwareness } from './components';
import { HalfYear } from '$constants/enum';
import { Wrap, ContentsWrap, Tabs } from '../components/commonStyled';
import { useBrandAwareness } from '$modules/report';
import { Header } from '$pages/Report/MarketConditions/components/Header';

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
];

const currentYear = dayjs().year();

const selectOption = () => {
  const lastYear = 2020;
  const options: { value: string; label: string }[] = [];

  for (let i = currentYear; i >= lastYear; i--) {
    options.push(
      ...[
        { value: `${String(i)}-${HalfYear.First}`, label: `${i}년 상반기` },
        { value: `${String(i)}-${HalfYear.Second}`, label: `${i}년 하반기` },
      ],
    );
  }
  return options;
};
const TITLE = '브랜드 인지도 ';
const BrandAwareness = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [selectYear, setSelectYear] = useState<string>(selectOption()[0]?.value);
  const [year, half] = selectYear.split('-');
  const { data, isLoading, refetch } = useBrandAwareness(
    {
      year,
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
      <Wrap>
        <ContentsWrap direction={'column'}>
          {isLoading ? <Spinner /> : null}
          <CowayBrandAwareness data={data?.cowayBrandAwareness || []} />
          <MajorBrandAwareness data={data?.majorBrandAwareness || []} />
        </ContentsWrap>
      </Wrap>
    </PageLayout>
  );
};

export default BrandAwareness;
