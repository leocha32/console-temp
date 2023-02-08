import { FunnelStackChart as CFunnelStackChart, IFunnelStackChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const FunnelStackChart = (props: IFunnelStackChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CFunnelStackChart resize={open} {...props} />;
};
