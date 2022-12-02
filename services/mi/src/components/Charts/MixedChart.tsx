import { MixedChart as CMixedChart, IMixedChartProps } from 'mi-ui/src';
import menu from '$recoils/menu';
import { useRecoilValue } from 'recoil';

export const MixedChart = (props: IMixedChartProps) => {
  const { open } = useRecoilValue(menu);
  return <CMixedChart resize={open} {...props} />;
};
