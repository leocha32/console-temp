import React, { PropsWithChildren, ReactElement } from 'react';
import { Header, IHeaderProps } from '../Organisms/Header';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './ErrorPage';
import * as Sentry from '@sentry/react';

export interface ILandingLayoutProps extends PropsWithChildren {
  headerProps: IHeaderProps;
  header?: ReactElement;
}

export const LandingLayout = ({ children, header, headerProps }: ILandingLayoutProps) => {
  return (
    <>
      <Header {...headerProps}>{header}</Header>
      <ErrorBoundary
        onError={(error) => {
          Sentry.captureException(error);
        }}
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorPage resetErrorBoundary={resetErrorBoundary} />
        )}
      >
        {children}
      </ErrorBoundary>
    </>
  );
};
