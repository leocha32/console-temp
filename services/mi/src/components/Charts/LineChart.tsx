import { LineChart as CLineChart, ILineChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const LineChart = (props: ILineChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CLineChart resize={open} {...props} />;
};
