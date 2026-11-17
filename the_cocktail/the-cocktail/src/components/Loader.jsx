// Skeleton cards shown while waiting for the network.
export function SkeletonGrid({ count = 8 }) {
  return (
    <section className="grid" aria-busy="true" aria-label="Loading cocktails">
      {Array.from({ length: count }, (_, index) => (
        <div className="card card--skeleton" key={index}>
          <div className="skeleton skeleton--img" />
          <div className="card__body">
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--short" />
          </div>
        </div>
      ))}
    </section>
  );
}

// Simple spinner for single-item pages.
export function Spinner({ label = 'Loading...' }) {
  return (
    <div className="spinner-wrap" role="status">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
