import React, { useRef, useState, useCallback, useEffect } from 'react';
import { IRadioGroupProps, PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import styled from '@emotion/styled';
import { Header, TwoAccount, ThreeAccounts, FourAccounts } from './components';

import dayjs from 'dayjs';
import { useAccountHoldingCombine } from '$modules/report/accountSales';

export const Wrap = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  height: 'fit-content';
  grid-gap: 15px;
  position: relative;
`;
export const ContentsWrap = styled.div`
  display: flex;
  height: 100%;
  min-height: 600px;
  position: relative;
  gap: 20px;
  flex-direction: ${({ direction = 'row' }: { direction?: string }) => direction};
`;
const TITLE = '계정 보유 조합';

const CUSTOMER_OPTIONS = ['전체', '개인', '개인사업자', '법인사업자'];
const PURCHASE_METHOD = ['전체', '렌탈', '일시불'];

const AccountHoldingCombine = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().add(-2, 'M'));

  const [customerState, setCustomerState] = useState(CUSTOMER_OPTIONS[0]);
  const [purchaseMethodState, setPurchaseMethodState] = useState(PURCHASE_METHOD[0]);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const handleCustomerChange = useCallback((target, value) => {
    setCustomerState(value);
  }, []);

  const handlePurchaseChange = useCallback((target, value) => {
    setPurchaseMethodState(value);
  }, []);

  const { data, isFetching, refetch } = useAccountHoldingCombine(
    {
      'contract-type': purchaseMethodState === '전체' ? '' : purchaseMethodState,
      'customer-type': customerState === '전체' ? '' : customerState,
      year: selectedDate.get('y'),
      month: selectedDate.get('M') + 1,
    },
    {
      enabled: false,
    },
  );

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

  useEffect(() => {
    refetch();
  }, [selectedDate, customerState, purchaseMethodState]);

  const getData = (name) => {
    if (data) {
      const { productCombinationRows } = data.accountCombination;
      return productCombinationRows.filter(
        ({ accountCountGroup }) => accountCountGroup === name,
      );
    } else {
      return null;
    }
  };
  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        radioButtonList={radioList}
        selectedDate={selectedDate}
        onChangeDate={handleDateChange}
      ></Header>
      <Wrap>
        {isFetching ? <Spinner /> : null}
        <TwoAccount data={getData('2계정')} />
        <ThreeAccounts data={getData('3계정')} />
        <FourAccounts data={getData('4계정')} />
      </Wrap>
    </PageLayout>
  );
};
export default AccountHoldingCombine;
