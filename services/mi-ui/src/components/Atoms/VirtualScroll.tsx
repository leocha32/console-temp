import {
  useRef,
  useCallback,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  UIEvent,
} from 'react';
import styled from '@emotion/styled';

const Wrap = styled.div`
  height: ${({ height }: { height: number }) => height}px;
  overflow: auto;
`;

const TopWrap = styled.div`
  height: ${({ height }: { height: number }) => height}px;
`;

const BottomWrap = styled.div`
  height: ${({ height }: { height: number }) => height}px;
`;

export interface IVirtualScrollProps {
  renderAhead?: number;
  height?: number;
  focusIndex?: number;
  childrenHeight: number;
  childrenComponent: (index) => ReactNode;
  itemCount?: number;
}
const useScroll = (initialPosition) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollTop = initialPosition;
    }
  }, []);

  return ref;
};

export const VirtualScroll = ({
  renderAhead = 2,
  childrenHeight,
  height = 200,
  focusIndex = 0,
  childrenComponent,
  itemCount = 10000,
}: IVirtualScrollProps) => {
  const itemsAbove = focusIndex - renderAhead;
  const toleranceHeight = renderAhead * childrenHeight;
  const contentsWrapHeight = itemCount * childrenHeight;
  const bufferedItems = Math.ceil(height / childrenHeight) + 2 * renderAhead;
  const initialPosition = itemsAbove * childrenHeight + toleranceHeight;

  const ref = useScroll(initialPosition);

  const [scrollTop, setScrollTop] = useState(0);

  const index = Math.floor((scrollTop - toleranceHeight) / childrenHeight);

  const endNode = Math.min(index + bufferedItems, itemCount);
  const startNode = Math.max(index, 0);
  const visibleCount = useMemo(() => endNode - startNode, [endNode, startNode]);

  const topPaddingHeight = Math.max(index * childrenHeight, 0);
  const bottomPaddingHeight = Math.max(
    contentsWrapHeight - topPaddingHeight - visibleCount * childrenHeight,
    0,
  );

  useEffect(() => {
    if (!initialPosition) {
      handleScroll({ currentTarget: { scrollTop: 0 } } as UIEvent<HTMLDivElement>);
    }
  }, []);

  const handleScroll = useCallback(
    ({ currentTarget: { scrollTop } }: UIEvent<HTMLDivElement>) => {
      setScrollTop(scrollTop);
    },
    [],
  );

  const visibleChildren = useMemo(
    () =>
      new Array(visibleCount)
        .fill(null)
        .map((_, index) => childrenComponent(index + startNode)),
    [startNode, visibleCount, childrenComponent],
  );

  return (
    <Wrap ref={ref} onScroll={handleScroll} height={height}>
      <TopWrap height={topPaddingHeight} />
      {visibleChildren}
      <BottomWrap height={bottomPaddingHeight} />
    </Wrap>
  );
};
