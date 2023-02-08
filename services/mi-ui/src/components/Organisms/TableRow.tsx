import React, { ReactNode } from 'react';
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
  value: ReactNode | TRowData[];
};

const RenderRowCell = ({
  rowData,
  columns,
}: {
  rowData: TRowProps;
  columns: TColumnProps[];
}) => {
  const { name, data, options: rowOptions }: TRowProps = rowData;
  return data.map((data, i) => {
    const colOptions = columns.find(({ name }) => name === data.colName)?.options;
    const sumOptions = {
      ...rowOptions,
      ...(name === 'label' ? {} : colOptions),
      ...data.options,
    };

    return (
      <Cell
        options={sumOptions}
        key={name + i}
        colSpan={data.colSpan}
        name={data.colName}
        value={data.value}
      ></Cell>
    );
  });
};
export const TableRow = ({ columns, rowData }: ITableRowProps) => {
  const { name: rowName, data, label, options: rowOptions }: TRowProps = rowData;
  const rowSpan = rowOptions?.rowSpan || 0;
  const colOptions = {
    ...columns.find(({ name }) => 'rowHeader' === name)?.options,
    sx: {
      ...rowOptions?.sx,
      ...columns.find(({ name }) => 'rowHeader' === name)?.options?.sx,
    },
  };

  /**
   * todo column option 추가
   */
  return (
    <>
      {rowSpan > 1 ? (
        <>
          {data?.map((row, i) => (
            <>
              {i === 0 ? (
                <Cell
                  options={{ ...colOptions }}
                  rowSpan={rowSpan + 1}
                  name={'rowHeader'}
                  value={label || ''}
                ></Cell>
              ) : null}
              <MuiTableRow key={i}>
                {row.map(({ colName, value, options }, j) => {
                  const colOptions = columns.find(
                    ({ name }) => name === colName,
                  )?.options;

                  const sumOptions = {
                    ...rowOptions,
                    ...options,
                    ...(rowName === 'label' ? {} : colOptions),
                    sx: {
                      ...rowOptions?.sx,
                      ...colOptions?.sx,
                    },
                  };

                  return (
                    <Cell
                      rowSpan={options?.rowSpan ? options?.rowSpan : 1}
                      colSpan={options?.colSpan ? options?.colSpan : 1}
                      options={sumOptions}
                      key={j}
                      name={colName}
                      value={value}
                    ></Cell>
                  );
                })}
              </MuiTableRow>
            </>
          ))}
        </>
      ) : (
        <MuiTableRow sx={{ height: '40px' }}>
          {label && (
            <Cell
              options={{ ...rowOptions, ...colOptions }}
              rowSpan={rowSpan}
              colSpan={rowOptions?.colSpan || 1}
              name={'rowHeader'}
              value={label || ''}
            ></Cell>
          )}
          {RenderRowCell({ rowData, columns })}
        </MuiTableRow>
      )}
    </>
  );
};
