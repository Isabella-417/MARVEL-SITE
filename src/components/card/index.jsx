import "./card.css";

const Card = ({ title, imageUrl = "" }) => {
  return (
    <div className="card">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="card__image" />
      ) : null}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
