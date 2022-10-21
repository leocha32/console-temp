import React, { useCallback, useState } from 'react';
import { Tabs as MuiTabs, Tab, TabsProps, TabProps } from '@mui/material';

export interface ITabsProps extends TabsProps {
  items: TabProps[];
}
export const Tabs = ({ value, items, onChange, ...props }: ITabsProps) => {
  const handleChange = useCallback(
    (event: React.SyntheticEvent, value: any) => {
      if (onChange instanceof Function) {
        onChange(event, value);
      }
    },
    [onChange],
  );

  return (
    <MuiTabs {...props} onChange={handleChange} value={value}>
      {items?.map((item) => (
        <Tab key={item.value} {...item} />
      ))}
    </MuiTabs>
  );
};
