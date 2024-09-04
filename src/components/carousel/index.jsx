import "./Carousel.css";

const Carousel = ({ images, handleClick }) => {
  if (!images.length) {
    return <p>There is not characters to display 😔</p>;
  }
  return (
    <div className="carousel">
      <div className="carousel__inner">
        {images.map(({ name, id, image }) => (
          <div className="carousel__item" key={id}>
            <img
              width={250}
              height={200}
              className="carousel__img"
              src={image}
              alt={`${name} ${id}`}
              onClick={handleClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
