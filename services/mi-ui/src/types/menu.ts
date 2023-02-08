import { RouteObject } from 'react-router-dom';
import { ReactElement } from 'react';

export interface IRoutes extends Omit<RouteObject, 'children'> {
  children?: IRoutes[];
  label?: string;
  icon?: ReactElement;
  hidden?: boolean; // 메뉴에서 제외할
}

export const enum AccessType { // 권한관리
  ALL = 'ALL',
  SHOW = 'SHOW',
}
export interface IMenus extends Omit<IRoutes, 'element' | 'children'> {
  elementKey: string;
  children?: IMenus[];
  access?: AccessType;
}
