import React, { PropsWithChildren } from 'react';
import { IHeaderProps, LandingLayout as CLandingLayout } from 'mi-ui';

import { Header } from './components';

export interface ILandingLayoutProps extends PropsWithChildren {
  headerProps: IHeaderProps;
}
export const LandingLayout = ({ children, headerProps }: ILandingLayoutProps) => {
  return (
    <CLandingLayout headerProps={headerProps} header={Header}>
      {children}
    </CLandingLayout>
  );
};
