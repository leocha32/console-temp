import React, { useCallback, useMemo, useState } from 'react';
import { PageLayout, Spinner } from 'mi-ui/src';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Section } from '$pages/Report/commonStyled';
import { getCrumbs } from '$utils/utils';
import dayjs from 'dayjs';
import { Header, KeywordSearchTermAnalysis, KeywordSearchTrend } from './components';
import { marketingKeywordAnalysis } from '$recoils/filter';
import {
  IKeywordAnalysisDownloadParams,
  TKeywordSearchAnalysis,
  TKeywordSearchTrend,
  useKeywordAnalysis,
  useKeywordAnalysisDownloadExcel,
} from '$modules/report/marketing';
import { familySector } from '$recoils/categories';
import { IData } from 'mi-ui/src/components/Atoms/DateComparePicker/ScrollDatePicker';
import { SearchType } from '$constants/enum';

const TITLE = '키워드 분석';

const KeywordAnalysis = () => {
  const [
    {
      productGroup,
      startYyyymmdd,
      endYyyymmdd,
      compStartYyyymmdd,
      compEndYyyymmdd,
      isCompare,
      ...filter
    },
    setFilter,
  ] = useRecoilState(marketingKeywordAnalysis);
  const familyOptions = useRecoilValue(familySector({ category: '제품' }));

  const [selectedProductGroup, setSelectedProductGroup] = useState(productGroup);
  const [selectedDateCompareOptions, setSelectedDateCompareOptions] = useState({
    startYyyymmdd: dayjs(startYyyymmdd),
    endYyyymmdd: dayjs(endYyyymmdd),
    compStartYyyymmdd: dayjs(compStartYyyymmdd),
    compEndYyyymmdd: dayjs(compEndYyyymmdd),
    isCompare,
  });

  const downloadExcel = useKeywordAnalysisDownloadExcel();
  const { data, refetch, isFetching } = useKeywordAnalysis({
    'product-group': selectedProductGroup,
    from: dayjs(selectedDateCompareOptions.startYyyymmdd).format('YYYY-MM-DD'),
    to: dayjs(selectedDateCompareOptions.endYyyymmdd).format('YYYY-MM-DD'),
    'from-comp': selectedDateCompareOptions.isCompare
      ? dayjs(selectedDateCompareOptions.compStartYyyymmdd).format('YYYY-MM-DD')
      : '',
    'to-comp': selectedDateCompareOptions.isCompare
      ? dayjs(selectedDateCompareOptions.compEndYyyymmdd).format('YYYY-MM-DD')
      : '',
  });

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      ...filter,
      ...selectedDateCompareOptions,
      productGroup: selectedProductGroup,
    });
  }, [filter, refetch, setFilter, selectedProductGroup, selectedDateCompareOptions]);

  const handleFamilyChange = useCallback((value) => {
    setSelectedProductGroup(value);
  }, []);

  const handleDateComparePickerApply = useCallback((data: IData) => {
    const { selectedDate, compareDate, isCompare } = data;
    setSelectedDateCompareOptions({
      isCompare,
      endYyyymmdd: selectedDate.endDate,
      startYyyymmdd: selectedDate.startDate,
      compEndYyyymmdd: compareDate.endDate,
      compStartYyyymmdd: compareDate.startDate,
    });
  }, []);

  const selectProps = useMemo(
    () => ({
      title: '제품군',
      value: selectedProductGroup,
      onChange: handleFamilyChange,
      options: familyOptions,
    }),
    [selectedProductGroup, familyOptions, handleFamilyChange],
  );

  const datePickerProps = useMemo(
    () => ({
      onApply: handleDateComparePickerApply,
      selectedDate: {
        startDate: selectedDateCompareOptions.startYyyymmdd,
        endDate: selectedDateCompareOptions.endYyyymmdd,
      },
      compareDate: {
        startDate: selectedDateCompareOptions.compStartYyyymmdd,
        endDate: selectedDateCompareOptions.compEndYyyymmdd,
      },
      minDate: dayjs('2015-01-01'),
      isCompare: selectedDateCompareOptions.isCompare,
    }),
    [handleDateComparePickerApply, selectedDateCompareOptions],
  );
  const downloadButtonProps = useMemo(
    () => ({
      category: TITLE,
      hook: downloadExcel,
      params: {
        'product-group': selectedProductGroup,
        to: dayjs(selectedDateCompareOptions.endYyyymmdd).format('YYYY-MM-DD'),
        criteria:
          filter.searchType === SearchType.month ? ('M' as const) : ('D' as const),
      },
    }),
    [
      downloadExcel,
      selectedProductGroup,
      selectedDateCompareOptions.endYyyymmdd,
      filter.searchType,
    ],
  );

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header<IKeywordAnalysisDownloadParams>
        selectProps={selectProps}
        datePickerProps={datePickerProps}
        onClick={handleSearch}
        isLoading={isFetching}
        downloadButtonProps={downloadButtonProps}
      />

      <Section>
        {isFetching ? <Spinner /> : null}
        <KeywordSearchTermAnalysis
          data={data?.keywordSearchAnalysis as TKeywordSearchAnalysis}
          keyword={productGroup}
          isCompare={isCompare}
        />
        <KeywordSearchTrend data={data?.keywordSearchTrend as TKeywordSearchTrend} />
      </Section>
    </PageLayout>
  );
};

export default KeywordAnalysis;
