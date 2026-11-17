import CocktailCard from './CocktailCard.jsx';

export default function CardGrid({ drinks }) {
  return (
    <section className="grid" aria-live="polite">
      {drinks.map((drink) => (
        <CocktailCard key={drink.idDrink} drink={drink} />
      ))}
    </section>
  );
}
