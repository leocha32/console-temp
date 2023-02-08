import React, { useRef, useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IRadioGroupProps, PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import { Header } from './components/Header';
import { RentTable, AccountTable } from './components';
import dayjs from 'dayjs';
import { HeaderCard, Section } from '$pages/Report/commonStyled';
import {
  familySector,
  functionalGroupSelector,
  productSelector,
} from '$recoils/categories';
import {
  useAccountStatus,
  useAccountStatusDownloadExcel,
  IAccountStatusRequestParams,
} from '$modules/report/accountSales';
import { accountAccountStatus } from '$recoils/filter';
import { useRecoilState } from 'recoil';
import SelectedItem from '$components/SelectedItem';

const TITLE = '계정';
const CUSTOMER_OPTIONS = ['전체', '개인', '개인사업자', '법인사업자', '기타'];
const PURCHASE_METHOD = ['전체', '렌탈', '일시불'];

const setAllOption = (options) => {
  return options.map(({ value }) => value);
};

const Account = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useRecoilState(accountAccountStatus);
  const { customerType, contractType, productGroup, functionalGroup, product, yyyymm } =
    filter;
  const [selectedDate, setSelectedDate] = useState(yyyymm);
  const [selectedCustomerType, setSelectedCustomerType] = useState(customerType);
  const [selectedContractType, setSelectedContractType] = useState(contractType);
  const [selectedOption, setSelectedOption] = useState({
    productGroup,
    functionalGroup,
    product,
  });
  const year = dayjs(selectedDate).get('y');
  const month = dayjs(selectedDate).get('M') + 1;
  const downloadExcel = useAccountStatusDownloadExcel();
  const familyOptions = useRecoilValue(familySector({ category: '제품' }));
  const functionalOptions = useRecoilValue(
    functionalGroupSelector({
      category: '제품',
      family: selectedOption.productGroup || setAllOption(familyOptions),
    }),
  );
  const isFunctionalAllCheck = useMemo(
    () =>
      !selectedOption.functionalGroup ||
      selectedOption.functionalGroup?.length === functionalOptions.length,
    [selectedOption, functionalOptions],
  );

  const productOptions = useRecoilValue(
    productSelector({
      category: '제품',
      family: selectedOption.productGroup || setAllOption(familyOptions),
      functionalGroup: isFunctionalAllCheck ? null : selectedOption.functionalGroup,
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

  const { data, refetch, isFetching } = useAccountStatus({
    'contract-type': selectedContractType,
    'customer-type': selectedCustomerType,
    'product-groups': isFamilyAllCheck ? null : selectedOption.productGroup?.join(','),
    'function-groups': isFunctionalAllCheck
      ? null
      : selectedOption.functionalGroup?.join(','),
    products: isProductAllCheck ? null : selectedOption.product?.join(','),
    year,
    month,
  });

  const selectItem = useMemo(() => {
    return [
      {
        title: '선택한 제품군',
        value: isFamilyAllCheck ? '전체' : selectedOption.productGroup?.join(', '),
      },
      {
        title: '선택한 기능군',
        value: isFunctionalAllCheck ? '전체' : selectedOption.functionalGroup?.join(', '),
      },
      {
        title: '선택한 제품',
        value: isProductAllCheck ? '전체' : selectedOption.product?.join(', '),
      },
    ];
  }, [isFamilyAllCheck, isProductAllCheck, selectedOption, isFunctionalAllCheck]);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const handleFamilyChange = useCallback((value) => {
    setSelectedOption({
      productGroup: value,
      product: null,
      functionalGroup: null,
    });
  }, []);

  const handleFunctionalChange = useCallback((value) => {
    setSelectedOption((pre) => ({
      ...pre,
      functionalGroup: value,
      product: null,
    }));
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedOption((pre) => ({
      ...pre,
      product: value,
    }));
  }, []);

  const handleCustomerChange = useCallback((target, value) => {
    setSelectedCustomerType(value === '전체' ? null : value);
  }, []);

  const handlePurchaseChange = useCallback((target, value) => {
    setSelectedContractType(value === '전체' ? null : value);
  }, []);

  const handleSearch = useCallback(() => {
    refetch();
    setFilter({
      ...selectedOption,
      contractType: selectedContractType,
      customerType: selectedCustomerType,
      yyyymm: selectedDate,
    });
  }, [
    refetch,
    setFilter,
    selectedContractType,
    selectedOption,
    selectedCustomerType,
    selectedDate,
  ]);

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
      title: '기능군',
      multiple: true,
      value: selectedOption.functionalGroup || setAllOption(functionalOptions),
      onChange: handleFunctionalChange,
      options: functionalOptions,
      disabled: !functionalOptions.length || isFamilyAllCheck,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedOption.product || setAllOption(productOptions),
      onChange: handleProductChange,
      options: productOptions,
      disabled: !productOptions.length || isFamilyAllCheck,
    },
  ];
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

  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Header<IAccountStatusRequestParams>
        radioButtonList={radioList}
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
        downloadButtonProps={downloadButtonProps}
        onClickSearch={handleSearch}
        isFetching={isFetching}
      ></Header>
      <HeaderCard>
        <SelectedItem items={selectItem} />
      </HeaderCard>
      <Section>
        {isFetching ? <Spinner /> : null}
        <AccountTable
          searchInfo={{
            selectList: [isFamilyAllCheck, isFunctionalAllCheck, isProductAllCheck],
            date: selectedDate,
          }}
          data={data?.accountStatus.monthlyAccountStatusRows}
        ></AccountTable>
        <RentTable data={data?.rentalIndicator}></RentTable>
      </Section>
    </PageLayout>
  );
};

export default Account;
