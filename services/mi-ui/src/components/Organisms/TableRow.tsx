import React from 'react';
import { TableRow as MuiTableRow } from '@mui/material';
import { Cell, ICellOptions } from '../Atoms';

export interface ITableRowProps {
  rowData: TRowProps;
  columns: TColumnProps[];
}

export type TColumnProps = {
  name: string;
  label?: string;
  options?: ICellOptions;
};

export type TRowProps = {
  name: string;
  data: TRowData[] | TRowData[][];
  label?: string;
  options?: ICellOptions;
  detail?: string[] | number[];
};

export type TRowData = {
  colName: string;
  value: string | number | TRowData[];
};

export const TableRow = ({ columns, rowData }: ITableRowProps) => {
  const { name: rowName, data, label, options: rowOptions }: TRowProps = rowData;
  const rowSpan = rowOptions?.rowSpan || 0;
  const colOptions = columns.find(({ name }) => 'rowHeader' === name)?.options;

  /**
   * todo column option 추가
   */
  return (
    <>
      <MuiTableRow>
        {label ? (
          <Cell
            options={{ ...colOptions }}
            rowSpan={rowSpan + 1}
            name={'rowHeader'}
            value={label}
          ></Cell>
        ) : null}
        {rowSpan < 1
          ? data.map((data, i) => {
              const colOptions = columns.find(
                ({ name }) => name === data.colName,
              )?.options;
              const sumOptions = {
                ...rowOptions,
                ...(rowName === 'label' ? {} : colOptions),
              };

              return (
                <Cell
                  options={sumOptions}
                  key={rowName + i}
                  name={data.colName}
                  value={data.value}
                ></Cell>
              );
            })
          : null}
      </MuiTableRow>
      {rowSpan > 1
        ? data?.map((row, i) => (
            <MuiTableRow key={i}>
              {row.map(({ colName, value }, j) => {
                const colOptions = columns.find(({ name }) => name === colName)?.options;
                const sumOptions = {
                  ...rowOptions,
                  ...(rowName === 'label' ? {} : colOptions),
                };

                return (
                  <Cell options={sumOptions} key={j} name={colName} value={value}></Cell>
                );
              })}
            </MuiTableRow>
          ))
        : null}
    </>
  );
};
