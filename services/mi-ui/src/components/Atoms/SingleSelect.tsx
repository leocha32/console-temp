import React from 'react';
import Select, { Props as SelectProps, components, NoticeProps } from 'react-select';

export interface ISingleSelectProps extends SelectProps {
  width?: string;
}
const NoOptionsMessage = (props: NoticeProps) => {
  return <components.NoOptionsMessage {...props} />;
};

export const SingleSelect = ({ width = '300px', ...props }: ISingleSelectProps) => {
  return (
    <Select
      {...props}
      isMulti={false}
      components={{ NoOptionsMessage }}
      styles={{
        noOptionsMessage: (base) => ({ ...base }),
        container: (base) => ({
          ...base,
          width: width,
        }),
        control: (base) => ({
          ...base,
          backgroundColor: 'white',
        }),
        option: (base) => {
          return {
            ...base,
          };
        },
      }}
    ></Select>
  );
};
