import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface SmartPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const generatePageNumbers = (
  current: number,
  total: number
): (number | "...")[] => {
  const pages: (number | "...")[] = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) {
    pages.push("...");
  }

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);
  return pages;
};

const SmartPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: SmartPaginationProps) => {
  const pages = generatePageNumbers(currentPage, totalPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className='cursor-pointer'
          />
        </PaginationItem>

        {pages.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== currentPage) onPageChange(Number(page));
                }}
                className='cursor-pointer'
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPage) onPageChange(currentPage + 1);
            }}
            className='cursor-pointer'
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SmartPagination;
