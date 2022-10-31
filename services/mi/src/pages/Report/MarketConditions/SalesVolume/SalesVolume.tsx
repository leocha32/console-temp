import React, { useCallback, useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  PageLayout,
  Tabs,
  Card as MiCard,
  SingleSelect as Select,
  Button,
  Spinner,
} from 'mi-ui';
import { useSalesVolume } from 'modules/MarketConditions';
import { getCrumbs, saveImage } from '$utils/utils';
import { MarketSpread, MarketShareByBrand } from './components';

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

const CardTitle = styled.h3`
  color: #191f28;
  margin: 0;
`;

const Card = styled(MiCard)({
  backgroundColor: '#fafafa',
  padding: '20px',
  flex: 1,
  ':not(:last-of-type)': {
    marginRight: '20px',
  },
});

const Wrap = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
  justify-content: space-between;
  position: relative;
`;

const ChartWrap = styled.div`
  display: flex;
  height: 100%;
  margin-bottom: 20px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Footer = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  padding: ;
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
const SalesVolume = () => {
  const contentWrap = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [selectYear, setSelectYear] = useState<string>(String(currentYear));
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

  const handleDownloadScreen = useCallback(() => {
    const fileName = '시판 판매량' + `(${selectYear}).png`;
    saveImage(contentWrap.current as HTMLElement, fileName);
  }, [selectYear]);

  return (
    <PageLayout headerName="시판 판매량" crumbs={getCrumbs()}>
      <Header>
        <Select
          options={selectOption()}
          onChange={handleSelectChange}
          defaultValue={selectOption()[0]}
        />

        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <Button data-html2canvas-ignore onClick={handleDownloadScreen}>
            화면 다운로드
          </Button>
          <Button data-html2canvas-ignore>보고서 다운로드</Button>
        </div>
      </Header>
      <Tabs
        items={tabItems}
        value={activeTab}
        onChange={handleTabChange}
        css={css`
          margin-top: 10px;
        `}
      />
      <Wrap>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ChartWrap>
              <Card>
                <CardTitle>시장 규모 (판매량 & 매출액)</CardTitle>
                <MarketSpread data={data?.marketSpread || []} year={selectYear} />
              </Card>
              <Card>
                <CardTitle>브랜드 점유율</CardTitle>
                <MarketShareByBrand data={data?.marketShareByBrand || []} />
              </Card>
            </ChartWrap>
            <Footer>
              [출처] 시장 점유율 조사 : 매년 상〮하반기 조사, 전국(제주 제외), 만 25~59세
              여성 가구 패널 (가구주 or 가구주 부인), 통계청 가구 정보 근거하여 6개 변인
              할당 (지역/연령/도시 규모/가구소득/가구 규모/자녀 연령), n=5000명, 온라인
              조사
            </Footer>
          </>
        )}
      </Wrap>
    </PageLayout>
  );
};

export default SalesVolume;
