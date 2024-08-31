import loading from "../../assets/loading.gif";

import "./loading.css"

const Loading = ({}) => {
  return (
    <div className="container">
      <img className="loading" src={loading} alt="loading GIF" />
    </div>
  );
};

export default Loading;
