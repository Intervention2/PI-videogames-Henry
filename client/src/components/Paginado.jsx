import React from "react";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div>
        {pageNumbers?.map((number) => (
          <button className="botoncitos" onClick={() => paginado(number)}>
            {number}
          </button>
        ))}
      </div>
    </nav>
  );
}
