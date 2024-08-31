import "./card.css";

const Card = ({ title, imageUrl = "" }) => {
    return (
      <div className="card">
        {imageUrl? <img src={imageUrl} alt={title} className="card-image" />: null}
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    );
  };

export default Card;
