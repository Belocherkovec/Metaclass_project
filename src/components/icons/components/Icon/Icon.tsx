import cn from 'classnames';
import styles from './icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  children,
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  ...props
}) => {
  return (
    <svg
      className={cn(styles.icon, color && styles[color], className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
