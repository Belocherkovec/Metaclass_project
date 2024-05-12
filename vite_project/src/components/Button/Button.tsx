import Loader from 'components/Loader';
import cn from 'classnames';
import Text from 'components/Text';
import styles from './button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, loading, disabled, children, ...props }) => {
  return (
    <button
      className={cn(styles.button, disabled && styles.disabled, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader size="s" className={styles.button__loader} />}
      <Text tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
