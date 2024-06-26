import cn from 'classnames';
import { forwardRef, useCallback } from 'react';

import styles from './input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, afterSlot, disabled, ...props }, ref) => {
    // onChange не будет инициализироваться каждый раз при смене например value
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.value);
      },
      [onChange],
    );

    return (
      <label className={cn(styles.input, disabled && styles.disabled, className)}>
        <input
          className={styles.input__field}
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {afterSlot}
      </label>
    );
  },
);

Input.displayName = 'Input'; // Добавление displayName к компоненту
export default Input;
