import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import CocktailDetails from './pages/CocktailDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import NotFound from './pages/NotFound.jsx';
export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktail/:id" element={<CocktailDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          The Cocktail &middot; Data from{' '}
          <a href="https://www.thecocktaildb.com" target="_blank" rel="noreferrer">
            TheCocktailDB
          </a>
        </p>
      </footer>
    </div>
  );
}
