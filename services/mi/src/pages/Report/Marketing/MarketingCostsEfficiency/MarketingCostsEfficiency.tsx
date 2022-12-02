import React, { useCallback, useMemo, useState } from 'react';
import { PageLayout, Spinner } from 'mi-ui/src';
import dayjs from 'dayjs';
import { getCrumbs } from '$utils/utils';
import { Section, HeaderCard } from '$pages/Report/commonStyled';
import Header from '$pages/Report/Marketing/components/Header';
import {
  IMarketingCostsEfficiencyParams,
  useCostEfficiencyDownloadExcel,
  useMarketingCostsEfficiency,
  IMarketingCostStatus,
  IMarketingEfficiencyStatus,
} from '$modules/report/marketing';

import MarketingEfficiency from './components/MarketingEfficiency';
import MarketingStatus from './components/MarketingStatus';
import { useRecoilState, useRecoilValue } from 'recoil';
import { familySector, productAndFunctionalGroupSelector } from '$recoils/categories';
import { marketingCostEfficiency } from '$recoils/filter';
import SelectedItem from '$components/SelectedItem';

const TITLE = '마케팅 비용 및 효율 ';

const setAllOption = (options) => {
  return options.map(({ value }) => value);
};

const MarketingCostsEfficiency = () => {
  const [filter, setFilter] = useRecoilState(marketingCostEfficiency);
  const { product, productGroup, yyyymm } = filter;
  const [selectedOption, setSelectedOption] = useState({
    product,
    productGroup,
  });
  const [selectedDate, setSelectedDate] = useState(yyyymm);
  const year = dayjs(selectedDate).get('y');
  const month = dayjs(selectedDate).get('M') + 1;
  const familyOptions = useRecoilValue(familySector({ category: '제품' }));
  const downloadExcel = useCostEfficiencyDownloadExcel();

  const { product: productOptions } = useRecoilValue(
    productAndFunctionalGroupSelector({
      category: '제품',
      family: selectedOption.productGroup || setAllOption(familyOptions),
    }),
  );
  const isFamilyAllCheck = useMemo(
    () =>
      !selectedOption.productGroup ||
      selectedOption.productGroup?.length === familyOptions.length,
    [selectedOption, familyOptions],
  );
  const isProductAllCheck = useMemo(
    () =>
      !selectedOption.product || selectedOption.product?.length === productOptions.length,
    [selectedOption, productOptions],
  );

  const selectItem = useMemo(() => {
    return [
      {
        title: '선택한 제품군',
        value: isFamilyAllCheck ? '전체' : selectedOption.productGroup?.join(', '),
      },
      {
        title: '선택한 제품',
        value: isProductAllCheck ? '전체' : selectedOption.product?.join(', '),
      },
    ];
  }, [isFamilyAllCheck, isProductAllCheck, selectedOption]);

  const { data, refetch, isFetching } = useMarketingCostsEfficiency({
    category2: isFamilyAllCheck ? null : selectedOption.productGroup?.join(','),
    category3: isProductAllCheck ? null : selectedOption.product?.join(','),
    year,
    month,
  });

  const handleFamilyChange = useCallback((value) => {
    setSelectedOption({
      productGroup: value,
      product: null,
    });
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedOption((pre) => ({
      ...pre,
      product: value,
    }));
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const downloadButtonProps = useMemo(
    () => ({
      category: TITLE,
      hook: downloadExcel,
      params: {
        year,
        month,
      },
    }),
    [downloadExcel, year, month],
  );

  const selects = [
    {
      title: '제품군',
      multiple: true,
      value: selectedOption.productGroup || setAllOption(familyOptions),
      onChange: handleFamilyChange,
      options: familyOptions,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedOption.product || setAllOption(productOptions),
      onChange: handleProductChange,
      options: productOptions,
      disabled: !selectedOption.productGroup?.length || isFamilyAllCheck,
    },
  ];

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      ...selectedOption,
      yyyymm: selectedDate,
    });
  }, [refetch, setFilter, selectedOption, selectedDate]);

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header<IMarketingCostsEfficiencyParams>
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
        downloadButtonProps={downloadButtonProps}
        onClickSearch={handleSearch}
        isFetching={isFetching}
      />
      <HeaderCard>
        <SelectedItem items={selectItem} />
      </HeaderCard>
      <Section>
        {isFetching ? <Spinner /> : null}
        <MarketingStatus data={data?.marketingCostStatus as IMarketingCostStatus} />
        <MarketingEfficiency
          data={data?.marketingEfficiencyStatus as IMarketingEfficiencyStatus}
        />
      </Section>
    </PageLayout>
  );
};

export default MarketingCostsEfficiency;
