export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert" role="alert">
      <p className="alert__title">Something went wrong</p>
      <p>{message || 'We could not load the data. Please check your connection.'}</p>
      {onRetry && (
        <button type="button" className="btn btn--active" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
