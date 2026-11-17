export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Show a small window of page numbers around the current page.
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = [];
  for (let n = start; n <= end; n += 1) pages.push(n);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={`btn ${n === page ? 'btn--active' : ''}`}
          onClick={() => onPageChange(n)}
          aria-current={n === page ? 'page' : undefined}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        className="btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
