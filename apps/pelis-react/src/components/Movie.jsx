import React from "react";

function Movie({ title, year, poster }) {
  return (
    <article className="movie">
      <h3>{title}</h3>
      <p>{year}</p>
      <img src={poster} alt={title} />
    </article>
  );
}

export default Movie;
