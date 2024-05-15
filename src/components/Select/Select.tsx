import styles from './select.module.scss';
import cn from 'classnames';

export type SelectProps = {
  className?: string;
  options: Record<string, string>;
  value: string;
  // onChange: () => void;
};

const Select: React.FC<SelectProps> = ({ className, options, value }) => {
  return (
    <div className={cn(className, styles.select)}>
      <p>{value}</p>
      <div>
        {Object.entries(options).map(([key, value]) => (
          <div key={value + key}>{value}</div>
        ))}
      </div>
    </div>
  );
};

export default Select;
