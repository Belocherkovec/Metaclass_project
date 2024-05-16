import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './multiDropDown.module.scss';

export type Option = {
  id: number;
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  const open = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        setIsOpened(false);
      }
    };

    window.addEventListener('click', handlerClick);
    return () => {
      window.removeEventListener('click', handlerClick);
    };
  }, []);

  useEffect(() => {
    if (isOpened) {
      setFilter('');
    }
  }, [isOpened]);

  const title = useMemo(() => getTitle(value), [getTitle, value]);
  const isEmpty = value.length === 0;

  const filterOptions = useMemo(() => {
    const str = filter.toLocaleLowerCase();

    return options.filter((o) => o.value.toLocaleLowerCase().indexOf(str) === 0);
  }, [filter, options]);

  const selectedKeysSet = useMemo<Set<Option['key']>>(() => new Set(value.map(({ key }) => key)), [value]);

  const onSelect = useCallback(
    (option: Option) => {
      if (disabled) return;

      /* multiChooise */
      // if (selectedKeysSet.has(option.key)) {
      //   onChange([...value].filter(({ key }) => key !== option.key));
      // } else {
      //   onChange([...value, option]);
      // }

      /* one choice */
      if (selectedKeysSet.has(option.key)) {
        onChange([]);
      } else {
        onChange([option]);
      }

      ref.current?.focus();
    },
    [disabled, onChange, value, selectedKeysSet],
  );

  const opened = isOpened && !disabled;

  return (
    <div className={cn(styles.multidropdown, className)} ref={wrapperRef}>
      <Input
        onClick={open}
        disabled={disabled}
        placeholder={title}
        value={opened ? filter : isEmpty ? '' : title}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="secondary" />}
        ref={ref}
      />
      {opened && (
        <div className={styles.multidropdown__options}>
          {filterOptions.map((option) => (
            <button
              className={cn(
                styles.multidropdown__option,
                selectedKeysSet.has(option.key) && styles.multidropdown__option_selected,
              )}
              key={option.key + option.id}
              onClick={() => {
                onSelect(option);
              }}
            >
              <Text view="p-16">{option.value}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
