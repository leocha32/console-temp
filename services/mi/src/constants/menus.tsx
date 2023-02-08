import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IMenus } from 'mi-ui/src';

const menus: IMenus[] = [
  {
    path: '/',
    elementKey: 'layout',
    children: [
      { index: true, elementKey: 'home' },
      {
        path: 'report',
        label: '리포트',
        elementKey: 'report',
        icon: <SummarizeIcon />,
        children: [
          {
            path: 'research',
            label: '시장 현황',
            elementKey: 'research',
            children: [
              {
                path: 'market-share',
                label: '시장 점유율',
                elementKey: 'marketShare',
              },
              {
                path: 'sales-volume',
                label: '시판 판매량',
                elementKey: 'salesVolume',
              },
              {
                path: 'brand-awareness',
                label: '브랜드 인지도',
                elementKey: 'brandAwareness',
              },
            ],
          },
          {
            path: 'account',
            label: '계정 및 판매',
            elementKey: 'account',
            children: [
              {
                path: 'summary',
                label: '요약',
                elementKey: 'accountExecutiveSummary',
              },
              {
                path: 'status',
                label: '계정',
                elementKey: 'status',
              },
              {
                path: 'combination',
                label: '계정 보유 조합',
                elementKey: 'combination',
              },

              {
                path: 'customer',
                label: '고객',
                elementKey: 'customer',
              },

              {
                path: 'sales',
                label: '전사 판매',
                elementKey: 'sales',
              },
              {
                path: 'org-sales',
                label: '조직별 판매',
                elementKey: 'salesOrganization',
              },
            ],
          },
          {
            path: 'marketing',
            label: '마케팅',
            elementKey: 'marketing',
            children: [
              {
                path: 'costs-efficiency',
                label: '마케팅 비용 및 효율',
                elementKey: 'marketingCostsEfficiency',
              },
              {
                path: 'atl',
                label: 'ATL',
                elementKey: 'atl',
              },
              {
                path: 'keyword-analysis',
                label: '키워드 분석',
                elementKey: 'keywordAnalysis',
              },
              {
                path: 'digital',
                label: '디지털',
                elementKey: 'digital',
              },
            ],
          },
        ],
      },
      {
        path: 'management',
        label: '관리',
        elementKey: 'management',
        icon: <ManageAccountsIcon />,
        children: [
          {
            path: 'data',
            label: 'Data',
            elementKey: '',
            children: [
              {
                path: 'research',
                label: 'Research',
                elementKey: 'dataResearch',
              },
              {
                path: 'brand',
                label: 'Brand',
                elementKey: '',
              },
              {
                path: 'performance',
                label: 'Performance',
                elementKey: '',
              },
            ],
          },
          {
            path: 'administrator',
            label: 'Administrator',
            elementKey: 'administrator',
            children: [
              {
                path: 'user',
                label: 'User',
                elementKey: 'user',
                children: [
                  { index: true, elementKey: 'userList' },
                  {
                    hidden: true,
                    elementKey: 'userList',
                    children: [
                      {
                        path: 'add',
                        hidden: true,
                        elementKey: 'addUserForm',
                      },
                      {
                        path: 'edit',
                        hidden: true,
                        elementKey: 'editUserForm',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/logout',
    elementKey: 'logout',
  },
  {
    path: '/unauthorized',
    elementKey: 'unauthorized',
  },
];

export default menus;
