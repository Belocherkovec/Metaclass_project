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
      setIsOpen.close();
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
    <div
      className={cn(
        className,
        styles.select,
        isOpen && styles.select_opened,
        (!value || isOpen) && styles.select_empty,
      )}
      ref={selectRef}
      onClick={onClickHandler}
    >
      <div>{options[value] || 'Select category'}</div>
      {isOpen ? (
        <CloseIcon color="secondary" className={styles.select__icon} />
      ) : (
        <ArrowDownIcon color="secondary" className={styles.select__icon} />
      )}
      {isOpen && (
        <div className={styles.select__options}>
          {Object.entries(options).map(([key, curValue]) => (
            <button
              key={curValue + key}
              onClick={() => onChangeHandler(key)}
              className={cn(styles.select__option, key === value && styles.select__option_selected)}
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
