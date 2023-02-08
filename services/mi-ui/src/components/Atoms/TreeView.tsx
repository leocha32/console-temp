import React, { useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

import { Checkbox } from './Checkbox';

import {
  TreeItem as MuiTreeItem,
  TreeView as MuiTreeView,
  TreeItemProps,
  TreeViewPropsBase,
} from '@mui/lab';
import { colorToRgb } from '../../utils/utils';

export interface ITreeItem extends TreeItemProps {
  items?: ITreeItem[];
}

export interface ITreeViewProps extends TreeViewPropsBase {
  items?: ITreeItem[];
  useSelection?: boolean;
  onChangeSelection?: (id: string[]) => void;
  selected?: string[];
}

const TreeItem = styled(MuiTreeItem)(({ theme }: { theme?: Theme }) => ({
  '&.MuiTreeItem-root:focus > .MuiTreeItem-content .MuiTreeItem-label': {
    backgroundColor: 'transparent',
  },
  '.MuiTreeITem-content.Mui-focused': {},
  '.MuiTreeItem-content:hover': {
    backgroundColor: `rgba(${colorToRgb(theme?.color?.primary?.PRIMARY_500 || '').join(
      ',',
    )},0.1) !important`,
  },
}));

const Item = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palettes.gray.GRAY_1000};
`;

interface IRenderItemsProps extends Pick<ITreeViewProps, 'selected'> {
  items: ITreeItem[];
  useSelection?: boolean;
  onChangeSelection: (ChangeEvent) => void;
}

const enum TagType {
  div = 'DIV',
  input = 'INPUT',
}

export const getItem = (
  items: ITreeItem[],
  id: string,
  parentIds: string[] = [],
): ITreeItem => {
  let findItem;
  items.some((item) => {
    if (item.nodeId === id) {
      findItem = item;
      return true;
    } else if (item?.items?.length) {
      parentIds.push(item.nodeId);
      const find = getItem(item.items, id, parentIds);
      if (find) {
        findItem = find;
        return true;
      } else {
        parentIds.pop();
      }
    }
  });
  return findItem;
};

export const getAllChildrenId = (item: ITreeItem, ids: string[] = [item.nodeId]) => {
  if (item?.items?.length) {
    item.items?.reduce((pre, cur) => {
      pre.push(cur.nodeId);
      if (cur.items) {
        getAllChildrenId(cur, ids);
      }
      return pre;
    }, ids);
  }
  return ids;
};

const getAllChildSelectedIds = (tree: ITreeItem[], ids: string[], selected: string[]) => {
  const parentSelected: string[] = [];
  ids.reverse().some((id) => {
    const item = getItem(tree, id);
    if (item.items) {
      const allSelected = item.items.every(
        ({ nodeId }) => selected.includes(nodeId) || parentSelected.includes(nodeId),
      );
      if (allSelected) {
        parentSelected.push(id);
        return false;
      } else return true;
    }
  });
  return parentSelected;
};
const renderItems = ({
  items,
  useSelection,
  onChangeSelection,
  selected = [],
}: IRenderItemsProps) => {
  return items.map(({ items: subItems, label, nodeId, ...props }) => {
    return (
      <TreeItem
        {...props}
        nodeId={nodeId}
        key={nodeId}
        label={
          <Item
            onClick={(e) => {
              if (useSelection) {
                const element = e.target as HTMLElement;
                if (element.tagName === TagType.div) {
                  onChangeSelection({ target: { id: nodeId } });
                }
                e.stopPropagation();
              }
            }}
          >
            {useSelection ? (
              <Checkbox
                id={nodeId}
                label={label}
                onChange={onChangeSelection}
                checked={selected.includes(nodeId)}
              />
            ) : (
              label
            )}
          </Item>
        }
      >
        {subItems &&
          renderItems({ items: subItems, useSelection, onChangeSelection, selected })}
      </TreeItem>
    );
  });
};
export const TreeView = ({
  defaultCollapseIcon = <ExpandMoreIcon />,
  defaultExpandIcon = <ChevronRightIcon />,
  items = [],
  useSelection = true,
  onChangeSelection,
  selected = [],
  ...props
}: ITreeViewProps) => {
  const handleChangeSection = useCallback(
    ({ target: { id, checked } }) => {
      const parentIds = [];
      const ids = getAllChildrenId(getItem(items, id, parentIds));

      const newSelected = new Set(selected);
      const flag = checked === undefined ? !newSelected.has(id) : checked;
      if (flag) {
        const parentAllSelected = getAllChildSelectedIds(items, parentIds, [
          ...selected,
          id,
        ]);
        const newIds = [...ids, ...parentAllSelected];
        newIds.forEach((id) => newSelected.add(id));
      } else {
        const newIds = [...ids, ...parentIds];
        newIds.forEach((id) => newSelected.delete(id));
      }
      onChangeSelection && onChangeSelection([...newSelected]);
    },
    [items, selected, onChangeSelection],
  );

  return (
    <MuiTreeView
      defaultCollapseIcon={defaultCollapseIcon}
      defaultExpandIcon={defaultExpandIcon}
      {...props}
      disableSelection
    >
      {items &&
        renderItems({
          items,
          useSelection,
          onChangeSelection: handleChangeSection,
          selected,
        })}
    </MuiTreeView>
  );
};
