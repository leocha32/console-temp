import React, { useState } from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
  TextField as MuiInput,
} from '@mui/material';

export interface ICellProps extends MuiTableCellProps {
  name: string;
  value: string | number;
}

export const Cell = ({ value, onChange, ...props }: ICellProps) => {
  return <MuiTableCell {...props}>{value}</MuiTableCell>;
};

// import React, { useState } from 'react';
// import {
//   TableCell as MuiTableCell,
//   TableCellProps as MuiTableCellProps,
//   TextField as MuiInput,
// } from '@mui/material';

// import { css, SerializedStyles } from '@emotion/react';
// export interface ICellProps extends MuiTableCellProps {
//   name: string;
//   value: string | number;
//   renderOptions?: TCellRenderOptions;
// }

// export type TCellRenderOptions = {
//   name: string;
//   readonly?: boolean;
//   renderer?: string;
//   colSpan?: number;
//   css?: SerializedStyles;
//   options?: {
//     key: string;
//     value: string;
//   }[];
// };

// export const TCellOptionsDefaultValue: TCellRenderOptions = {
//   name: '',
//   readonly: true,
//   renderer: 'text',
//   css: css``,
//   colSpan: 0,
//   options: [
//     {
//       key: '',
//       value: '',
//     },
//   ],
// };

// export const Cell = ({
//   value,
//   onChange,
//   renderOptions = TCellOptionsDefaultValue,
//   ...props
// }: ICellProps) => {
//   const { readonly = true, renderer, css, colSpan, options } = renderOptions;

//   const [inputValue, setInputValue] = useState<string | number>(value);

//   const changeMultipleValue = ({ target: { value } }: any) => {
//     setInputValue(value);
//     onChange;
//   };

//   //todo : Renderer 조건 별 동작 수정
//   return (
//     <MuiTableCell css={css} colSpan={colSpan} {...props}>
//       {readonly ? (
//         value
//       ) : (
//         <MuiInput sx={{ border: 'none' }} variant="outlined" defaultValue={inputValue} />
//       )}
//     </MuiTableCell>
//   );
// };
