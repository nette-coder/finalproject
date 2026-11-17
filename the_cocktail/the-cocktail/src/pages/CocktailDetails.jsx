import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getIngredients, lookupCocktail } from '../api/cocktailApi.js';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { Spinner } from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function CocktailDetails() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadDrink() {
      setLoading(true);
      setError('');
      try {
        const result = await lookupCocktail(id, controller.signal);
        if (!result) {
          setError('We could not find that cocktail.');
          setDrink(null);
        } else {
          setDrink(result);
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to load cocktail.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadDrink();
    return () => controller.abort();
  }, [id, reloadKey]);

  if (loading) return <Spinner label="Mixing your drink..." />;

  if (error) {
    return (
      <div>
        <Link to="/" className="back">&larr; Back to all cocktails</Link>
        <ErrorMessage message={error} onRetry={() => setReloadKey((key) => key + 1)} />
      </div>
    );
  }

  const ingredients = getIngredients(drink);
  const saved = isFavorite(drink.idDrink);

  return (
    <div>
      <Link to="/" className="back">&larr; Back to all cocktails</Link>

      <article className="details">
        <img className="details__img" src={drink.strDrinkThumb} alt={drink.strDrink} />

        <div className="details__body">
          <h1>{drink.strDrink}</h1>

          <ul className="tags">
            {drink.strCategory && <li>{drink.strCategory}</li>}
            {drink.strAlcoholic && <li>{drink.strAlcoholic}</li>}
            {drink.strGlass && <li>{drink.strGlass}</li>}
          </ul>

          <button
            type="button"
            className={`btn ${saved ? 'btn--active' : ''}`}
            onClick={() => toggleFavorite(drink)}
            aria-pressed={saved}
          >
            {saved ? '♥ Saved to favorites' : '♡ Add to favorites'}
          </button>

          <h2>Ingredients</h2>
          <ul className="ingredients">
            {ingredients.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span className="muted">{item.measure}</span>
              </li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <p className="instructions">{drink.strInstructions}</p>
        </div>
      </article>
    </div>
  );
}
