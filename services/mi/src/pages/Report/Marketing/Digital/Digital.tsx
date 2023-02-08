import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { IRadioGroupProps, PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { marketingDigital } from '$recoils/filter';
import { Header, OnlinePerformance, OnlineStatus } from './components';
import { HeaderCard, Section, Tabs } from '$pages/Report/commonStyled';
import { categorySector, familySector, productSelector } from '$recoils/categories';
import { IData } from 'mi-ui/src/components/Atoms/DateComparePicker/ScrollDatePicker';
import dayjs from 'dayjs';
import {
  TMarketingDigitalCampaignPerformance,
  TMarketingDigitalCampaignStatus,
  useAtlDownloadExcel,
  useDigitalCampaign,
} from '$modules/index';
import SelectedItem from '$components/SelectedItem';
const TITLE = 'DIGITAL';

const setAllOption = (options) => {
  return options.map(({ value }) => value);
};

const enum TabType {
  PERFORMANCE = 'performance',
  STATUS = 'status',
}

const tabItems = [
  {
    value: TabType.PERFORMANCE,
    label: '온라인 실적',
  },
  {
    value: TabType.STATUS,
    label: '온라인 현황',
  },
];

const Digital = () => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const downloadExcel = useAtlDownloadExcel();
  const categoryOptions = useRecoilValue(categorySector);
  const [filter, setFilter] = useRecoilState(marketingDigital);
  const {
    orderType,
    category1,
    category2,
    category3,
    startYyyymmdd,
    endYyyymmdd,
    compStartYyyymmdd,
    compEndYyyymmdd,
    isCompare,
  } = filter;

  const [selectOrderType, setSelectOrderType] = useState(orderType);
  const [selectedOption, setSelectedOption] = useState({
    category1,
    category2,
    category3,
  });
  const [selectedDateCompareOptions, setSelectedDateCompareOptions] = useState({
    startYyyymmdd: dayjs(startYyyymmdd),
    endYyyymmdd: dayjs(endYyyymmdd),
    compStartYyyymmdd: dayjs(compStartYyyymmdd),
    compEndYyyymmdd: dayjs(compEndYyyymmdd),
    isCompare,
  });

  const familyOptions = useRecoilValue(
    familySector({ category: selectedOption?.category1 }),
  );
  const productOptions = useRecoilValue(
    productSelector({
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

  const reqParams = {
    'order-type': selectOrderType,
    category1: selectedOption.category1,
    category2: isFamilyAllCheck ? null : selectedOption?.category2?.join(', '),
    category3: isProductAllCheck ? null : selectedOption?.category3?.join(', '),
    from: dayjs(selectedDateCompareOptions.startYyyymmdd).format('YYYY-MM-DD'),
    to: dayjs(selectedDateCompareOptions.endYyyymmdd).format('YYYY-MM-DD'),
    'from-comp': selectedDateCompareOptions.isCompare
      ? dayjs(selectedDateCompareOptions.compStartYyyymmdd).format('YYYY-MM-DD')
      : '',
    'to-comp': selectedDateCompareOptions.isCompare
      ? dayjs(selectedDateCompareOptions.compEndYyyymmdd).format('YYYY-MM-DD')
      : '',
  };

  const { data, refetch, isFetching } = useDigitalCampaign(reqParams, activeTab);

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

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      ...filter,
      ...selectedDateCompareOptions,
      ...selectedOption,
      orderType: selectOrderType,
    });
  }, [
    refetch,
    filter,
    setFilter,
    selectOrderType,
    selectedDateCompareOptions,
    selectedOption,
  ]);

  const downloadButtonProps = useMemo(
    () => ({
      category: TITLE,
      hook: downloadExcel,
      params: {
        year: 2022,
        month: 12,
      },
    }),
    [downloadExcel],
  );

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
      disabled:
        !selectedOption?.category2?.length ||
        isFamilyAllCheck ||
        selectedOption?.category1 === '제품외',
    },
  ];

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
  const handleOrderType = useCallback((target, value) => {
    setSelectOrderType(value);
  }, []);

  const radioList: IRadioGroupProps[] = [
    {
      options: ['총주문', '순주문'],
      onChange: handleOrderType,
      value: selectOrderType,
    },
  ];

  const handleTabChange = useCallback(
    (e, value) => {
      setActiveTab(value);
    },
    [setActiveTab],
  );

  useEffect(() => {
    refetch();
  }, [refetch, activeTab]);

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header
        datePickerProps={datePickerProps}
        selects={selects}
        radioButtonList={radioList}
        onClick={handleSearch}
        isLoading={isFetching}
        downloadButtonProps={downloadButtonProps}
      ></Header>
      <HeaderCard>
        <SelectedItem items={selectItem} />
      </HeaderCard>
      <Tabs items={tabItems} value={activeTab} onChange={handleTabChange} />
      <Section>
        {isFetching ? <Spinner /> : null}
        {activeTab === TabType.PERFORMANCE ? (
          <OnlinePerformance
            data={
              data?.marketingDigitalCampaignPerformance as TMarketingDigitalCampaignPerformance
            }
          />
        ) : (
          <OnlineStatus
            data={data?.marketingDigitalCampaignStatus as TMarketingDigitalCampaignStatus}
          />
        )}
      </Section>
    </PageLayout>
  );
};

export default Digital;
