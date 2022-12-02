import { PieChart as CPieChart, IPieChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const PieChart = (props: IPieChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CPieChart resize={open} {...props} />;
};
