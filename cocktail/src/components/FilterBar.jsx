export const ALL_CATEGORIES = 'All categories';

export default function FilterBar({ categories, category, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="filterbar">
      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="input"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value={ALL_CATEGORIES}>{ALL_CATEGORIES}</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          className="input"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="az">Name (A to Z)</option>
          <option value="za">Name (Z to A)</option>
        </select>
      </div>
    </div>
  );
}
