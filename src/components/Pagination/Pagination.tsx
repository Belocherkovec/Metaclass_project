import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import cn from 'classnames';
import styles from './pagination.module.scss';
import { useState } from 'react';

export type PaginationProps = {
  className?: string;
  currentPage: number;
  count: number;
  onChange: (value: number) => void;
};

function makePaginationArr(currentPage: number, count: number) {
  const result = [];
  if (count < 6) {
    for (let i = 1; i <= count; i++) {
      result.push({ page: i, style: cn(styles.pagination__item, i === currentPage && styles.pagination__item_active) });
    }
  } else {
    result.push({ page: currentPage, style: cn(styles.pagination__item, styles.pagination__item_active) });
    if (count - currentPage < 3) {
      for (let i = currentPage; i < count; i++) {
        result.push({ page: i + 1, style: cn(styles.pagination__item) });
      }
      for (let i = 1; result.length < 5; i++) {
        result.unshift({ page: currentPage - i, style: cn(styles.pagination__item) });
      }
    } else {
      result.push({ page: currentPage + 1, style: cn(styles.pagination__item) });
      if (currentPage > 1) {
        result.unshift({ page: currentPage - 1, style: cn(styles.pagination__item) });
      } else {
        result.push({ page: currentPage + 2, style: cn(styles.pagination__item) });
      }
      result.push({ page: '...', style: cn(styles.pagination__item, styles.pagination__item_inactive) });
      result.push({ page: count, style: cn(styles.pagination__item) });
    }
  }
  return result;
}

const Pagination: React.FC<PaginationProps> = ({ className, currentPage, count, onChange }) => {
  const [isLeftBtnDisabled, isRightBtnDisabled] = [currentPage === 1, currentPage === count];

  function onClickHandler(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    let newState;
    if (target.classList.contains(styles.pagination__button)) {
      target.classList.contains(styles.pagination__button_right)
        ? (newState = currentPage + 1)
        : (newState = currentPage - 1);
    } else if (target.classList.contains(styles.pagination__item) && target.textContent) {
      newState = +target.textContent;
    }

    if (newState) {
      onChange(newState);
    }
  }

  return (
    <div className={cn(styles.pagination, className)} onClick={onClickHandler}>
      <button className={styles.pagination__button} disabled={isLeftBtnDisabled}>
        <ArrowRightIcon />
      </button>
      {makePaginationArr(currentPage, count).map((e) => (
        <div className={e.style} key={e.page + e.style}>
          {e.page}
        </div>
      ))}
      <button className={cn(styles.pagination__button, styles.pagination__button_right)} disabled={isRightBtnDisabled}>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
