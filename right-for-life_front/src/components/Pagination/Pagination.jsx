import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export function Pagination({
  classNames,
  currentPageNum,
  totalPagesQuantity,
  pageChangeHandler,
}) {
  const paginationContainerClasses = cn(
    'flex flex-wrap justify-center select-none',
    classNames,
  );

  const pageButtonClasses =
    'flex w-10 h-10 sm:w-12 sm:h-12 mx-1 rounded-full justify-center items-center font-bold shadow-md text-gray-600 bg-white';

  function handlePaginationElementClick(event, nextPage) {
    event.preventDefault();
    pageChangeHandler(nextPage);
  }

  function getPaginationPageButtons() {
    const buttons = [];
    let startPosition = 1;
    let endPosition = totalPagesQuantity;

    if (currentPageNum - 2 > 2) {
      buttons.push(
        <PaginationButton
          key={1}
          classNames={pageButtonClasses}
          pageNum={1}
          isActive={false}
          paginationElementClickHandler={handlePaginationElementClick}
        />,
      );
      buttons.push(<PaginationDots key={2} />);
      startPosition = currentPageNum - 2;
    }

    if (currentPageNum + 2 < totalPagesQuantity - 1) {
      endPosition = currentPageNum + 2;
    }

    for (let i = startPosition; i <= endPosition; i += 1) {
      buttons.push(
        <PaginationButton
          key={i}
          classNames={pageButtonClasses}
          pageNum={i}
          isActive={currentPageNum === i}
          paginationElementClickHandler={handlePaginationElementClick}
        />,
      );
    }

    if (currentPageNum + 2 < totalPagesQuantity - 1) {
      buttons.push(<PaginationDots key={totalPagesQuantity - 1} />);
      buttons.push(
        <PaginationButton
          key={totalPagesQuantity}
          classNames={pageButtonClasses}
          pageNum={totalPagesQuantity}
          isActive={false}
          paginationElementClickHandler={handlePaginationElementClick}
        />,
      );
    }

    return buttons;
  }

  return (
    <>
      {totalPagesQuantity >= 2 && (
        <div className={paginationContainerClasses}>
          {currentPageNum !== 1 && (
            <PaginationStepButton
              classNames={pageButtonClasses}
              buttonType="backward"
              currentPageNum={currentPageNum}
              paginationElementClickHandler={handlePaginationElementClick}
            />
          )}
          {getPaginationPageButtons()}
          {currentPageNum !== totalPagesQuantity && (
            <PaginationStepButton
              classNames={pageButtonClasses}
              buttonType="forward"
              currentPageNum={currentPageNum}
              paginationElementClickHandler={handlePaginationElementClick}
            />
          )}
        </div>
      )}
    </>
  );
}

function PaginationButton({
  classNames,
  pageNum,
  isActive,
  paginationElementClickHandler,
}) {
  const { pathname } = useLocation();

  return (
    <Link
      to={`${pathname}?page=${pageNum}`}
      className={cn(classNames, {
        'font-bold text-blue-700 bg-blue-200 cursor-default': isActive,
      })}
      onClick={
        isActive
          ? event => {
              event.preventDefault();
            }
          : event => paginationElementClickHandler(event, pageNum)
      }
    >
      {pageNum}
    </Link>
  );
}

function PaginationStepButton({
  classNames,
  currentPageNum,
  buttonType,
  paginationElementClickHandler,
}) {
  const { pathname } = useLocation();

  return (
    <Link
      to={`${pathname}?page=${
        buttonType === 'forward' ? currentPageNum + 1 : currentPageNum - 1
      }`}
      className={classNames}
      onClick={event =>
        paginationElementClickHandler(
          event,
          buttonType === 'forward' ? currentPageNum + 1 : currentPageNum - 1,
        )
      }
    >
      {buttonType === 'forward' ? '>' : '<'}
    </Link>
  );
}

function PaginationDots() {
  return (
    <div className="flex items-center mx-1 sm:mx-3 cursor-default">. . .</div>
  );
}
