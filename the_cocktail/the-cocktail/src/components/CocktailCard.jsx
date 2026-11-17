import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function CocktailCard({ drink }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(drink.idDrink);

  return (
    <article className="card">
      <Link to={`/cocktail/${drink.idDrink}`} className="card__link">
        <img
          className="card__img"
          src={`${drink.strDrinkThumb}/preview`}
          alt={drink.strDrink}
          loading="lazy"
        />
        <div className="card__body">
          <h3 className="card__title">{drink.strDrink}</h3>
          {drink.strCategory && <p className="card__meta">{drink.strCategory}</p>}
        </div>
      </Link>
      <button
        type="button"
        className={`fav ${saved ? 'fav--on' : ''}`}
        onClick={() => toggleFavorite(drink)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${drink.strDrink} from favorites` : `Add ${drink.strDrink} to favorites`}
        title={saved ? 'Remove from favorites' : 'Add to favorites'}
      >
        {saved ? '♥' : '♡'}
      </button>
    </article>
  );
}
