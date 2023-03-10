import React from "react";
import styles from "./pagination.module.scss";
import { usePagination, DOTS } from "../../customHooks/usePagination";

type PropsType = {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageChange: (value: number | string) => void;
};

export const Pagination: React.FC<PropsType> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles.paginationContainer} ${className}`}>
      <li
        className={`${styles.paginationItem} ${
          currentPage === 1 && styles.disabled
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className={`${styles.paginationItem} ${styles.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${styles.paginationItem} ${
              pageNumber === currentPage && styles.selected
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.paginationItem} ${
          lastPage === currentPage && styles.disabled
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};
