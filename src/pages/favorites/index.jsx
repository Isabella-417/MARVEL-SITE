import { useSelector } from "react-redux";

import { Card, Nav } from "../../components";

import { links } from "../../utils";
import "./favorites.css";

function Favorites() {
  const favorites = useSelector((state) => {
    return state.favorite.value;
  });

  const watched = useSelector((state) => {
    return state.watched.value;
  });

  const noElements = 'There is not elements added yet';
  return (
    <>
      <Nav links={links} />
      <div className="container">
      <section className="container-list">
        <h2>Favorite List  ⭐</h2>
        {favorites.length === 0 && noElements}
        {favorites.map((favorite) => {
          return <Card key={favorite} title={favorite} />;
        })}
      </section>

      <section className="container-list">
        <h2>Watched List  👁️🍿</h2>
        {watched.length === 0 && noElements}
        {watched.map((seen) => {
          return <Card key={seen} title={seen} />;
        })}
      </section>
      </div>
    </>
  );
}

export default Favorites;
