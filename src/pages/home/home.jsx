import { Link } from "react-router-dom";

import useFetch from "../../hooks/fetch";
import { Error, Loading, Nav  } from "../../components";

import { links } from "../../utils";
import logo from "../../assets/cover.png";
import "./home.css";

function Home() {
  const url = `https://gateway.marvel.com/v1/public/comics?orderBy=title&limit=100&`;
  const { data: comics, loading, error } = useFetch(url, { method: "GET" });

  if (loading) return <Loading/>;
  if (error) return <Error message={error.message}/>;

  return (
    <>
      <Nav links={links} />
      <section className="comic-list">
        <img className="main-logo" src={logo} aria-label=""/>
        {comics?.data?.results &&
          comics.data.results.map((comic) => {
            const img = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <Link to={`/comic/${comic.id}/${comic.title}`} key={comic.id}>
              <div className="comic">
                <img
                  className="thumbnail"
                  src={img}
                  aria-label={`Comic ${comic.title} Thumbnail`}
                />
                <div className="comic--containerinfo">
                    <p>{comic.title}</p>
                </div>
              </div>
              </Link>
            );
          })}
      </section>
    </>
  );
}

export default Home;
