import { BarChart as CBarChart, IBarChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const BarChart = (props: IBarChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CBarChart resize={open} {...props} />;
};
