import React from "react";
import { Link } from "react-router-dom";

const List = ({ items, children }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <Link to={`/comic/${item.id}/${item.name}`}>
            {React.cloneElement(children, {
              key: item.id,
              title: item.name,
              imageUrl: item.image,
            })}
          </Link>
        );
      })}
    </>
  );
};

export default List;
