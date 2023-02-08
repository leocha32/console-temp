import colorConvert from 'color-convert';

export const colorToRgb = (hex: any) => {
  if (hex.match(/^rgb/)) {
    return hex.replace(/[^\d]/g, '').split(',').slice(0, 3);
  } else if (hex.match(/^#/)) {
    return colorConvert.hex.rgb(hex.replace('#', ''));
  } else {
    return colorConvert.keyword.rgb(hex);
  }
};
