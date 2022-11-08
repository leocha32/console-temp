import React from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress as MuiProgress,
  Box as MuiBox,
} from '@mui/material';

export interface IButtonProps extends MuiButtonProps {
  label?: string;
  showLoading?: boolean;
  justifyContent?: JustifyContent;
  spinnerSize?: number;
  width?: number | string;
  height?: number | string;
}

export enum JustifyContent {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export const Button = ({
  showLoading = false,
  label,
  variant = 'outlined',
  width = 130,
  height = 35,
  justifyContent = JustifyContent.CENTER,
  spinnerSize = 15,
  ...props
}: IButtonProps) => {
  return (
    <MuiBox
      sx={{
        m: 1,
        position: 'relative',
        display: 'flex',
        justifyContent: justifyContent,
      }}
    >
      <MuiButton
        variant={variant}
        sx={{ minWidth: width, height: height }}
        {...props}
        disabled={props.disabled || showLoading}
      >
        {showLoading ? (
          <MuiProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `${-spinnerSize / 2}px`,
              marginLeft: `${-spinnerSize / 2}px`,
              color: 'inherit',
            }}
            size={spinnerSize}
            color="inherit"
          />
        ) : (
          label
        )}
      </MuiButton>
    </MuiBox>
  );
};
