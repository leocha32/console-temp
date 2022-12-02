import { StackChart as CStackChart, IStackBarChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const StackChart = (props: IStackBarChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CStackChart resize={open} {...props} />;
};
