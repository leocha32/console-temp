import React from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress as MuiProgress,
} from '@mui/material';
import { css } from '@emotion/react';

export interface IButtonProps extends MuiButtonProps {
  label?: string;
  showLoading?: boolean;
  spinnerSize?: number;
}

export const Button = ({
  showLoading = false,
  label,
  variant = 'outlined',
  spinnerSize = 15,
  ...props
}: IButtonProps) => {
  return (
    <MuiButton
      variant={variant}
      sx={{ padding: '6px 12px' }}
      {...props}
      disabled={props.disabled || showLoading}
    >
      <span
        css={css`
          opacity: ${showLoading ? 0.3 : 1};
        `}
      >
        {label}
      </span>
      {showLoading ? (
        <MuiProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `${-spinnerSize / 2}px`,
            marginLeft: `${-spinnerSize / 2}px`,
          }}
          size={spinnerSize}
        />
      ) : null}
    </MuiButton>
  );
};
