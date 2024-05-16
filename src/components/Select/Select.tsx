import cn from 'classnames';
import { useRef, useEffect } from 'react';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import CloseIcon from 'components/icons/CloseIcon';
import useToggleState from 'utils/useToggleState.ts';
import styles from './select.module.scss';

export type SelectProps = {
  className?: string;
  options: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ className, options, value, onChange }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const { isOpen, ...setIsOpen } = useToggleState();

  const onClickHandler = () => {
    setIsOpen.toggle();
  };
  const onChangeHandler = (targetValue: string) => {
    if (targetValue === value) {
      onChange('');
    } else {
      onChange(targetValue);
    }
  };

  useEffect(() => {
    const closeClick = (e: MouseEvent) => {
      if (!selectRef.current?.contains(e.target as HTMLElement)) {
        setIsOpen.close();
      }
    };
    window.addEventListener('click', closeClick);
    return () => {
      window.removeEventListener('click', closeClick);
    };
  }, []);

  return (
    <div className={cn(className, styles.select)} ref={selectRef}>
      <div
        onClick={onClickHandler}
        className={cn(
          styles.select__value,
          isOpen && styles.select__value_opened,
          (!value || isOpen) && styles.select__value_empty,
        )}
      >
        {value || 'Select category'}
        {isOpen ? <CloseIcon color="secondary" /> : <ArrowDownIcon color="secondary" />}
      </div>
      {isOpen && (
        <div className={styles.select__options}>
          {Object.entries(options).map(([key, curValue]) => (
            <button
              key={curValue + key}
              onClick={() => onChangeHandler(curValue)}
              className={cn(styles.select__option, curValue === value && styles.select__option_selected)}
            >
              {curValue}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
