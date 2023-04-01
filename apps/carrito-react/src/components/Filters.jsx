import React, { useContext } from "react";
import { FiltersContext } from "../context/filter";

function Filters() {
  const { filters, setFilters } = useContext(FiltersContext);
  return (
    <header className="filters">
      <input
        type="range"
        min="0"
        max="1500"
        name="price"
        id="price"
        value={filters.minPrice}
        onChange={(evt) => {
          setFilters({ ...filters, minPrice: evt.target.value });
        }}
      />
      <span>${filters.minPrice}</span>
      <label htmlFor="category">
        <select
          name="category"
          id="category"
          onChange={(evt) =>
            setFilters({ ...filters, category: evt.target.value })
          }
        >
          <option value="all">Todas</option>
          <option value="smartphones">Celulares</option>
          <option value="laptops">Portatiles</option>
        </select>
      </label>
      <span>{filters.category}</span>
    </header>
  );
}

export default Filters;
