import { PropsWithChildren } from 'react';
import { SnackbarProvider as StackSnackbarProvider } from 'notistack';
import { styled } from '@mui/material';
import { Theme } from '@emotion/react';

const StyledSnackbarProvider = styled(StackSnackbarProvider)`
  .SnackbarItem-message {
     align-items: start;
     padding-right: 10px;
  }
  &.SnackbarItem-contentRoot {
    z-index: 99;
    background-color: #fff;
    color:${({ theme }: { theme?: Theme }) => theme?.palettes.gray.GRAY_800};
    border-color:  ${({ theme }: { theme?: Theme }) => theme?.variant.DEFAULT};
    border: solid 2px;
    box-shadow: inset 0 -1px 0 0 #d8d8d8;
  }
  &.SnackbarItem-variantWarning {
    color: ${({ theme }: { theme?: Theme }) => theme?.variant.WARNING};
    border-color:  ${({ theme }: { theme?: Theme }) => theme?.variant.WARNING};
  }
  &.SnackbarItem-variantSuccess {
    color: ${({ theme }: { theme?: Theme }) => theme?.variant.SUCCESS};
    border-color:  ${({ theme }: { theme?: Theme }) => theme?.variant.SUCCESS};
  }
  &.SnackbarItem-variantError {
    color: ${({ theme }: { theme?: Theme }) => theme?.variant.ERROR};
    border-color:  ${({ theme }: { theme?: Theme }) => theme?.variant.ERROR};
  }
  &.SnackbarItem-variantInfo {
    color: ${({ theme }: { theme?: Theme }) => theme?.variant.INFO};
    border-color:  ${({ theme }: { theme?: Theme }) => theme?.variant.INFO};
  },
`;

export interface ISnackbarProviderProps extends PropsWithChildren {
  maxSnack?: number;
}

export const SnackbarProvider = ({ children, maxSnack = 3 }: ISnackbarProviderProps) => {
  return <StyledSnackbarProvider maxSnack={maxSnack}>{children}</StyledSnackbarProvider>;
};
