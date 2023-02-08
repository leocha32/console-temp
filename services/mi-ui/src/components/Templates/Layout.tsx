import React, { ReactElement, Suspense } from 'react';
import { Header, IHeaderProps } from '../Organisms/Header';
import { Snb, ISnbProps } from '../Organisms/Snb';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './ErrorPage';
import * as Sentry from '@sentry/react';
export interface ILayoutProps {
  menuStatusHook: ISnbProps['menuStatusHook'];
  onClickLogo?: () => void;
  onClickMenu?: ISnbProps['onClickMenu'];
  menu: ISnbProps['menu'];
  headerProps: IHeaderProps;
  header?: ReactElement;
}

const Main = styled.main`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Section = styled.div`
  background-color: ${(props) => props.theme.palettes.gray.GRAY_100};
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;

const Wrap = styled.div`
  padding: 20px 30px 40px;
  flex: 1;
`;
export const Layout = ({
  menu,
  menuStatusHook,
  onClickMenu,
  header,
  headerProps,
}: ILayoutProps) => {
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
        <Main>
          <Snb menu={menu} menuStatusHook={menuStatusHook} onClickMenu={onClickMenu} />
          <Section>
            <Wrap>
              <Suspense>
                <Outlet />
              </Suspense>
            </Wrap>
          </Section>
        </Main>
      </ErrorBoundary>
    </>
  );
};
