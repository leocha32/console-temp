import React, { useEffect, useRef, useState } from 'react';
import Select, {
  components,
  Props as SelectProps,
  MenuListProps,
  InputActionMeta,
  ValueContainerProps,
  SingleValueProps,
  PlaceholderProps,
} from 'react-select';

const { MenuList, ValueContainer, SingleValue, Placeholder } = components;

const CustomMenuList = ({ selectProps, ...props }: MenuListProps) => {
  const { onInputChange, inputValue, onFocus } = selectProps;

  return (
    <div>
      <input
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: 10,
          border: 'none',
          borderBottom: '1px solid lightgrey',
        }}
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        type="text"
        value={inputValue}
        onChange={(e) =>
          onInputChange(e.currentTarget.value, {
            action: 'input-change',
          } as InputActionMeta)
        }
        onMouseDown={(e: any) => {
          e.stopPropagation();
          e.target.focus();
        }}
        onTouchEnd={(e: any) => {
          e.stopPropagation();
          e.target.focus();
        }}
        onFocus={onFocus}
        placeholder="Search..."
      />
      <MenuList {...props} selectProps={selectProps} />
    </div>
  );
};

const CustomValueContainer = ({
  children,
  selectProps,
  ...props
}: ValueContainerProps) => {
  const SingleValues = {
    cx: props.cx,
    clearValue: props.clearValue,
    getStyles: props.getStyles,
    getValue: props.getValue,
    hasValue: props.hasValue,
    isMulti: props.isMulti,
    isRtl: props.isRtl,
    options: props.options,
    selectOption: props.selectOption,
    setValue: props.setValue,
    selectProps,
    theme: props.theme,
  } as SingleValueProps;
  const PlaceHolderProperties = {
    ...props,
  } as PlaceholderProps;
  return (
    <ValueContainer {...props} selectProps={selectProps}>
      {React.Children.map(children, (child) => {
        return child ? (
          child
        ) : props.hasValue ? (
          <SingleValue {...SingleValues} isDisabled={selectProps.isDisabled}>
            {selectProps.getOptionLabel(props.getValue()[0])}
          </SingleValue>
        ) : (
          <Placeholder
            {...PlaceHolderProperties}
            key="placeholder"
            isDisabled={selectProps.isDisabled}
          >
            {selectProps.placeholder}
          </Placeholder>
        );
      })}
    </ValueContainer>
  );
};

export interface IMultiSelectProps extends SelectProps {
  width?: string;
  selectAllLabel?: string;
}

export const MultiSelect = ({
  value = [],
  options = [],
  styles = {},
  width = '100%',
  selectAllLabel = 'All',
  ...props
}: IMultiSelectProps) => {
  const containerRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const valueRef = useRef<any>(value);
  valueRef.current = value;

  const selectAllOption = {
    value: '<SELECT_ALL>',
    label: selectAllLabel,
  };

  const isSelectAllSelected = () => valueRef.current.length === options.length;

  const isOptionSelected = (option) =>
    valueRef.current.some(({ value }) => value === option.value) || isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...options];

  const getValue = () => (isSelectAllSelected() ? [selectAllOption] : value);

  const changeSelect = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === 'select-option' && option.value === selectAllOption.value) {
      props.onChange!(options, actionMeta);
    } else if (
      (action === 'deselect-option' && option.value === selectAllOption.value) ||
      (action === 'remove-value' && removedValue.value === selectAllOption.value)
    ) {
      props.onChange!([], actionMeta);
    } else if (actionMeta.action === 'deselect-option' && isSelectAllSelected()) {
      props.onChange!(
        options.filter(({ value }: any) => value !== option.value),
        actionMeta,
      );
    } else {
      props.onChange!(newValue || [], actionMeta);
    }
  };
  const customStyles = {
    container: (base) => ({
      ...base,
      width: width,
    }),
  };

  useEffect(() => {
    const onDomClick = (e) => {
      const menu = containerRef?.current?.querySelector('.select__menu');

      if (
        !containerRef?.current?.contains(e.target) ||
        !menu ||
        !menu.contains(e.target)
      ) {
        setIsFocused(false);
        setInputValue('');
      }
    };
    document.addEventListener('mousedown', onDomClick);

    return () => {
      document.removeEventListener('mousedown', onDomClick);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Select
        isMulti={true}
        options={getOptions()}
        value={getValue()}
        components={{
          MenuList: CustomMenuList,
          ValueContainer: CustomValueContainer,
        }}
        isOptionSelected={isOptionSelected}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        styles={customStyles}
        inputValue={inputValue}
        isSearchable={false}
        onFocus={() => setIsFocused(true)}
        onChange={changeSelect}
        onInputChange={(val) => setInputValue(val)}
        {...{
          menuIsOpen: isFocused || undefined,
          isFocused: isFocused || undefined,
        }}
      />
    </div>
  );
};
