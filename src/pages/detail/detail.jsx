import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useFetch from "../../hooks/fetch";

import { Error, Loading, Nav } from "../../components";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../features/favorite/favoriteSlice";
import {
  addToWatched,
  removeWatched,
} from "../../features/wacthed/watchedSlice";

import { links } from "../../utils";
import "./detail.css";

function Detail() {
  const { id, name } = useParams();
  const url = `https://gateway.marvel.com/v1/public/comics/${id}?`;
  const { data: comic, loading, error } = useFetch(url, { method: "GET" });
  const comicInformation = comic?.data?.results;

  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.value);
  const markedAsFav = favorite.some((comic) => comic.id === id);
  const watched = useSelector((state) => state.watched.value);
  const markedAsWatched = watched.some((comic) => comic.id === id);

  function handleFavorite() {
    if (markedAsFav) {
      dispatch(removeFromFavorite(id));
    } else {
      dispatch(
        addToFavorite({
          name,
          image: `${thumbnail.path}.${thumbnail.extension}`,
          id,
        })
      );
    }
  }

  function handleWatched() {
    if (markedAsWatched) {
      dispatch(removeWatched(id));
    } else {
      dispatch(
        addToWatched({
          name,
          image: `${thumbnail.path}.${thumbnail.extension}`,
          id,
        })
      );
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const isFavorite = `${markedAsFav ? "⭐" : "Add to"} favorite`;
  const hasWatched = `${markedAsWatched ? "✅" : "Mark as"} watched`;
  
  const { description, pageCount, prices, urls, creators, thumbnail } =
    comicInformation[0];

  return (
    <>
      <Nav links={links} />
      <section className="detail">
        <h1>{name}</h1>
        <div className="options">
          <button onClick={handleFavorite}>{isFavorite}</button>
          <button onClick={handleWatched}>{hasWatched}</button>
        </div>
        <h2>General Information</h2>
        <div className="detail__information">
          <img
            className="detail--thumbnail"
            height={400}
            src={`${thumbnail.path}.${thumbnail.extension}`}
          />

          <section className="detail__description">
            <div>
              <h2>Description</h2>
              <p>{description}</p>
            </div>

            <div className="detail__creators">
              {creators &&
                creators.items.map((creator) => {
                  return (
                    <p>
                      <h4>{creator.role}:</h4>
                      <p>{creator.name}</p>
                    </p>
                  );
                })}
            </div>
          </section>

          <section className="detail__others">
            <p>
              Page count:
              <span aria-label={`Page count is ${pageCount}`}>{pageCount}</span>
            </p>
            {prices &&
              prices.map((price) => {
                if (price.type.includes("digital")) {
                  return (
                    <p>
                      Digital price:{" "}
                      <span aria-label={`Digital price is ${price.price}`}>
                        {price.price}
                      </span>
                    </p>
                  );
                }
                return (
                  <p>
                    Physical price:{" "}
                    <span aria-label={`Physical price is ${price.price}`}>
                      {price.price}
                    </span>
                  </p>
                );
              })}

            <div className="detail__urls">
              {urls &&
                urls.map((url) => {
                  return (
                    <p>
                      <a target="_blank" href={`${url.url}`}>
                        {url.type}
                      </a>
                    </p>
                  );
                })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Detail;
