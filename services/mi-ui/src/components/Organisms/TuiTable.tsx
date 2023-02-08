import TuiGrid, { GridOptions, GridEventListener, GridEventName } from 'tui-grid';
import { TuiGridEvent } from 'tui-grid/types/event';
import { useRef, useEffect, HTMLAttributes } from 'react';
import { Select } from '../Atoms/Select';
import 'tui-grid/dist/tui-grid.css';
import { renderToStaticMarkup } from 'react-dom/server';

TuiGrid.applyTheme('default', {
  selection: {
    background: '#4daaf9',
    border: '#004082',
  },
  scrollbar: {
    background: '#f5f5f5',
    thumb: '#d9d9d9',
    active: '#c1c1c1',
  },
  row: {
    even: {
      background: '#f3ffe3',
    },
    hover: {
      background: '#ccc',
    },
  },
  cell: {
    normal: {
      background: '#fbfbfb',
      border: '#e0e0e0',
      showVerticalBorder: true,
    },
    header: {
      background: '#eee',
      border: '#ccc',
      showVerticalBorder: true,
    },
    rowHeader: {
      border: '#ccc',
      showVerticalBorder: true,
    },
    editable: {
      background: '#fbfbfb',
    },
    selectedHeader: {
      background: '#d8d8d8',
    },
    focused: {
      border: '#418ed4',
    },
    disabled: {
      text: '#b0b0b0',
    },
  },
});
type TEventNameMapping = {
  onClick: 'click';
  onDblclick: 'dblclick';
  onMousedown: 'mousedown';
  onMouseover: 'mouseover';
  onMouseout: 'mouseout';
  onFocusChange: 'focusChange';
  onColumnResize: 'columnResize';
  onBeforeChange: 'beforeChange';
  onAfterChange: 'afterChange';
  expand: 'expand';
  collapse: 'collapse';
  onCheck: 'check';
  onUncheck: 'uncheck';
  onCheckAll: 'checkAll';
  onUncheckAll: 'uncheckAll';
  onSelection: 'selection';
  onEditingStart: 'editingStart';
  onEditingFinish: 'editingFinish';
  onSort: 'sort';
  onFilter: 'filter';
  onScrollEnd: 'scrollEnd';
  onBeforeRequest: 'beforeRequest';
  onResponse: 'response';
  onSuccessResponse: 'successResponse';
  onFailResponse: 'failResponse';
  onErrorResponse: 'errorResponse';
};

type TEventMaps = {
  [K in keyof TEventNameMapping]?: GridEventListener;
};

type TProps = Omit<GridOptions, 'el'> &
  TEventMaps &
  HTMLAttributes<HTMLElement> & {
    oneTimeBindingProps?: Array<'data' | 'columns' | 'bodyHeight' | 'frozenColumnCount'>;
  } & {
    clickTreeButton?: (eventName: string, eventProps: TuiGridEvent) => void;
  };

export const TuiTable = ({
  clickTreeButton = () => null,
  treeColumnOptions,
  ...props
}: TProps) => {
  let gridInstance: TuiGrid;
  const gridContainer = useRef<HTMLDivElement>(null);
  const bindEventHandlers = (props, gridInstance) => {
    Object.keys(props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        gridInstance?.off(eventName as GridEventName);
        gridInstance?.on(eventName as GridEventName, props[key]);
      });
  };

  useEffect(() => {
    const el = gridContainer.current;
    if (!el) return;
    const gridOption = {
      el,
      ...props,
      treeColumnOptions,
    };

    gridInstance = new TuiTable(gridOption);
    bindEventHandlers(props, gridInstance);
    gridInstance.on('onGridMounted', (e) => {
      console.log(e);
    });

    gridInstance.on('expand', (event) => {
      gridInstance.getDescendantRows(event['rowKey']);
      clickTreeButton('hide', event);
    });

    gridInstance.on('collapse', (event) => {
      gridInstance.getDescendantRows(event['rowKey']);
      clickTreeButton('show', event);
    });

    return () => {
      gridInstance?.destroy();
    };
  }, []);

  return <div ref={gridContainer}></div>;
};

export function Link(props) {
  const element = document.createElement('a');
  element.setAttribute('style', 'color: #4285f4; display: flex;');
  const select = renderToStaticMarkup(
    Select({
      options: [
        { value: 'test1', label: 'test1' },
        { value: 'test2', label: 'test2' },
      ],
      value: '',
      onChange: (e) => console.log(e),
    }),
  );
  element.innerHTML = select;
  function getElement() {
    return element;
  }

  function render(props: any) {}
  // render(props);
  return {
    getElement,
    render,
  };
}
