import React, { useCallback, useState } from 'react';
import { PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import Header from '$pages/Report/Marketing/components/Header';

const TITLE = 'ATL';

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

const categoryOptions = [{ value: '제품', label: '제품' }];

const Atl = () => {
  const [selectedFamily, setSelectedFamily] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleFamilyChange = useCallback((value) => {
    setSelectedFamily(value);
  }, []);

  const handleProductChange = useCallback((value) => {
    setSelectedProduct(value);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const handleDateChange = useCallback((value) => {
    setSelectedDate(value);
  }, []);

  const selects = [
    {
      title: '카테고리',
      value: selectedCategory,
      onChange: handleCategoryChange,
      options: categoryOptions,
    },
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
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
      />
    </PageLayout>
  );
};

export default Atl;
