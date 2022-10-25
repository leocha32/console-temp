import * as React from 'react';
import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
  TableHead as MuiTableHead,
  Table as MuiTable,
} from '@mui/material';
import { Cell, IDropdownProps, IOptionProps, TCellRenderOptions } from '../Atoms';
import { generateGridRowSpacingStyles } from '@mui/system/Unstable_Grid/gridGenerator';
import { NestedItem } from '../Atoms/Dropdown/NestedItem';
import { DropdownItem } from '../Atoms/Dropdown/DropdownItem';

export interface ITableRowProps extends MuiTableRowProps {
  headers: TTableHeader[];
}

export type TTableHeader = {
  label: string;
  rowSpan?: number;
  colSpan?: number;
  child?: TTableHeader[];
};

const renderHeader = ({ label, rowSpan, colSpan, child }: TTableHeader) => {
  return (
    <>
      {child ? (
        child.map((item) => (
          <>
            <MuiTableRow key={item.label}>
              <Cell rowSpan={item.rowSpan} name={item.label} value={item.label}></Cell>
            </MuiTableRow>
            {item.child ? item.child.map((child) => renderHeader(child)) : null}
          </>
        ))
      ) : (
        <Cell rowSpan={rowSpan} colSpan={colSpan} name={label} value={label}></Cell>
      )}
    </>
  );
};

export const TableHeader = ({ headers, ...props }: ITableRowProps) => {
  return (
    <MuiTable>
      <MuiTableHead>
        {headers.map((header, i) => {
          return renderHeader(header);
        })}
      </MuiTableHead>
    </MuiTable>
  );
};
