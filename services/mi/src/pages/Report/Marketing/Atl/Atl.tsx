import React, { useCallback, useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from '$pages/Report/Marketing/components/Header';
import { ContentsWrap, Wrap } from '$pages/Report/commonStyled';
import MediaCostStatus from './components/MediaCostStatus';
import MediaPerformance from './components/MediaPerformance';
import CompetitorExecutionStatus from './components/CompetitorExecutionStatus';
import {
  familySector,
  productAndFunctionalGroupSelector,
  categorySector,
} from '$recoils/categories';
import { useRecoilValue } from 'recoil';
import { useAtl } from '$modules/report/marketing/atl';

const TITLE = 'ATL';

const Atl = () => {
  const categoryOptions = useRecoilValue(categorySector);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]?.value);
  const familyOptions = useRecoilValue(familySector({ category: selectedCategory }));
  const [selectedFamily, setSelectedFamily] = useState(
    familyOptions.map(({ value }) => value),
  );

  const { product: productOptions } = useRecoilValue(
    productAndFunctionalGroupSelector({
      category: selectedCategory,
      family: selectedFamily,
    }),
  );
  const [selectedProduct, setSelectedProduct] = useState(
    productOptions.map(({ value }) => value),
  );
  const isFamilyAllCheck = useMemo(
    () => selectedFamily.length === familyOptions.length,
    [selectedFamily, familyOptions],
  );

  const [selectedDate, setSelectedDate] = useState(dayjs().add(-2, 'M'));

  const { data, isFetching, refetch } = useAtl(
    {
      category1: selectedCategory,
      category2: selectedFamily.join(','),
      category3: selectedProduct.join(','),
      year: selectedDate.get('y'),
      month: selectedDate.get('M') + 1,
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    setSelectedFamily(familyOptions.map(({ value }) => value));
  }, [familyOptions]);

  useEffect(() => {
    setSelectedProduct(productOptions.map(({ value }) => value));
  }, [productOptions]);

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedProduct, selectedDate, selectedFamily]);

  const handleFamilyChange = useCallback((value) => {
    setSelectedFamily(value);
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedProduct(value);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const selects = [
    {
      title: '카테고리',
      value: selectedCategory,
      onChange: handleCategoryChange,
      options: categoryOptions,
    },
    {
      title: '제품군',
      multiple: true,
      value: selectedFamily,
      onChange: handleFamilyChange,
      options: familyOptions,
      disabled: !selectedCategory,
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
        <ContentsWrap direction={'column'}>
          {isFetching ? <Spinner /> : null}
          <MediaCostStatus data={data?.atlMediaCostStatus} />
          <MediaPerformance data={data?.atlMediaPerformanceStatus} />
          <CompetitorExecutionStatus data={data?.atlMediaCostByCompanyStatus} />
        </ContentsWrap>
      </Wrap>
    </PageLayout>
  );
};

export default Atl;
