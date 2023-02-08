import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Table, IColumn } from 'mi-ui';
type headerParams = {
  showIcon: boolean;
  showArea: boolean;
};
export const ProductHeader = (showArea, onClick, isProduct) => {
  return [
    {
      name: '매체 구분',
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
    },
    {
      name: '매체',
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
      onClick: onClick,
      icon: showArea ? <ArrowRightIcon /> : <ArrowDropDownIcon />,
    },
    {
      name: '지면',
      sx: {
        display: `${showArea ? 'none' : ''}`,
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
    },
    {
      name: '광고리포트',
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
      columns: [
        {
          name: '광고비',
        },
        {
          name: '노출',
        },
        {
          name: '클릭',
        },
        {
          name: 'CTR',
        },
        {
          name: 'CPC',
        },
        {
          name: '조회',
        },
        {
          name: 'VTR',
        },
      ],
    },
    {
      name: 'GA',
      sx: {
        backgroundColor: 'aliceblue',
        paddingTop: 0,
        paddingBottom: 0,
        border: '1px solid rgba(224, 224, 224, 1) ',
      },
      columns: [
        {
          name: '유입',
        },
        {
          name: '주문신청',
          sx: {
            display: `${isProduct ? '' : 'none'}`,
          },
        },
        {
          name: '주문신청 CPA',
          sx: {
            display: `${isProduct ? '' : 'none'}`,
          },
        },
        {
          name: '주문완료',
          sx: {
            display: `${isProduct ? '' : 'none'}`,
          },
        },
        {
          name: '주문완료 CPA',
          sx: {
            display: `${isProduct ? '' : 'none'}`,
          },
        },
        {
          name: '서비스신청',
          sx: {
            display: `${isProduct ? 'none' : ''}`,
          },
        },
        {
          name: '서비스신청 CPA',
          sx: {
            display: `${isProduct ? 'none' : ''}`,
          },
        },
      ],
    },
  ] as IColumn[];
};
