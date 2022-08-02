import React from "react";

export default function Card({ name, image, genre }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{genre}</h5>
      <img src={image} alt="img not found" width="400px" height="240px" />
    </div>
  );
}
