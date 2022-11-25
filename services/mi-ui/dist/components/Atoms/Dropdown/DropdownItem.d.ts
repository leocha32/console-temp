import { MenuItemProps } from '@mui/material';
import { IOptionProps } from './Dropdown';
export interface IDropdownItemListProps extends MenuItemProps {
    option: IOptionProps;
    onClickOption?: (key: string) => void;
}
export declare const DropdownItem: ({ option, onClickOption, ...props }: IDropdownItemListProps) => import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DropdownItem.d.ts.map