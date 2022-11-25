import { atom } from 'recoil';
import { IResearchSelectableItem } from '$modules/report/research';

const selectableItems = atom({
  key: 'research-selectable-items',
  default: [] as IResearchSelectableItem[],
});

export default selectableItems;
