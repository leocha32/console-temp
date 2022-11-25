import { ReactElement } from 'react';
import { TMenu } from '../../types';
export interface IMenuStatus {
    expands: string[];
    open: boolean;
}
export interface ISnbProps {
    menu: TMenu[];
    width?: number;
    minWidth?: number;
    menuStatusHook: [IMenuStatus, (menu: IMenuStatus) => void];
    footer?: ReactElement;
    onClickMenu?: ({ currentInfo, parentLabels }: {
        currentInfo: any;
        parentLabels: any;
    }) => void;
}
export declare const Snb: ({ menuStatusHook, width, minWidth, footer, menu, onClickMenu, }: ISnbProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Snb.d.ts.map