import React, { ReactNode, useCallback } from 'react';
import { VariantType, SnackbarAction, useSnackbar as _useSnackbar } from 'notistack';
import { SnackbarOrigin, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export interface ISnackbarProps {
  anchorOrigin?: SnackbarOrigin;
  action?: SnackbarAction;
  persist?: boolean;
  closeButton?: boolean;
  title?: ReactNode;
  autoHideDuration?: number | null;
}

const CloseButton = styled(Button)`
  border: none;
  padding: 0;
  min-width: 16px;
  width: 16px;
  position: absolute;
  top: 8px;
  right: 16px;
  color: ${({ theme }: { theme?: Theme }) => theme?.palettes.gray.GRAY_800} !important;
  svg {
    width: 18px;
  }
`;

const messageContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1px;
`;

const messageTitle = css`
  font-weight: 700;
  max-width: 279px;
  word-break: break-all;
  color: #383a3f;
  font-size: 13px;
`;

const messageContent = css`
  color: #383a3f;
  max-width: 314px;
  word-break: break-all;
  font-size: 13px;
`;

export function useSnackbar({
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  closeButton = true,
  autoHideDuration = 5000,
  persist = false,
  title = null,
  ...props
}: ISnackbarProps) {
  const { enqueueSnackbar, closeSnackbar } = _useSnackbar();
  const action = useCallback(
    (key: string | number) => (
      <CloseButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <ClearIcon />
      </CloseButton>
    ),
    [closeSnackbar],
  );

  const add = useCallback(
    ({ message, variant = 'success' }: { message: ReactNode; variant?: VariantType }) => {
      const optionProps = {
        ...props,
        variant,
        anchorOrigin,
        closeButton,
        autoHideDuration,
        persist,
        message,
      };

      if (closeButton) {
        optionProps.action = action;
      }
      optionProps.message = (
        <div css={messageContainer}>
          {title && <div css={messageTitle}>{title}</div>}
          {optionProps.message && <div css={messageContent}>{message}</div>}
        </div>
      );
      enqueueSnackbar(optionProps.message, optionProps);
    },
    [
      enqueueSnackbar,
      props,
      anchorOrigin,
      closeButton,
      autoHideDuration,
      title,
      persist,
      action,
    ],
  );

  const rendered = <></>;

  return { rendered, add };
}
