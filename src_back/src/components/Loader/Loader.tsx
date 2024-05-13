import SpinnerIcon from 'components/icons/SpinnerIcon';
import cn from 'classnames';
import styles from './loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className, size = 'l' }) => {
  return <SpinnerIcon className={cn(styles.loader, styles[size], className)} color="accent" />;
};

export default Loader;
