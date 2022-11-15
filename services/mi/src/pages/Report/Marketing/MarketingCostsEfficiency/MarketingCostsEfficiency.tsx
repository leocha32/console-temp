import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { PageLayout, Spinner, Card } from 'mi-ui/src';
import dayjs from 'dayjs';
import { getCrumbs } from '$utils/utils';
import { Wrap, ContentsWrap } from '$pages/Report/commonStyled';
import Header from '$pages/Report/Marketing/components/Header';
import { useMarketingCostsEfficiency } from '$modules/report/marketing/marketingCostsEfficiency';

import MarketingEfficiency from './components/MarketingEfficiency';
import MarketingStatus from './components/MarketingStatus';
import { useRecoilValue } from 'recoil';
import { familySector, productAndFunctionalGroupSelector } from '$recoils/categories';
import styled from '@emotion/styled';

const TITLE = '마케팅 비용 및 효율 ';

const setAllProduct = (options) => {
  return options.map(({ value }) => value);
};

const HeaderCard = styled(Card)`
  margin-bottom: 15px;
  padding: 15px 20px;
`;
const SelectedItemWrap = styled.div`
  display: flex;
  font-size: 14px;
  color: ${({ theme }) => theme.palettes.gray.GRAY_700};
  :not(:last-of-type) {
    margin-bottom: 5px;
  }
`;
const Dl = styled.dl`
  margin: 0;
`;
const Dt = styled.dt`
  width: 100px;
`;
const Dd = styled.dd`
  margin: 0;
`;

const SelectedItem = ({ title, value }: { title: string; value: string }) => (
  <SelectedItemWrap>
    <Dt>{title}:</Dt>
    <Dd>{value}</Dd>
  </SelectedItemWrap>
);

const MarketingCostsEfficiency = () => {
  const familyOptions = useRecoilValue(familySector({ category: '제품' }));
  const [selectedFamily, setSelectedFamily] = useState(
    familyOptions.map(({ value }) => value),
  );
  const { product: productOptions } = useRecoilValue(
    productAndFunctionalGroupSelector({ category: '제품', family: selectedFamily }),
  );
  const [selectedProduct, setSelectedProduct] = useState(setAllProduct(productOptions));
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const isFamilyAllCheck = useMemo(
    () => selectedFamily.length === familyOptions.length,
    [selectedFamily, familyOptions],
  );
  const isProductAllCheck = useMemo(
    () => selectedProduct.length === productOptions.length,
    [selectedProduct, productOptions],
  );
  const { data, refetch, isFetching } = useMarketingCostsEfficiency(
    {
      category2: isFamilyAllCheck ? null : selectedFamily.join(','),
      category3: isProductAllCheck ? null : selectedProduct.join(','),
      year: selectedDate.get('y'),
      month: selectedDate.get('M') + 1,
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [selectedProduct, selectedDate, selectedFamily]);

  useEffect(() => {
    setSelectedProduct(setAllProduct(productOptions));
  }, [productOptions]);

  const handleFamilyChange = useCallback((value) => {
    setSelectedFamily(value);
  }, []);
  const handleProductChange = useCallback((value) => {
    setSelectedProduct(value);
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const selects = [
    {
      title: '제품군',
      multiple: true,
      value: selectedFamily,
      onChange: handleFamilyChange,
      options: familyOptions,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedProduct,
      onChange: handleProductChange,
      options: productOptions,
      disabled: !selectedFamily.length || isFamilyAllCheck,
    },
  ];
  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
      />
      <Wrap>
        <HeaderCard>
          <Dl>
            <SelectedItem
              title="선택한 제품군"
              value={isFamilyAllCheck ? '전체' : selectedFamily.join(', ')}
            />
            <SelectedItem
              title="선택한 제품"
              value={isProductAllCheck ? '전체' : selectedProduct.join(', ')}
            />
          </Dl>
        </HeaderCard>

        <ContentsWrap direction={'column'}>
          {isFetching ? <Spinner /> : null}
          <MarketingStatus data={data?.marketingCostStatus} />
          <MarketingEfficiency data={data?.marketingEfficiencyStatus} />
        </ContentsWrap>
      </Wrap>
    </PageLayout>
  );
};

export default MarketingCostsEfficiency;
