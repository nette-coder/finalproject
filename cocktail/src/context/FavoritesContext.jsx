import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'the-cocktail:favorites';
const FavoritesContext = createContext(null);

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  // Persist across page reloads (localStorage feature).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage may be full or blocked; the app still works without it.
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.idDrink === id),
    [favorites]
  );

  const toggleFavorite = useCallback((drink) => {
    setFavorites((current) => {
      if (current.some((item) => item.idDrink === drink.idDrink)) {
        return current.filter((item) => item.idDrink !== drink.idDrink);
      }
      const { idDrink, strDrink, strDrinkThumb } = drink;
      return [...current, { idDrink, strDrink, strDrinkThumb }];
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
}
