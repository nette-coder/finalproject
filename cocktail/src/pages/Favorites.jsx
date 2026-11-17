import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import CardGrid from '../components/CardGrid.jsx';

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div>
      <div className="page-head">
        <h1>My Favorites</h1>
        {favorites.length > 0 && (
          <button type="button" className="btn btn--ghost" onClick={clearFavorites}>
            Clear all
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty">
          <p>You have not saved any cocktails yet.</p>
          <Link to="/" className="btn btn--active">Browse Cocktails</Link>
        </div>
      ) : (
        <CardGrid drinks={favorites} />
      )}
    </div>
  );
}
