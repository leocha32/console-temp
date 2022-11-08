import React from 'react';
import fileDownload from 'js-file-download';
import html2canvas, { Options } from 'html2canvas';
import pathName from '$constants/pathName';
import HomeIcon from '@mui/icons-material/Home';

export function saveImage(
  element: HTMLElement,
  fileName: string,
  options?: Options,
): void {
  setTimeout(async () => {
    try {
      changeCssFitCanvas(element);

      const canvas = await html2canvas(element, options);
      canvas.toBlob((blob: any) => {
        fileDownload(blob, fileName);
      }, 'image/png');

      changeCsstoInit(element);
    } catch (e) {
      console.log(e);
    }
  }, 300);
}

export const getCrumbs = () => {
  const location = window.location.pathname;

  return location.split('/').map((path) => {
    return path === ''
      ? {
          name: pathName['home'],
          icon: <HomeIcon fontSize={'small'} sx={{ marginRight: '2px' }} />,
        }
      : { name: pathName[dashToCamelCase(path)] };
  });
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
  const tableContainer = element.querySelector('#table-container');
  const muiCards = element.getElementsByClassName('MuiCard-root');
  const muiTabs = element.getElementsByClassName('MuiTab-root');

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

    for (const child of tableContainer.children) {
      const length = tableContainer.children.length;
      child['style'].height = tableContainer.clientHeight / length;
      child.getElementsByTagName('button')[0].style.display = 'none';
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

  if (tableContainer) {
    for (const child of tableContainer.children) {
      child.getElementsByTagName('button')[0].style.display = '';
      child['style'].height = '';
    }
    tableContainer['style'].overflowY = 'auto';
    element.style.height = '';
  }
};
