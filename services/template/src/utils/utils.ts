/**
 * 뮨자열을 hash code로 변환
 * @param str 문자열
 * @returns 숫자 hashCode값
 */
export const hashCode = (str: string): number => {
  const len = str.length;
  let hash = 0;

  if (!len) {
    return hash;
  }

  let i = 0;

  while (i < len) {
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) | 0;
  }

  return hash;
};
