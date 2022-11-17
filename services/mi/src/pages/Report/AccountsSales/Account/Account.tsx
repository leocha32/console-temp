import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { IRadioGroupProps, PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from './components/Header';
import styled from '@emotion/styled';
import { AccountChart, RentTable } from './components';
import dayjs from 'dayjs';
import { familySector, productAndFunctionalGroupSelector } from '$recoils/categories';
import { useAccountStatus } from '$modules/report/accountSales';
const Wrap = styled.div`
  display: grid;
  grid-template-rows: 60% auto;
  height: calc(100% - 30px);
  grid-gap: 20px;
  margin: 0 10px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  position: relative;
`;

const TITLE = '계정 및 판매 계정';
const CUSTOMER_OPTIONS = ['전체', '개인', '개인사업자', '법인사업자'];
const PURCHASE_METHOD = ['전체', '렌탈', '일시불'];

const setAllFunctional = (options) => {
  return options.map(({ value }) => value);
};

const Account = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [customerState, setCustomerState] = useState(CUSTOMER_OPTIONS[0]);
  const [purchaseMethodState, setPurchaseMethodState] = useState(PURCHASE_METHOD[0]);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const familyOptions = useRecoilValue(familySector({ category: '제품' }));
  const [selectedFamily, setSelectedFamily] = useState(
    familyOptions.map(({ value }) => value),
  );
  const { functionalGroup: functionalOptions, product: productOptions } = useRecoilValue(
    productAndFunctionalGroupSelector({ category: '제품', family: selectedFamily }),
  );
  const [selectedFunctional, setSelectedFunctional] = useState(
    setAllFunctional(functionalOptions),
  );

  const [selectedProduct, setSelectedProduct] = useState(
    setAllFunctional(productOptions),
  );

  const handleFamilyChange = useCallback((value) => {
    setSelectedFamily(value);
  }, []);

  const handleFunctionalChange = useCallback((value) => {
    setSelectedFunctional(value);
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedProduct(value);
  }, []);

  const handleCustomerChange = useCallback((target, value) => {
    setCustomerState(value);
  }, []);

  const handlePurchaseChange = useCallback((target, value) => {
    setPurchaseMethodState(value);
  }, []);

  const isFamilyAllCheck = useMemo(
    () => selectedFamily.length === familyOptions.length,
    [selectedFamily, familyOptions],
  );

  const isFunctionalAllCheck = useMemo(
    () => selectedFunctional.length === functionalOptions.length,
    [selectedFunctional, functionalOptions],
  );

  const isProductAllCheck = useMemo(
    () => selectedProduct.length === productOptions.length,
    [selectedProduct, productOptions],
  );

  useEffect(() => {
    setSelectedFunctional(setAllFunctional(functionalOptions));
  }, [functionalOptions]);
  useEffect(() => {
    setSelectedProduct(setAllFunctional(productOptions));
  }, [selectedFunctional]);

  const { data, isFetching, refetch } = useAccountStatus(
    {
      'contract-type': purchaseMethodState === '전체' ? 'ALL' : purchaseMethodState,
      'customer-type': customerState === '전체' ? 'ALL' : customerState,
      'product-groups': isFamilyAllCheck ? null : selectedFamily.join(','),
      'function-groups': isFunctionalAllCheck ? null : selectedFunctional.join(','),
      products: isProductAllCheck ? null : selectedProduct.join(','),
      year: selectedDate.get('y'),
      month: selectedDate.get('M') + 1,
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [
    purchaseMethodState,
    customerState,
    selectedFamily,
    selectedFunctional,
    selectedProduct,
  ]);

  const selects = [
    {
      title: '제품군',
      multiple: true,
      value: selectedFamily,
      onChange: handleFamilyChange,
      options: familyOptions,
    },
    {
      title: '기능군',
      multiple: true,
      value: selectedFunctional,
      onChange: handleFunctionalChange,
      options: functionalOptions,
      disabled: !functionalOptions.length || isFamilyAllCheck,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedProduct,
      onChange: handleProductChange,
      options: productOptions,
      disabled: !productOptions.length || isFamilyAllCheck,
    },
  ];
  const radioList: IRadioGroupProps[] = [
    {
      options: CUSTOMER_OPTIONS,
      onChange: handleCustomerChange,
      value: customerState,
    },
    {
      options: PURCHASE_METHOD,
      onChange: handlePurchaseChange,
      value: purchaseMethodState,
    },
  ];
  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        radioButtonList={radioList}
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
      ></Header>
      <Wrap>
        {isFetching ? <Spinner /> : null}
        <AccountChart
          data={data?.accountStatus.monthlyAccountStatusRows || []}
        ></AccountChart>
        <RentTable data={data?.rentalIndicator}></RentTable>
      </Wrap>
    </PageLayout>
  );
};

export default Account;
