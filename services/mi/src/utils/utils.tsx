import React from 'react';
import fileDownload from 'js-file-download';
import html2canvas, { Options } from 'html2canvas';
import pathName from '$constants/pathName';
import HomeIcon from '@mui/icons-material/Home';
import { AxiosResponse } from 'axios';
import { auth, getIdToken } from './firebase';
import { LOCAL_STORAGE_KEY } from '$recoils/key';

export const getToken = async (bearer = false) => {
  const prefix = bearer ? 'Bearer ' : '';
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user);
    return token ? `${prefix}${token}` : token;
  } else return null;
};

export const getUserEmail = () => {
  const user = auth.currentUser;
  const item = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  return user?.email || item?.user?.email;
};

export const getFileNameAndDownloadFile = ({
  data,
  headers,
}: AxiosResponse<Blob, any>): void => {
  const content = headers['content-disposition'];
  const RegExp = /filename=([^;]+)/g;
  const reqExpExec = RegExp.exec(content || '');
  const fileName = reqExpExec ? reqExpExec[1] : '';
  fileDownload(data, fileName);
};
export function saveImage(
  element: HTMLElement,
  fileName: string,
  options?: Options,
): void {
  setTimeout(async () => {
    try {
      changeCssFitCanvas(element);

      element.style.padding = '10px';
      const canvas = await html2canvas(element, options);
      canvas.toBlob((blob: any) => {
        fileDownload(blob, fileName);
      }, 'image/png');
      element.style.padding = '';
      changeCsstoInit(element);
    } catch (e) {
      console.log(e);
    }
  }, 300);
}

export const getCrumbs = () => {
  const location = window.location.pathname;
  const pathArray = location.split('/').filter((path) => path !== '');

  return [
    {
      name: pathName['home'],
      icon: <HomeIcon fontSize={'small'} sx={{ marginRight: '2px' }} />,
    },
    ...pathArray.map((path) => ({ name: pathName[dashToCamelCase(path)] })),
  ];
};

export const dashToCamelCase = (myStr) => {
  return myStr.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

export const downloadFile = (data, fileName): void => {
  fileDownload(data, decodeURIComponent(fileName));
};

/**
 * 이미지 변경 전 css 작업
 */
const changeCssFitCanvas = (element) => {
  if (!element) return;
  const tableContainer = element.querySelector('#table-container');
  const muiCards = element.getElementsByClassName('MuiCard-root');
  const muiTabs = element.getElementsByClassName('MuiTab-root');
  element.style.height = element.clientHeight + 50 + 'px';
  element.style.width = element.clientWidth + 100 + 'px';

  for (const tab of muiTabs) {
    tab['style'].display = 'inline-block';
  }

  for (const card of muiCards) {
    card['style'].boxShadow = 'none';
    card['style'].border = '1px black solid';
  }

  if (tableContainer) {
    const footerHeight = tableContainer.nextElementSibling?.clientHeight || 0;
    const layoutHeaderHeight = element.querySelector('#layout-header')?.clientHeight || 0;
    const componentHeaderHeight =
      element.querySelector('#component-header')?.clientHeight || 0;

    tableContainer['style'].overflowY = 'visible';
    tableContainer['style'].height = tableContainer.clientHeight;
    tableContainer['style'].boxShadow = 'none';

    for (const child of tableContainer.children) {
      const length = tableContainer.children.length;
      child['style'].height = tableContainer.clientHeight / length;
      child.getElementsByTagName('button')[0].style.display = 'none';
      child['style'].boxShadow = 'none';
    }

    element.style.height =
      element.scrollHeight +
      layoutHeaderHeight +
      componentHeaderHeight +
      footerHeight +
      'px';
  }
};

/**
 * 이미지 작업 후 css 초기화
 */
const changeCsstoInit = (element) => {
  if (!element) return;
  const tableContainer = element.querySelector('#table-container');
  const muiCards = element.getElementsByClassName('MuiCard-root');
  const muiTabs = element.getElementsByClassName('MuiTab-root');

  for (const tab of muiTabs) {
    tab['style'].display = '';
  }

  for (const card of muiCards) {
    card['style'].boxShadow = '';
    card['style'].border = '';
  }
  element.style.height = '';
  element.style.width = '';
  if (tableContainer) {
    for (const child of tableContainer.children) {
      child.getElementsByTagName('button')[0].style.display = '';
      child['style'].height = '';
      child['style'].boxShadow = '';
    }
    tableContainer['style'].boxShadow = '';
    tableContainer['style'].overflowY = 'auto';
  }
};
