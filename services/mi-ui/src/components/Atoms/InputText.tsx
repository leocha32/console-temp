import React, {
  ReactElement,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import { TextFieldProps, TextField as MuiTextField } from '@mui/material';
import { debounce } from 'lodash';
import styled from '@emotion/styled';

const TextField = styled(MuiTextField)({
  '.MuiInputBase-input': {
    height: '24px',
    padding: '8px 10px',
  },
});
export type TInputTextProps = TextFieldProps;

export const InputText = ({
  inputProps = {},
  variant = 'outlined',
  value = '',
  ...props
}: TInputTextProps): ReactElement => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debounceOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange instanceof Function) {
      props.onChange(e);
    }
  }, 200);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setInputValue(e.target.value);
      debounceOnChange(e);
    },
    [debounceOnChange],
  );
  return (
    <TextField
      variant={variant}
      inputProps={{ ...inputProps }}
      {...props}
      onChange={handleChange}
      value={inputValue}
    />
  );
};
