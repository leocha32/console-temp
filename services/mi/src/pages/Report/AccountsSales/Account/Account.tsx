import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { PageLayout } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from './components/Header';
import styled from '@emotion/styled';
import { AccountChart, RentTable } from './components';
import dayjs from 'dayjs';
import { familySector, productAndFunctionalGroupSelector } from '$recoils/categories';

const Wrap = styled.div`
  display: grid;
  grid-template-rows: 15% 50% auto;
  height: calc(100% - 30px);
  grid-gap: 20px;
  margin: 0 10px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const TITLE = '계정 및 판매 계정';

const setAllFunctional = (options) => {
  return options.map(({ value }) => value);
};

const Account = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
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

  useEffect(() => {
    setSelectedFunctional(setAllFunctional(functionalOptions));
  }, [functionalOptions]);
  useEffect(() => {
    setSelectedProduct(setAllFunctional(productOptions));
  }, [selectedFunctional]);

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
      disabled: !functionalOptions.length,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedProduct,
      onChange: handleProductChange,
      options: productOptions,
      disabled: !productOptions.length,
    },
  ];
  return (
    <PageLayout headerName={TITLE} crumbs={getCrumbs()} ref={contentRef}>
      <Wrap>
        <Header
          selects={selects}
          onChangeDate={handleDateChange}
          selectedDate={selectedDate}
        />
        <AccountChart></AccountChart>
        <RentTable></RentTable>
      </Wrap>
    </PageLayout>
  );
};

export default Account;
