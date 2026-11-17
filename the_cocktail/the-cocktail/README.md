# The Cocktail

A client-side Single-Page Application built with **React** for the *Web Systems and Technologies* final project. The Cocktail lets you search cocktail recipes, filter and sort them by category, browse them page by page, open a full recipe with ingredients and instructions, and save your favorites so they are still there after you reload the page.

## External API

- **TheCocktailDB** (free public REST API): https://www.thecocktaildb.com/api.php
  - Search by name, filter by category, list categories and look up a drink by id.
  - The free public test key `1` is used by default, so no signup is needed.

## Features

- Search / keyword filter with a short debounce
- Category filtering and A-Z / Z-A sorting
- Pagination (12 cocktails per page)
- Favorites saved in `localStorage` (they persist across page reloads)
- Loading skeletons and a spinner while data is fetched
- Error messages with a retry button, plus empty-result messages
- Client-side routing with React Router:
  - `/` Home (search, filter, sort, pagination)
  - `/cocktail/:id` Cocktail details
  - `/favorites` Saved cocktails

## Tech Stack

React 18, React Router 6, Vite, plain CSS, `fetch` with `async/await`.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd the-cocktail
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your environment file (see below).
4. Start the development server:
   ```bash
   npm run dev
   ```
   Then open the local address that Vite prints (usually http://localhost:5173).

Other scripts: `npm run build` creates a production build and `npm run preview` serves it locally.

## Environment Variables

Copy the example file and keep the default key:

```bash
cp .env.example .env
```

```env
VITE_COCKTAILDB_API_KEY=1
```

`1` is TheCocktailDB's free test key. If you ever get your own key, put it here. The `.env` file is ignored by Git.

## Project Structure

```
src/
  api/          cocktailApi.js (all API calls)
  components/   Header, SearchBar, FilterBar, CardGrid, CocktailCard, Pagination, Loader, ErrorMessage
  context/      FavoritesContext.jsx (favorites + localStorage)
  hooks/        useDebounce.js
  pages/        Home, CocktailDetails, Favorites, NotFound
```

## Team Contributions

| Member | Contributions |
|---|---|
| Member 1 (name) | e.g. project setup, API module, Home page (search, filter, sort, pagination) |
| Member 2 (name) | e.g. Details page, Favorites (localStorage), styling, README |

Replace the names and tasks above with what each of you actually did.
