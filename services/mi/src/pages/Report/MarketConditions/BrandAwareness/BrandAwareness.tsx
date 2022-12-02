import React, { useCallback, useRef, useState } from 'react';
import { PageLayout, Spinner } from 'mi-ui';
import { getCrumbs } from '$utils/utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CowayBrandAwareness, MajorBrandAwareness } from './components';
import { HalfYear, ReportIndex } from '$constants/enum';
import { Section, Tabs } from '$pages/Report/commonStyled';
import { useBrandAwareness } from '$modules/report/research';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { researchBrandAwareness } from '$recoils/filter';
import { selectableItemsSelector } from '$recoils/resarchSelectItem';

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

const TITLE = '브랜드 인지도 ';
const BrandAwareness = () => {
  const [filter, setFilter] = useRecoilState(researchBrandAwareness);
  const selectOption = useRecoilValue(
    selectableItemsSelector(ReportIndex.reportBrandAwareness),
  );
  const { yyyyh } = filter;
  const selectedItem = yyyyh || selectOption[0]?.value || '';
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [year, half] = selectedItem.split('_');
  const { data, isFetching } = useBrandAwareness(
    {
      year,
      half: half as HalfYear,
      'product-groups': activeTab,
    },
    { enabled: !!selectedItem },
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
        yyyyh: value,
      });
    },
    [setFilter],
  );

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        researchReportFileUrl={data?.researchReportFileUrl}
        selectYear={selectedItem}
        selectOptions={selectOption}
        onChangeSelect={handleSelectChange}
        element={contentRef.current as HTMLElement}
        title={TITLE}
      />
      <Tabs items={tabItems} value={activeTab} onChange={handleTabChange} />
      <Section>
        {isFetching ? <Spinner /> : null}
        <CowayBrandAwareness data={data?.cowayBrandAwareness || []} />
        <MajorBrandAwareness data={data?.majorBrandAwareness || []} />
      </Section>
    </PageLayout>
  );
};

export default BrandAwareness;
