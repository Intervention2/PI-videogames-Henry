import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(getName(name));
  }

  return (
    <div>
      <input
        className="Barradebusqueda"
        type="search"
        placeholder="Buscar..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="Botondebusqueda"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
