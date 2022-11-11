import React, { useCallback, useState } from 'react';
import { PageLayout, Spinner } from 'mi-ui/src';
import { getCrumbs } from '$utils/utils';
import { Wrap, ContentsWrap } from '$pages/Report/commonStyled';
import Header from '$pages/Report/Marketing/components/Header';

import MarketingEfficiency from './components/MarketingEfficiency';
import MarketingStatus from './components/MarketingStatus';

const TITLE = '마케팅 비용 및 효율 ';
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
const MarketingCostsEfficiency = () => {
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
    <PageLayout headerName={TITLE} crumbs={getCrumbs()}>
      <Header
        selects={selects}
        onChangeDate={handleDateChange}
        selectedDate={selectedDate}
      />
      <Wrap>
        <ContentsWrap direction={'column'}>
          {/*{isLoading ? <Spinner /> : null}*/}
          <MarketingStatus data={[]} />
          <MarketingEfficiency data={[]} />
        </ContentsWrap>
      </Wrap>
    </PageLayout>
  );
};

export default MarketingCostsEfficiency;
