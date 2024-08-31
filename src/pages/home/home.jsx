import { Link } from "react-router-dom";
import useFetch from "../../hooks/fetch";
import { Nav, Loading } from "../../components";

import {links} from "../../utils";
import logo from "../../assets/cover.jpg";
import "./home.css";

function Home() {
  const url = `https://gateway.marvel.com/v1/public/comics`;
  const { data: comics, loading, error } = useFetch(url, { method: "GET" });

  if (loading) return <Loading/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Nav links={links} />
      <section className="comic-list">
        <img className="main-logo" src={logo} aria-label=""/>
        {comics?.data?.results &&
          comics.data.results.map((comic) => {
            const img = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <div className="comic" key={comic.id}>
                <img
                  className="thumbnail"
                  src={img}
                  aria-label={`Comic ${comic.title} Thumbnail`}
                />
                <div className="comic--containerinfo">
                  <Link to={`/comic/${comic.id}/${comic.title}`}>
                    <p>{comic.title}</p>
                  </Link>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
}

export default Home;
