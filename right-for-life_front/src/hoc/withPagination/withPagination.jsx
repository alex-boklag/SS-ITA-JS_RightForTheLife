import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useQuery } from '../../helpers/useQuery';
import { Pagination } from '../../components/Pagination';
import { ErrorIndicator } from '../../components/ErrorIndicator';

export const withPagination = (
  WrappedComponent,
  articlesPerPage = 10,
) => props => {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const requestedPageNum = extractAndCheckRequestedPage(props.data.totalPages);
  if (!requestedPageNum || props.data.status === 400) {
    query.delete('page');
    return (
      <ErrorIndicator
        message="Нет такой страницы"
        renderAction={() => (
          <Link to={`${location.pathname}?${query.toString()}`}>Вернуться к первой странице</Link>
        )}
      />
    );
  }

  function handlePaginationPageChange(nextPage) {
    window.scrollTo(0, 0);
    query.set('page', nextPage);
    query.set('limit', articlesPerPage);
    history.push(`${location.pathname}?${query.toString()}`);
  }

  return (
    <>
      <WrappedComponent {...props} data={props.data.docs} />
      <Pagination
        classNames="mb-14"
        currentPageNum={requestedPageNum}
        totalPagesQuantity={props.data.totalPages}
        pageChangeHandler={handlePaginationPageChange}
      />
    </>
  );

  function extractAndCheckRequestedPage(totalPages) {
    const requestedPage = query.get('page');

    if (!requestedPage) {
      return 1;
    }
    const requestedPageNum = Number(requestedPage);
    if (isNaN(requestedPageNum)) {
      return false;
    }
    if (requestedPageNum < 1 || requestedPageNum > totalPages) {
      return false;
    }
    return requestedPageNum;
  }
};
