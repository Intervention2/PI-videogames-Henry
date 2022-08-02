import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterCreated, orderAZ, genreOrder } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

const generos = [
  "Action",
  "Indie",
  "Adventure",
  "RPG",
  "Casual",
  "Strategy",
  "Puzzle",
  "Shooter",
  "Simulation",
  "Arcade",
  "Platformer",
  "Racing",
  "Massively Multiplayer",
  "Sports",
  "Fighting",
  "Family",
  "Board Games",
  "Educational",
  "Card",
];

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderAZ(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortGenre(e) {
    e.preventDefault();
    dispatch(genreOrder(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="body">
      <h1 className="title">Henryteca de videojuegos</h1>
      <div>
        <div>
          <Link className="form-navigator" to={"/videogames"}>
            <button className="crearbutton">Crear videojuego</button>
          </Link>
        </div>
        <div className="filterBar">
          <select
            className="filterselect"
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option value="All">Todos</option>
            <option value="Exist">Existente</option>
            <option value="Created">Creados</option>
          </select>

          <select
            className="filterselect"
            onChange={(e) => {
              handleSortGenre(e);
            }}
          >
            <option value="bygenre">Todos los Generos</option>
            {generos.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>

          <select
            className="filterselect"
            defaultValue={"ratingdesc"}
            onChange={(e) => {
              handleSort(e);
            }}
          >
            <option value="ascen">Ascendente</option>
            <option value="descen">Descendente</option>
            <option value="ratingasc">Menos rating</option>
            <option value="ratingdesc">Mas rating</option>
          </select>
        </div>

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <div className="Lapagina">
          <div className="currentPages">Página: {currentPage}</div>
        </div>

        <div class="flex-container" className="Cartas">
          {currentVideogames?.map((el) => {
            return (
              <Link className="carta" to={"/home/" + el.id}>
                <Card
                  image={el.img}
                  name={el.name}
                  genre={
                    el.createdInDb
                      ? el.Genres.map((e) => e.name + " ")
                      : el.genre + " "
                  }
                  key={el.id}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
