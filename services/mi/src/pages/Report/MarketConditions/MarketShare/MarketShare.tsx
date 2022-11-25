import React, { useCallback, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PageLayout, Spinner } from 'mi-ui';
import { useMarketShare } from '$modules/report/research';
import { getCrumbs } from '$utils/utils';
import { Footer, Section, Tabs } from '$pages/Report/commonStyled';
import { Header } from '$pages/Report/MarketConditions/components/Header';
import { HalfYear, ReportIndex } from '$constants/enum';
import { CowayMarketSare, MajorBrandShare, ProductPenetrationRate } from './components';
import { researchMarketShare } from '$recoils/filter';
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
  {
    value: '안마의자',
    label: '안마의자',
  },
];

const TITLE = '시장 점유율';

const MarketShare = () => {
  const [filter, setFilter] = useRecoilState(researchMarketShare);
  const selectOption = useRecoilValue(
    selectableItemsSelector(ReportIndex.reportMarketShare),
  );
  const { yyyyh } = filter;
  const selectedItem = yyyyh || selectOption[0]?.value || '';
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [year, half] = selectedItem.split('_');
  const { data, isLoading } = useMarketShare(
    {
      year: year,
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

      <Section direction={'row'}>
        {isLoading ? <Spinner /> : null}
        <CowayMarketSare
          cowayMarketShare={data?.cowayMarketShare || []}
          competitorComparison={data?.competitorComparison || []}
        />
        <MajorBrandShare data={data?.majorBrandMarketShare || []} />
        <ProductPenetrationRate data={data?.productPenetration || []} />
      </Section>
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
