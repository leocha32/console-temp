import React, { useRef, useCallback, useMemo, useState } from 'react';
import { IRadioGroupProps, PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import { Header, TwoAccount, ThreeAccounts, FourAccounts } from './components';

import dayjs from 'dayjs';
import {
  useAccountHoldingCombine,
  useAccountHoldingCombineDownloadExcel,
} from '$modules/report/accountSales';
import { Section } from '$pages/Report/commonStyled';
import { useRecoilState } from 'recoil';
import { accountAccountCombine } from '$recoils/filter';

const TITLE = '계정 보유 조합';

const CUSTOMER_OPTIONS = ['전체', '개인', '개인사업자', '법인사업자', '기타'];
const PURCHASE_METHOD = ['전체', '렌탈', '일시불'];

const AccountHoldingCombine = () => {
  const [filter, setFilter] = useRecoilState(accountAccountCombine);
  const { customerType, contractType, yyyymm } = filter;
  const [selectedDate, setSelectedDate] = useState(yyyymm);
  const [selectedContractType, setSelectedContractType] = useState(contractType);
  const [selectedCustomerType, setSelectedCustomerType] = useState(customerType);
  const year = dayjs(selectedDate).get('y');
  const month = dayjs(selectedDate).get('M') + 1;
  const contentRef = useRef<HTMLDivElement>(null);
  const downloadExcel = useAccountHoldingCombineDownloadExcel();

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const handleCustomerChange = useCallback((target, value) => {
    setSelectedCustomerType(value === '전체' ? null : value);
  }, []);

  const handlePurchaseChange = useCallback((target, value) => {
    setSelectedContractType(value === '전체' ? null : value);
  }, []);

  const { data, isFetching, refetch } = useAccountHoldingCombine({
    'contract-type': selectedContractType,
    'customer-type': selectedCustomerType,
    year,
    month,
  });

  const radioList: IRadioGroupProps[] = [
    {
      label: '고객 유형',
      options: CUSTOMER_OPTIONS,
      onChange: handleCustomerChange,
      value: selectedCustomerType || CUSTOMER_OPTIONS[0],
    },
    {
      label: '계약 유형',
      options: PURCHASE_METHOD,
      onChange: handlePurchaseChange,
      value: selectedContractType || PURCHASE_METHOD[0],
    },
  ];

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
  const downloadButtonProps = useMemo(
    () => ({
      category: TITLE,
      hook: downloadExcel,
      params: {
        'contract-type': selectedContractType,
        year,
        month,
      },
    }),
    [downloadExcel, year, month, selectedContractType],
  );

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      yyyymm: selectedDate,
      contractType: selectedContractType,
      customerType: selectedCustomerType,
    });
  }, [refetch, selectedDate, selectedContractType, selectedCustomerType, setFilter]);

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header
        radioButtonList={radioList}
        selectedDate={selectedDate}
        onChangeDate={handleDateChange}
        downloadButtonProps={downloadButtonProps}
        onClickSearch={handleSearch}
        isFetching={isFetching}
      ></Header>
      <Section style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {isFetching ? <Spinner /> : null}
        <TwoAccount data={getData('2계정')} />
        <ThreeAccounts data={getData('3계정')} />
        <FourAccounts data={getData('4계정')} />
      </Section>
    </PageLayout>
  );
};
export default AccountHoldingCombine;
