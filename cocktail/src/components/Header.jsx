import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          <span className="brand__icon" aria-hidden="true">🍸</span>
          <span className="brand__name">The Cocktail</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <NavLink to="/" end className="nav__link">
            Home
          </NavLink>
          <NavLink to="/favorites" className="nav__link">
            Favorites
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
