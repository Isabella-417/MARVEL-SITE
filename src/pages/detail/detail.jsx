import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useFetch from "../../hooks/fetch";

import { Carousel, Loading, Nav } from "../../components";
import { addToFavorite, removeFromFavorite } from "../../features/favorite/favoriteSlice";
import { addToWatched, removeWatched } from "../../features/wacthed/watchedSlice";

import { links } from "../../utils";
import "./detail.css";

function Detail() {
  const { id, name } = useParams();
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters`;
  const { data: comic, loading, error } = useFetch(url, { method: "GET" });
  const comicInformation = comic?.data?.results;
  const dispatch = useDispatch();


  const favorite = useSelector(state => { console.log('state favorites => ', state); return state.favorite.value})
  const markedAsFav = favorite.some(comic => comic === name)

  const watched = useSelector(state => { console.log('state watched => ', state); return state.watched.value})
  const markedAsWatched = watched.some(comic => comic === name)


  function handleFavorite() {
    if(markedAsFav){
      dispatch(removeFromFavorite(name))
    }else{
      dispatch(addToFavorite(name))
    }
  }

  function handleWatched() {
    if(markedAsWatched){
      dispatch(removeWatched(name))
    }else{
      dispatch(addToWatched(name))
    }
  }


  if (loading) return <Loading/>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = comicInformation.map((character) => {
    return {
      name: character.name,
      image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      id: character.id,
    };
  });

  const label = `${markedAsFav? "⭐": "Add to"} favorite`; 
  const hasWatched = `${markedAsWatched? "✅" : "Mark as"} watched`

  return (
    <>
      <Nav links={links} />
      <section className="detail">
        <h1>{ name }</h1>         
        <button onClick={handleFavorite}>{label}</button>
        <button onClick={handleWatched}>{hasWatched}</button>
        <h2>Characters</h2>
        <Carousel images={characters}/>
      </section>
    </>
  );
}

export default Detail;
