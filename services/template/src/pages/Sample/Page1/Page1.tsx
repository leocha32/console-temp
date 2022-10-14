import React from 'react';

import { useResearchSummaryConfig } from 'modules/research';
import { HalfYear } from 'utils/enums';

const Page1 = () => {
  const { data, isLoading } = useResearchSummaryConfig({
    year: '2021',
    half: HalfYear.Second,
  });

  return <>Page1</>;
};

export default Page1;
