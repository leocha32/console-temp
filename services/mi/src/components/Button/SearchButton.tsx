import { Button, IButtonProps } from 'mi-ui/src';

export interface ISearchButtonProps extends IButtonProps {
  isLoading?: boolean;
  onClick: () => void;
}
export const SearchButton = ({
  isLoading = false,
  onClick,
  ...props
}: ISearchButtonProps) => {
  return (
    <Button
      showLoading={isLoading}
      label={'조회'}
      onClick={onClick}
      variant="contained"
      {...props}
    />
  );
};
