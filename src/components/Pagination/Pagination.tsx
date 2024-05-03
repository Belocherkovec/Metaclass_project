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
  const pagesLimit = Math.ceil(itemsCount / itemsLimit);
  const [isLeftDisabled, isRightDisabled] = [currentPage === 1, currentPage === pagesLimit];

  function onClickHandler(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    console.log(target.className);
  }

  return (
    <div className={cn(styles.pagination, className)} onClick={onClickHandler}>
      <button className={styles.pagination__button} disabled={isLeftDisabled}>
        <ArrowRightIcon />
      </button>
      <ul className={styles.pagination__control}>
        {currentPage + 2 < pagesLimit ? (
          <>
            {currentPage > 1 && <li className={styles.pagination__item}>{currentPage - 1}</li>}
            <li className={styles.pagination__item_active}>{currentPage}</li>
            <li className={styles.pagination__item}>{currentPage + 1}</li>
            {currentPage === 1 && <li className={styles.pagination__item}>{currentPage + 2}</li>}
            <li>...</li>
            <li className={styles.pagination__item}>{pagesLimit}</li>
          </>
        ) : (
          <>
            {currentPage === pagesLimit - 1 && <li className={styles.pagination__item}>{currentPage - 1}</li>}
            {currentPage === pagesLimit && (
              <>
                <li className={styles.pagination__item}>{currentPage - 2}</li>
                <li className={styles.pagination__item}>{currentPage - 1}</li>
              </>
            )}
            <li className={styles.pagination__item_active}>{currentPage}</li>
            {currentPage + 1 <= pagesLimit && <li className={styles.pagination__item}>{currentPage + 1}</li>}
            {currentPage + 2 === pagesLimit && <li className={styles.pagination__item}>{currentPage + 2}</li>}
          </>
        )}
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
      <button className={styles.pagination__button} disabled={isRightDisabled}>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
