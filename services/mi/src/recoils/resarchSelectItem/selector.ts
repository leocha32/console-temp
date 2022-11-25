import { selectorFamily } from 'recoil';
import selectableItems from './atom';
import { ReportIndex } from '$constants/enum';

export const selectableItemsSelector = selectorFamily({
  key: 'selectable-items-selector',
  get:
    (reportIndex: ReportIndex) =>
    ({ get }) => {
      const list = get(selectableItems);
      return list
        .filter((item) => item.reportIndex === reportIndex)
        .map((i) => {
          const [year, quarter] = i.item.split('_');
          const label = `${year}년`;
          return {
            value: i.item,
            label: quarter
              ? label.concat(quarter === '1' ? ' 상반기' : ' 하반기')
              : label,
          };
        });
    },
});
