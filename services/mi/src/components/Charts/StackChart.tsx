import { StackChart as CStackChart, IStackChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const StackChart = (props: IStackChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CStackChart resize={open} {...props} />;
};
