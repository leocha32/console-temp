import * as React from 'react';
import {
  TableRow as MuiTableRow,
  TableBody as MuiTableBody,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
  Paper as MuiPaper,
} from '@mui/material';

import { TableRow, TRowData, TColumnOptions } from './TableRow';
import { Cell } from '../Atoms';
import { TableHeader, IColumn } from './TableHeader';
import { SHARE } from '../../constants/mock';

const ROW_KEY = [
  'marketShareRank',
  'marketShareValue',
  'hohDiff',
  'marketShareValue',
  'productPenetrationValue',
];

export interface ITableContainerProps extends MuiTableContainerProps {
  headers: IColumn[];
  rowData: TRowData[];
  columns: TColumnOptions[];
  showHeader?: boolean;
}

export const Table = ({
  columns = [],
  headers,
  rowData,
  showHeader = true,
  ...props
}: ITableContainerProps) => {
  const productPenetration = Object.keys(SHARE.productPenetration[0]).map((key) => {
    return {
      name: key,
      data: SHARE.productPenetration.map((s) => s[key]),
    };
  });
  const nameOrderStandard = ['정수기', '청정기', '비데', '매트리스', '안마의자'];
  const valueOrderSandard = [
    'marketShareRank',
    'hohDiff',
    'marketShareRank',
    'productPenetrationValue',
  ];
  const nameOrderedArray = nameOrderStandard.map((orderName) => {
    return SHARE.cowayMarketShare.find((te) => te.productGroup === orderName);
  });

  const marketShare = Object.keys(nameOrderedArray[0]!).map((key) => {
    return nameOrderedArray.map((s) => {
      return {
        name: key,
        value: s![key],
      };
    });
  });

  Object.keys(nameOrderedArray[0]!).map((name) => {
    return {
      name: name,
      type: 'string',
      format: '%',
    };
  });
  console.log(marketShare);
  return (
    <MuiTableContainer {...props} component={MuiPaper}>
      <MuiTable>
        {showHeader ? <TableHeader headers={headers}></TableHeader> : null}
        <MuiTableBody>
          {marketShare.map((row, i) => (
            <TableRow key={i} rowData={row}></TableRow>
          ))}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};

// import * as React from 'react';
// import {
//   TableRow as MuiTableRow,
//   TableBody as MuiTableBody,
//   Table as MuiTable,
//   TableContainer as MuiTableContainer,
//   TableContainerProps as MuiTableContainerProps,
//   Paper as MuiPaper,
// } from '@mui/material';

// import { TableRow, TRowData } from './TableRow';
// import { Cell, TCellRenderOptions } from '../Atoms';
// import { TableHeader, IColumn } from './TableHeader';

// export interface ITableContainerProps extends MuiTableContainerProps {
//   headers: IColumn[];
//   rowData: TRowData[];
//   columns: TCellRenderOptions[];
// }

// export const Table = ({
//   columns = [],
//   headers,
//   rowData,
//   ...props
// }: ITableContainerProps) => {
//   return (
//     <MuiTableContainer {...props} component={MuiPaper}>
//       <MuiTable>
//         <TableHeader headers={headers}></TableHeader>
//         <MuiTableBody>
//           {rowData?.map((data, i) => {
//             if (data['subValues']) {
//               return (
//                 <>
//                   <MuiTableRow>
//                     <Cell
//                       name={data.value + ''}
//                       value={data.value}
//                       rowSpan={data.subValues.length + 1 || 1}
//                     ></Cell>
//                   </MuiTableRow>

//                   {data.subValues.map((value, i) => (
//                     <TableRow
//                       key={i + i}
//                       tabIndex={i}
//                       columns={columns}
//                       rowData={value}
//                     ></TableRow>
//                   ))}
//                 </>
//               );
//             } else {
//               return (
//                 <TableRow
//                   key={i}
//                   tabIndex={i}
//                   columns={columns}
//                   rowData={data}
//                 ></TableRow>
//               );
//             }
//           })}
//         </MuiTableBody>
//       </MuiTable>
//     </MuiTableContainer>
//   );
// };
