import { RouteObject } from 'react-router-dom';
import { ReactElement } from 'react';
export declare type TMenu = Omit<RouteObject, 'children'> & {
    children?: TMenu[];
    label?: string;
    hidden?: boolean;
    icon?: ReactElement;
};
//# sourceMappingURL=menu.d.ts.map