import { ReactElement } from 'react';
import { ISnbProps } from '../Organisms';
export interface ILayoutProps {
    menuStatusHook: ISnbProps['menuStatusHook'];
    onClickLogo?: () => void;
    onClickMenu?: ISnbProps['onClickMenu'];
    menu: ISnbProps['menu'];
    header?: ReactElement;
}
export declare const Layout: ({ menu, menuStatusHook, onClickLogo, header, onClickMenu, }: ILayoutProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Layout.d.ts.map