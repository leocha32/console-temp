import React, { useRef, useState, useCallback } from 'react';
import { PageLayout, Spinner, Card, BarChart } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from '../components/Header';
import styled from '@emotion/styled';
import { AccountChart, RentTable } from './components';

const Wrap = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr 30%;
  margin: 0 10px;
  grid-gap: 10px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const TITLE = '계정 및 판매 계정';
const familyOptions = [
  { value: '정수기', label: '정수기' },
  { value: '정수기1', label: '정수기' },
  { value: '정수기2', label: '정수기' },
  { value: '정수기3', label: '정수기' },
  { value: '정수기4', label: '정수기' },
  { value: '정수기5', label: '정수기' },
  { value: '정수기6', label: '정수기' },
];
const productOptions = [{ value: '얼음정수기', label: '얼음정수기' }];
const Account = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedFamily, setSelectedFamily] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFamilyChange = useCallback((value) => {
    setSelectedFamily(value);
  }, []);
  const handleProductChange = useCallback((value) => {
    setSelectedProduct(value);
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);
  const selects = [
    {
      title: '제품군',
      multiple: true,
      value: selectedFamily,
      onChange: handleFamilyChange,
      options: familyOptions,
    },
    {
      title: '제품',
      multiple: true,
      value: selectedProduct,
      onChange: handleProductChange,
      options: productOptions,
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
