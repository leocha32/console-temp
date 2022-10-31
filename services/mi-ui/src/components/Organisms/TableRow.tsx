import React, { Fragment } from 'react';
import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';
import { Cell } from '../Atoms';

export interface ITableRowProps extends MuiTableRowProps {
  rowData: TRowData;
  columns?: string[];
}

export type TColumnOptions = {
  nameStandart: string[];
  valueStandart: string[];
};

export type TRowData = {
  [key: string]: string | number | any;
};

export const TableRow = ({ tabIndex, columns, rowData, ...props }: ITableRowProps) => {
  console.log(rowData);
  return (
    <MuiTableRow>
      {rowData.map((row, i) => {
        return <Cell key={i} name={row} value={row}></Cell>;
      })}
    </MuiTableRow>
  );
};

// import React, { Fragment } from 'react';
// import {
//   TableRow as MuiTableRow,
//   TableRowProps as MuiTableRowProps,
// } from '@mui/material';
// import { Cell, TCellRenderOptions } from '../Atoms';

// export interface ITableRowProps extends MuiTableRowProps {
//   rowData: TRowData;
//   columns: TCellRenderOptions[];
// }

// export type TRowData = {
//   [key: string]: string | number | any;
// };

// export const TableRow = ({ tabIndex, columns, rowData, ...props }: ITableRowProps) => {
//   const keys = Object.keys(rowData);

//   return (
//     <MuiTableRow key={tabIndex} {...props}>
//       {keys.map((key, i) => {
//         const renderOptions = columns.find(({ name }) => name === key);
//         const isArray = Array.isArray(rowData[key]);

//         return !isArray ? (
//           <Cell
//             key={tabIndex + '' + i}
//             name={key}
//             renderOptions={renderOptions}
//             value={rowData[key]}
//           ></Cell>
//         ) : (
//           <Fragment>
//             <Cell key={key} rowSpan={3} name={'e'} value={'z'}></Cell>
//             {rowData[key].map((data, j) => (
//               <MuiTableRow key={data + j}>
//                 <Cell key={data + '' + i} name={data} value={data}></Cell>
//               </MuiTableRow>
//             ))}
//           </Fragment>
//         );
//       })}
//     </MuiTableRow>
//   );
// };
