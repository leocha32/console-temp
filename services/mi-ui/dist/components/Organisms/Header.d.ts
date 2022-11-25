import { PropsWithChildren } from 'react';
import 'dayjs/locale/ko';
export interface IHeaderProps extends PropsWithChildren {
    height?: number;
    onClick?: () => void;
    useClock?: boolean;
}
export declare const Header: ({ children, height, useClock, onClick }: IHeaderProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Header.d.ts.map