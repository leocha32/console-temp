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
      const canvas = await html2canvas(element, options);
      canvas.toBlob((blob: any) => {
        fileDownload(blob, fileName);
      }, 'image/png');
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
