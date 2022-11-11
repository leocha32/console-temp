import React, { useRef, useState, useCallback } from 'react';
import { CardTitle, Card } from '$pages/Report/commonStyled';
import { Table } from 'mi-ui';
import { EmptyContent } from 'mi-ui/src/components/Templates/EmptyContent';
export const RentTable = () => {
  return (
    <Card sx={{ display: 'grid', gridTemplateRows: '10% auto' }}>
      <CardTitle>렌탈 지표</CardTitle>
      <Table row={[]} columns={[]}></Table>
    </Card>
  );
};
