import { useSelector } from "react-redux";

import { Card, List, Nav } from "../../components";

import { links } from "../../utils";

import "./favorites.css";

function Favorites() {
  const favorites = useSelector((state) => {
    return state.favorite.value;
  });

  const watched = useSelector((state) => {
    return state.watched.value;
  });

  const noElements = "There is not elements added yet";
  return (
    <>
      <Nav links={links} />
      <div className="container">
        <h2>Favorite List ⭐</h2>
        <section className="container__list">
          {favorites.length === 0 && noElements}
          <List items={favorites}>
            <Card />
          </List>
        </section>
        <h2>Watched List 👁️🍿</h2>
        <section className="container__list">
          {watched.length === 0 && noElements}
          <List items={watched}>
            <Card />
          </List>
        </section>
      </div>
    </>
  );
}

export default Favorites;
