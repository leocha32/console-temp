import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BackupIcon from '@mui/icons-material/Backup';
export const menu = [
    {
        path: '/',
        children: [
            {
                path: '/page1',
                label: '리포트',
                icon: _jsx(SummarizeIcon, {}),
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
                icon: _jsx(AssessmentIcon, {}),
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
                icon: _jsx(BackupIcon, {}),
            },
        ],
    },
];
