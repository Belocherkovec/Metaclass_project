import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import cn from 'classnames';
import styles from './pagination.module.scss';
import { useState } from 'react';

export type PaginationProps<T> = {
  className?: string;
  data?: Array<T>;
  itemsLimit: number;
  itemsCount: number;
  currentPage: number;
  handler: (value: number) => void;
};

const Pagination: React.FC<PaginationProps<any>> = ({
  className,
  data,
  itemsLimit,
  itemsCount,
  currentPage,
  handler,
}) => {
  const pagesLimit = Math.round(itemsCount / itemsLimit);

  return (
    <div className={cn(styles.pagination, className)}>
      <button className={styles.pagination__button}>
        <ArrowRightIcon />
      </button>
      <ul className={styles.pagination__control}>
        {currentPage + 2 < pagesLimit ? <>{currentPage - 1 > 0 && <li>{currentPage - 1}</li>}</> : <></>}
        {/* {currentPage - 1 > 0 && <li>{currentPage - 1}</li>}
        <li>{currentPage}</li>
        {currentPage + 1 <= pagesLimit && currentPage + 1}
        {currentPage + 2 < pagesLimit && (
          <>
            <li>...</li>
            <li>{pagesLimit}</li>
          </>
        )} */}
      </ul>
      <button className={styles.pagination__button}>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
