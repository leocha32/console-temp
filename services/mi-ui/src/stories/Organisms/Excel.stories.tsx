import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { TempGrid as CTempGrid } from 'components/Organisms';

export default {
  title: 'Organisms/ExcelSample',
  component: CTempGrid,
} as ComponentMeta<typeof CTempGrid>;

export const ExcelSample: ComponentStory<typeof CTempGrid> = () => <CTempGrid />;
