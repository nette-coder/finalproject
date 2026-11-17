import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar, { ALL_CATEGORIES } from '../components/FilterBar.jsx';
import CardGrid from '../components/CardGrid.jsx';
import Pagination from '../components/Pagination.jsx';
import { SkeletonGrid } from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import useDebounce from '../hooks/useDebounce.js';
import { fetchCategories, filterByCategory, searchCocktails } from '../api/cocktailApi.js';

const PAGE_SIZE = 12;
// Used when no search text and "All categories" are selected.
const DEFAULT_TERM = 'a';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Cocktail');
  const [sort, setSort] = useState('az');
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const debouncedQuery = useDebounce(query.trim(), 400);

  // Load the category list once for the dropdown.
  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        setCategories(await fetchCategories(controller.signal));
      } catch {
        // The dropdown simply stays empty; the main list shows its own error.
      }
    }
    loadCategories();
    return () => controller.abort();
  }, []);

  // Fetch drinks whenever the search text or category changes.
  useEffect(() => {
    const controller = new AbortController();
    async function loadDrinks() {
      setLoading(true);
      setError('');
      try {
        let result;
        if (debouncedQuery) {
          result = await searchCocktails(debouncedQuery, controller.signal);
          if (category !== ALL_CATEGORIES) {
            result = result.filter((drink) => drink.strCategory === category);
          }
        } else if (category !== ALL_CATEGORIES) {
          result = await filterByCategory(category, controller.signal);
        } else {
          result = await searchCocktails(DEFAULT_TERM, controller.signal);
        }
        setDrinks(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load cocktails.');
          setDrinks([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadDrinks();
    return () => controller.abort();
  }, [debouncedQuery, category, reloadKey]);

  const sorted = useMemo(() => {
    const copy = [...drinks];
    copy.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
    return sort === 'za' ? copy.reverse() : copy;
  }, [drinks, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleQuery = (value) => {
    setQuery(value);
    setPage(1);
  };
  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };
  const handlePage = (value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <section className="hero">
        <h1>Find your next favorite drink</h1>
        <p>Search hundreds of cocktail recipes, filter by category and save the ones you love.</p>
      </section>

      <SearchBar value={query} onChange={handleQuery} />
      <FilterBar
        categories={categories}
        category={category}
        onCategoryChange={handleCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {loading && <SkeletonGrid count={PAGE_SIZE} />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={() => setReloadKey((key) => key + 1)} />
      )}

      {!loading && !error && sorted.length === 0 && (
        <div className="empty">
          <p>No cocktails found{debouncedQuery ? ` for "${debouncedQuery}"` : ''}.</p>
          <p>Try a different name or category.</p>
        </div>
      )}

      {!loading && !error && sorted.length > 0 && (
        <>
          <p className="result-count">
            Showing {visible.length} of {sorted.length} cocktails
          </p>
          <CardGrid drinks={visible} />
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePage} />
        </>
      )}
    </div>
  );
}
