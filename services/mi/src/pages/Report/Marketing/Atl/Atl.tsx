import React, { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from '$pages/Report/Marketing/components/Header';
import { HeaderCard, Section } from '$pages/Report/commonStyled';
import MediaCostStatus from './components/MediaCostStatus';
import MediaPerformance from './components/MediaPerformance';
import CompetitorExecutionStatus from './components/CompetitorExecutionStatus';
import {
  familySector,
  productAndFunctionalGroupSelector,
  categorySector,
} from '$recoils/categories';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  useAtl,
  useAtlDownloadExcel,
  IAtlParams,
  IATLMediaCostByCompanyStatus,
  IATLMediaCostStatus,
  IATLMediaPerformanceStatus,
} from '$modules/report/marketing';
import { marketingAtl } from '$recoils/filter/atom';
import SelectedItem from '$components/SelectedItem';

const TITLE = 'ATL';
const setAllOption = (options) => {
  return options.map(({ value }) => value);
};
const Atl = () => {
  const categoryOptions = useRecoilValue(categorySector);
  const [filter, setFilter] = useRecoilState(marketingAtl);
  const { category1, category2, category3, yyyymm } = filter;
  const [selectedOption, setSelectedOption] = useState({
    category1,
    category2,
    category3,
  });
  const [selectedDate, setSelectedDate] = useState(yyyymm);
  const downloadExcel = useAtlDownloadExcel();
  const year = dayjs(selectedDate).get('y');
  const month = dayjs(selectedDate).get('M') + 1;
  const familyOptions = useRecoilValue(
    familySector({ category: selectedOption?.category1 }),
  );
  const { product: productOptions } = useRecoilValue(
    productAndFunctionalGroupSelector({
      category: selectedOption?.category1,
      family: selectedOption?.category2 || setAllOption(familyOptions),
    }),
  );

  const isFamilyAllCheck = useMemo(
    () =>
      !selectedOption?.category2 ||
      selectedOption?.category2?.length === familyOptions.length,
    [selectedOption, familyOptions],
  );

  const isProductAllCheck = useMemo(
    () =>
      !selectedOption?.category3 ||
      selectedOption?.category3?.length === productOptions.length,
    [selectedOption, productOptions],
  );

  const { data, isFetching, refetch } = useAtl({
    category1: selectedOption.category1,
    category2: isFamilyAllCheck ? null : selectedOption.category2?.join(','),
    category3: isProductAllCheck ? null : selectedOption.category3?.join(','),
    year,
    month,
  });

  const selectItem = useMemo(() => {
    return [
      {
        title: '선택한 제품군',
        value: isFamilyAllCheck ? '전체' : selectedOption?.category2?.join(', '),
      },
      {
        title: '선택한 제품',
        value: isProductAllCheck ? '전체' : selectedOption?.category3?.join(', '),
      },
    ];
  }, [isFamilyAllCheck, isProductAllCheck, selectedOption]);

  const handleFamilyChange = useCallback((value) => {
    setSelectedOption((pre) => ({
      ...pre,
      category2: value,
      category3: null,
    }));
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedOption((pre) => ({
      ...pre,
      category3: value,
    }));
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setSelectedOption({
      category1: value,
      category2: null,
      category3: null,
    });
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      ...selectedOption,
      yyyymm: selectedDate,
    });
  }, [refetch, setFilter, selectedDate, selectedOption]);

  const downloadButtonProps = useMemo(
    () => ({
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
      title: '카테고리',
      value: selectedOption?.category1,
      onChange: handleCategoryChange,
      options: categoryOptions,
    },
    {
      title: '제품군',
      multiple: true,
      value: selectedOption?.category2 || setAllOption(familyOptions),
      onChange: handleFamilyChange,
      options: familyOptions,
      disabled: !selectedOption?.category1,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedOption?.category3 || setAllOption(productOptions),
      onChange: handleProductChange,
      options: productOptions,
      disabled: !selectedOption?.category2?.length || isFamilyAllCheck,
    },
  ];

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header<IAtlParams>
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
        <MediaCostStatus data={data?.atlMediaCostStatus as IATLMediaCostStatus} />
        <MediaPerformance
          data={data?.atlMediaPerformanceStatus as IATLMediaPerformanceStatus}
        />
        <CompetitorExecutionStatus
          data={data?.atlMediaCostByCompanyStatus as IATLMediaCostByCompanyStatus}
        />
      </Section>
    </PageLayout>
  );
};

export default Atl;
