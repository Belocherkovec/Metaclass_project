import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import cn from 'classnames';
import styles from './pagination.module.scss';
import { observer } from 'mobx-react-lite';
import PaginationStore from 'store/PaginationStore';
import { useEffect } from 'react';

export type PaginationProps = {
  className?: string;
  total: number;
  // onChange: (value: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ className, total }) => {
  const pagination = new PaginationStore();

  pagination.total = total;

  useEffect(() => {
    pagination.total = total;
    console.log(pagination.total);
  }, []);

  return (
    <div className={cn(styles.pagination, className)}>
      <button className={styles.pagination__button} disabled={pagination.page === 1} onClick={pagination.decrementPage}>
        <ArrowRightIcon />
      </button>
      {pagination.pagination.map((e) => (
        <button
          className={cn(styles.pagination__item, e.isActive && styles.pagination__item_active)}
          disabled={e.isDisabled}
          key={e.content}
          onClick={() => pagination.goToPage(+e.content)}
        >
          {e.content}
        </button>
      ))}
      <button
        className={cn(styles.pagination__button, styles.pagination__button_right)}
        disabled={pagination.page === pagination.total}
        onClick={pagination.incrementPage}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default observer(Pagination);
