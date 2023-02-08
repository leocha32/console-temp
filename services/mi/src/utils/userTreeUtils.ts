import { getAllChildrenId, getItem, ITreeItem, AccessType } from 'mi-ui/src';
import routes from '$constants/menus';
import { TUserResponseDto } from '$modules/management/user';
import { cloneDeep } from 'lodash';

export const ALL_MENU_NODE_ID = '/*';
export const allMenu = {
  nodeId: ALL_MENU_NODE_ID,
  label: '전체',
};
export const menus =
  routes
    ?.find((route) => (route.path = '/'))
    ?.children?.filter((child) => !child?.index && !child.hidden) || [];

export const accessibleUriToMenuName = (accessibleUri): string[] => {
  const menus = new Map();
  const parentIdsLabels = new Map();

  accessibleUri?.split(',').forEach((url) => {
    const parentIds = [];
    const item = getItem(treeItem, url, parentIds);
    const parentLabels: string[] = [];

    parentIds.forEach((parentId) => {
      if (!parentIdsLabels.has(parentId)) {
        const label = getItem(treeItem, parentId)?.label || '';
        parentIdsLabels.set(parentId, label);
      }
      parentLabels.push(parentIdsLabels.get(parentId));
    });
    const menusKey = parentLabels.join(' > ');
    const prevMenuItem = menus.get(menusKey) || [];
    menus.set(menusKey, [...prevMenuItem, item?.label]);
  });

  return [...menus.keys()].map((key) => {
    const child = menus.get(key).join(', ');
    return key ? key.concat(` > ${child}`) : child;
  });
};

export const makeParams = (selected: string[]) => {
  // treeView selected -> backend param type
  let parentId = '';
  return selected.sort().reduce((pre: string[], cur) => {
    const hasChildren = cur.endsWith('/*');
    if (parentId && cur.startsWith(parentId.split('/*')[0])) {
      return pre;
    } else if (!parentId && !hasChildren) {
      pre.push(cur);
    } else if (hasChildren) {
      parentId = cur;
      pre.push(cur);
    } else pre.push(cur);

    return pre;
  }, []);
};

export const makeMenuTreeView = (menu, depth = 0, parentPath = '') => {
  depth++;
  return menu?.map(({ path, label, children }) => {
    const newPath = parentPath.concat('/').concat(path);

    const tree: ITreeItem = {
      nodeId: newPath,
      label,
    };
    const subMenu = children?.filter((child) => !child.index && !child.hidden);
    if (subMenu?.length) {
      tree.items = makeMenuTreeView(subMenu, depth, newPath);
      tree.nodeId = newPath.concat('/*');
    }

    return tree;
  });
};

export const makeSelectedItem = (selected, tree = treeItem) => {
  //backend data -> front treeView selected type
  return selected?.reduce((pre, cur) => {
    if (cur?.endsWith('/*')) {
      const children = getAllChildrenId(getItem(tree, cur));
      pre = [...pre, ...children];
    } else {
      pre.push(cur);
    }

    return pre;
  }, []);
};

export const addSnackbar = (snackbar, result: TUserResponseDto) => {
  const { message, result: isSuccess } = result;
  snackbar.add({
    message: message,
    variant: isSuccess ? 'success' : 'error',
  });
};

export const treeItem = [{ ...allMenu, items: makeMenuTreeView(menus) }];

export const getAccessibleMenu = (accessibleUri: string) => {
  const newMenus = cloneDeep(menus);
  const setShowMenu = (menus, urlArr, index) => {
    if (urlArr[index] === '*') {
      menus.forEach((menu) => (menu.access = AccessType.ALL));
      return;
    } else {
      const menu = menus?.find(({ path }) => path === urlArr[index]);
      if (menu) {
        menu.access = AccessType.SHOW;
        if (index < urlArr.length - 1) {
          index++;
          setShowMenu(menu.children, urlArr, index++);
        }
      }
    }
  };

  const accessibleUriArr = accessibleUri.split(',');
  accessibleUriArr.forEach((url) => {
    const urlArr = url.split('/').splice(1);
    setShowMenu(newMenus, urlArr, 0);
  });

  return newMenus;
};
