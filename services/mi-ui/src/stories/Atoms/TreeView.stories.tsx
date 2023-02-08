import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TreeView as CTreeView, ITreeViewProps } from 'components/Atoms';
import styled from '@emotion/styled';
export default {
  title: 'Atoms/TreeView',
  component: CTreeView,
} as ComponentMeta<typeof CTreeView>;

const Wrap = styled.div`
  width: 300px;
  border: 1px solid #777;
  padding: 10px;
  border-radius: 4px;
`;
export const TreeView: ComponentStory<typeof CTreeView> = (args: ITreeViewProps) => {
  const [selected, setSelected] = useState([]);
  const handleChangeSelected = (item) => {
    setSelected(item);
  };
  return (
    <Wrap>
      <CTreeView {...args} selected={selected} onChangeSelection={handleChangeSelected} />
    </Wrap>
  );
};

TreeView.args = {
  items: [
    {
      nodeId: '1',
      label: '1',
      items: [
        {
          nodeId: '22',
          label: '22',
        },
        {
          nodeId: '33',
          label: '33',
          items: [
            {
              nodeId: '222',
              label: '222',
            },
            {
              nodeId: '333',
              label: '333',
            },
            {
              nodeId: '444',
              label: '444',
            },
          ],
        },
        {
          nodeId: '44',
          label: '44',
        },
      ],
    },
    {
      nodeId: '2',
      label: '2',
    },
    {
      nodeId: '3',
      label: '3',
    },
    {
      nodeId: '4',
      label: '4',
    },
  ],
};
