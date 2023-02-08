import React from 'react';
import { AccessType, IMenus } from '../types';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BackupIcon from '@mui/icons-material/Backup';

export const menu: IMenus[] = [
  {
    path: '/',
    elementKey: '',
    children: [
      {
        path: '/page1',
        label: '리포트',
        elementKey: '',
        access: AccessType.ALL,
        icon: <SummarizeIcon />,
        children: [
          {
            path: 'sub1',
            label: '시장 현황',
            elementKey: '',
            children: [
              {
                elementKey: '',
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                elementKey: '',
                path: 'children2',
                label: '시장 점유율(M/S)',
              },
            ],
          },
          {
            path: 'sub2',
            label: '계정 및 판매',
            elementKey: '',
            children: [
              {
                elementKey: '',
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                elementKey: '',
                path: 'children2',
                label: '계정',
              },
              {
                elementKey: '',
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
        elementKey: '',
        icon: <AssessmentIcon />,
        children: [
          {
            path: 'sub1',
            label: '시장 현황',
            elementKey: '',
            children: [
              {
                path: 'children1',
                elementKey: '',
                label: 'Executive Summary',
              },
              {
                elementKey: '',
                path: 'children2',
                label: '시장 점유율(M/S)',
              },
            ],
          },
          {
            path: 'sub2',
            label: '계정 및 판매',
            elementKey: '',
            children: [
              {
                elementKey: '',
                path: 'children1',
                label: 'Executive Summary',
              },
              {
                elementKey: '',
                path: 'children2',
                label: '계정',
              },
              {
                elementKey: '',
                path: 'children3',
                label: '고객',
              },
            ],
          },
        ],
      },
      {
        elementKey: '',
        path: '/test',
        label: '테스트',
        icon: <BackupIcon />,
      },
    ],
  },
];
