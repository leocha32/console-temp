import React from 'react';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';

export interface ICellProps {
  name: string;
  value: string | number;
  rowSpan?: number;
  colSpan?: number;
  options?: ICellOptions;
  icon?: React.ReactElement;
}

export interface ICellOptions extends MuiTableCellProps {
  rowSpan?: number;
  textFormat?: (value: string | number) => string;
  colorFormat?: (value: string | number) => string;
  height?: number | string;
  fontSize?: number;
}
const defaultCellOption: ICellOptions = {
  rowSpan: 1,
  colSpan: 1,
  textFormat: (value) => String(value),
  colorFormat: (value) => String(value),
  height: 'inherit',
  fontSize: 15,
};

const calPaddingByFontSize = (fontSize) => {
  const defaultFontSize = 15;
  const defaultPadding = 15;
  return fontSize <= defaultFontSize
    ? defaultPadding + 'px'
    : defaultPadding - fontSize - defaultFontSize + 'px';
};

export const Cell = ({ value, rowSpan, colSpan, options, ...props }: ICellProps) => {
  const { sx, textFormat, colorFormat, height, fontSize } = {
    ...defaultCellOption,
    ...options,
  };

  const defaultSx = {
    textAlign: 'center',
  } as MuiTableCellProps;
  return (
    <MuiTableCell
      colSpan={colSpan ? colSpan : 1}
      rowSpan={rowSpan ? rowSpan : 1}
      sx={{
        ...defaultSx,
        ...sx,
        [`&.MuiTableCell-root`]: {
          lineHeight: height,
          fontSize: fontSize,
          padding: calPaddingByFontSize(fontSize),
        },
        color: colorFormat ? colorFormat(value) : 'black',
      }}
      {...props}
    >
      {textFormat ? textFormat(value) : value}
    </MuiTableCell>
  );
};
