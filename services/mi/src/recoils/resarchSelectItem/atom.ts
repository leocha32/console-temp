import { atom } from 'recoil';
import { TResearchSelectableItem } from '$modules/report/research';

const selectableItems = atom({
  key: 'research-selectable-items',
  default: [] as TResearchSelectableItem[],
});

export default selectableItems;
