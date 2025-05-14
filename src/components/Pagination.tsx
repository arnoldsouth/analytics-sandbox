import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Show up to 5 page numbers, with ellipsis if needed
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-8"
      aria-label="Pagination"
    >
      <button
        className="kokonut-btn px-3 py-1 rounded-lg border bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 shadow-sm disabled:opacity-50 transition"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lt;
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`kokonut-btn px-3 py-1 rounded-lg border shadow-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-400 ${
            page === currentPage
              ? "bg-zinc-500 text-white border-zinc-500 hover:bg-zinc-600"
              : "bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-700 border-zinc-300"
          }`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="kokonut-btn px-3 py-1 rounded-lg border bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 shadow-sm disabled:opacity-50 transition"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
