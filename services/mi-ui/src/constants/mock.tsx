import React from 'react';
import { TMenu } from '../types';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BackupIcon from '@mui/icons-material/Backup';

export const SHARE = {
  description: '[요약] 시장 점유율',
  cowayMarketShare: [
    {
      productGroup: '매트리스',
      marketShareValue: 5.2,
      marketShareRank: 4,
      marketShareHohValue: 4.6,
      hohDiff: 0.6,
    },
    {
      productGroup: '비데',
      marketShareValue: 22.3,
      marketShareRank: 2,
      marketShareHohValue: 21.9,
      hohDiff: 0.4,
    },
    {
      productGroup: '안마의자',
      marketShareValue: 0,
      marketShareRank: 7,
      marketShareHohValue: 5.4,
      hohDiff: -5.4,
    },
    {
      productGroup: '정수기',
      marketShareValue: 27.1,
      marketShareRank: 1,
      marketShareHohValue: 26.2,
      hohDiff: 0.9,
    },
    {
      productGroup: '청정기',
      marketShareValue: 7.6,
      marketShareRank: 4,
      marketShareHohValue: 8.9,
      hohDiff: -1.3,
    },
  ],
  productPenetration: [
    {
      productGroup: '매트리스',
      productPenetrationValue: 82.7,
    },
    {
      productGroup: '비데',
      productPenetrationValue: 47,
    },
    {
      productGroup: '안마의자',
      productPenetrationValue: 11.5,
    },
    {
      productGroup: '정수기',
      productPenetrationValue: 49.2,
    },
    {
      productGroup: '청정기',
      productPenetrationValue: 62.3,
    },
  ],
  marketShareRank: [
    {
      productGroup: '매트리스',
      brand: '에이스침대',
      marketShareValue: 10.2,
      marketShareRank: 1,
    },
    {
      productGroup: '매트리스',
      brand: '한샘',
      marketShareValue: 7.3,
      marketShareRank: 2,
    },
    {
      productGroup: '매트리스',
      brand: '시몬스',
      marketShareValue: 5.6,
      marketShareRank: 3,
    },
    {
      productGroup: '비데',
      brand: '노비타',
      marketShareValue: 23.6,
      marketShareRank: 1,
    },
    {
      productGroup: '비데',
      brand: '코웨이',
      marketShareValue: 22.3,
      marketShareRank: 2,
    },
    {
      productGroup: '비데',
      brand: 'SK매직',
      marketShareValue: 12.1,
      marketShareRank: 3,
    },
    {
      productGroup: '안마의자',
      brand: '바디프랜드',
      marketShareValue: 25.3,
      marketShareRank: 1,
    },
    {
      productGroup: '안마의자',
      brand: '세라젬',
      marketShareValue: 17.9,
      marketShareRank: 2,
    },
    {
      productGroup: '안마의자',
      brand: '코지마',
      marketShareValue: 16.4,
      marketShareRank: 3,
    },
    {
      productGroup: '정수기',
      brand: '코웨이',
      marketShareValue: 27.1,
      marketShareRank: 1,
    },
    {
      productGroup: '정수기',
      brand: 'LG전자',
      marketShareValue: 22.6,
      marketShareRank: 2,
    },
    {
      productGroup: '정수기',
      brand: 'SK매직',
      marketShareValue: 15.6,
      marketShareRank: 3,
    },
    {
      productGroup: '청정기',
      brand: 'LG전자',
      marketShareValue: 25.9,
      marketShareRank: 1,
    },
    {
      productGroup: '청정기',
      brand: '삼성전자',
      marketShareValue: 15.6,
      marketShareRank: 2,
    },
    {
      productGroup: '청정기',
      brand: '위닉스',
      marketShareValue: 13.7,
      marketShareRank: 3,
    },
  ],
  researchReportFile: {
    bucket: 'coway-mi-console',
    projectId: 'nm-prod-global-cw-mi',
    year: '2021',
    half: '2',
    category: 'MARKET_SHARE',
    filePath: 'research/reports/MARKET_SHARE-3a207672-a282-40ef-a27f-0f5488af3764.pdf',
    originalFileName:
      '코웨이 마케팅실 리서치팀_2021년 2H B2C 시장점유율 조사 보고서_0516.pdf',
    updatedTimestamp: 1661935649558,
    blob: null,
  },
};
export const menu: TMenu[] = [
  {
    path: '/',
    children: [
      {
        path: '/page1',
        label: '리포트',
        icon: <SummarizeIcon />,
        children: [
          {
            path: 'sub1',
            label: '시장 현황',
            children: [
              {
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                path: 'children2',
                label: '시장 점유율(M/S)',
              },
            ],
          },
          {
            path: 'sub2',
            label: '계정 및 판매',
            children: [
              {
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                path: 'children2',
                label: '계정',
              },
              {
                path: 'children3',
                label: '고객',
              },
            ],
          },
        ],
      },
      {
        path: '/page2',
        label: '분석',
        icon: <AssessmentIcon />,
        children: [
          {
            path: 'sub1',
            label: '시장 현황',
            children: [
              {
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                path: 'children2',
                label: '시장 점유율(M/S)',
              },
            ],
          },
          {
            path: 'sub2',
            label: '계정 및 판매',
            children: [
              {
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                path: 'children2',
                label: '계정',
              },
              {
                path: 'children3',
                label: '고객',
              },
            ],
          },
        ],
      },
      {
        path: '/test',
        label: '테스트',
        icon: <BackupIcon />,
      },
    ],
  },
];
