function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search cocktails..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
