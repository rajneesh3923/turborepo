import ReactPaginate from "react-paginate";
import "./pagination.css";

interface PaginationParam {
  itemsPerPage: number;
  pageCount: number;
  currPage?: number;
  onPageClick: (page: number) => void;
}

export default function Pagination({
  itemsPerPage,
  pageCount,
  currPage,
  onPageClick,
}: PaginationParam) {
  const handlePageClick = (event: { selected: number }) => {
    console.log("PAGE", event.selected);
    onPageClick(event.selected);
  };

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      renderOnZeroPageCount={null}
      previousLabel="Previous"
      nextLabel="Next"
      initialPage={currPage ? currPage - 1 : 0}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageCount={pageCount / itemsPerPage}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}
