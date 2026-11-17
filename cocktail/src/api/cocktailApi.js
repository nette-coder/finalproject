// All requests go to TheCocktailDB. "1" is the free public test key.
const API_KEY = import.meta.env.VITE_COCKTAILDB_API_KEY || '1';
const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}`;

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}/${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

// The API returns { drinks: null } (or a string) when nothing matches.
const toList = (data) => (Array.isArray(data?.drinks) ? data.drinks : []);

export async function fetchCategories(signal) {
  const data = await request('list.php?c=list', signal);
  return toList(data)
    .map((item) => item.strCategory)
    .sort((a, b) => a.localeCompare(b));
}

export async function searchCocktails(term, signal) {
  const data = await request(`search.php?s=${encodeURIComponent(term)}`, signal);
  return toList(data);
}

export async function filterByCategory(category, signal) {
  const data = await request(`filter.php?c=${encodeURIComponent(category)}`, signal);
  return toList(data);
}

export async function lookupCocktail(id, signal) {
  const data = await request(`lookup.php?i=${encodeURIComponent(id)}`, signal);
  return toList(data)[0] || null;
}

export async function fetchRandomCocktail(signal) {
  const data = await request('random.php', signal);
  return toList(data)[0] || null;
}

// Combine strIngredient1..15 with strMeasure1..15 into one array.
export function getIngredients(drink) {
  const list = [];
  for (let i = 1; i <= 15; i += 1) {
    const name = drink[`strIngredient${i}`];
    if (name && name.trim()) {
      const measure = drink[`strMeasure${i}`];
      list.push({ name: name.trim(), measure: measure ? measure.trim() : '' });
    }
  }
  return list;
}
