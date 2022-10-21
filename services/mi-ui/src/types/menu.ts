import { RouteObject } from 'react-router-dom';
import { ReactElement } from 'react';

export type TMenu = Omit<RouteObject, 'children'> & {
  children?: TMenu[];
  label?: string;
  hidden?: boolean;
  icon?: ReactElement;
};
