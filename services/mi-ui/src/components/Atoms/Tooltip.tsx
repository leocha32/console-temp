import React from 'react';
import { TooltipProps, Tooltip as MuiTooltip } from '@mui/material';

export type TTooltipProps = TooltipProps;

export const Tooltip = ({
  children,
  placement = 'top',
  arrow = true,
  ...props
}: TTooltipProps) => {
  return (
    <MuiTooltip placement={placement} arrow={arrow} {...props}>
      {children}
    </MuiTooltip>
  );
};
