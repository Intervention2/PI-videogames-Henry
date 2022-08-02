import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres } from "../actions";
import { Link } from "react-router-dom";

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

function validate(state) {
  let errors = {};
  if (!state.name) {
    errors.name = "Se requiere nombre";
  } else if (!state.description) {
    errors.description = "Se requiere una descripcion";
  }
  return errors;
}

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    img: "",
    platforms: [],
    genre: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function change(e) {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function plataformas(e) {
    if (e.target.value !== "nada") {
      if (!state.platforms.includes(e.target.value)) {
        setState({
          ...state,
          platforms: [...state.platforms, e.target.value],
        });
      }
    }
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function imagenes(e) {
    setState({
      ...state,
      img: e.target.value,
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(el) {
    setState({
      ...state,
      platforms: state.platforms.filter((e) => e !== el),
    });
    console.log(state);
  }

  function submit(e) {
    e.preventDefault();

    const newArr = Array.from(
      document.querySelectorAll("input[type=checkbox]:checked")
    );
    const genress = newArr.map((el) => el.name);
    const newobj = { ...state, genre: genress };

    if (!newobj.img) {
      newobj.img =
        "https://www.techies.es/wp-content/uploads/2021/10/waluigi.png";
    }

    if (state.platforms[0]) {
      dispatch(createVideogame(newobj));
    }

    setState({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genre: [],
    });
  }

  return (
    <div className="Elformulario">
      <div className="iniciobtn">
        <Link to="/home">
          <button className="homebutton">Volver al inicio</button>
        </Link>
      </div>

      <h1>Formulario para la creación de un videojuego: </h1>
      <form className="form" onSubmit={(e) => submit(e)}>
        <div className="cajagrande">
          <div className="cajaform">
            <div className="form-content">
              <label htmlFor="label">Nombre: </label>
              <input
                className="Barradebusqueda"
                onChange={(e) => change(e)}
                value={state.name}
                type="text"
                name="name"
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <label htmlFor=""> Descripción: </label>
              <input
                className="Barradebusqueda"
                onChange={(e) => change(e)}
                value={state.description}
                type="text"
                name="description"
              />
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}

              <label htmlFor=""> Fecha de salida: </label>
              <input
                className="Barradebusqueda"
                onChange={(e) => change(e)}
                value={state.released}
                type="text"
                name="released"
              />

              <label>Imagen: </label>
              <input
                className="Barradebusqueda"
                onChange={(e) => imagenes(e)}
                value={state.img}
                type="text"
                name="image"
              />
              <label htmlFor=""> Puntuación: </label>
              <input
                className="Barradebusqueda"
                max="5"
                min="0"
                onChange={(e) => change(e)}
                value={state.rating}
                type="number"
                name="rating"
              ></input>

              <div className="platformpad">
                <select
                  className="platformselect"
                  onChange={(e) => plataformas(e)}
                >
                  <option value="nada">Seleccione una o más plataformas</option>
                  <option value="Henry station 4">Henry Station 4</option>
                  <option value="Pc">PC</option>
                  <option value="Hbox 360">Hbox 360</option>
                  <option value="Super nintendo H">Super nintendo H</option>
                  <option value="Henry Switch">Henry Switch</option>
                </select>
              </div>
            </div>

            <div className="platformboxx">
              {state.platforms.map((el) => (
                <div className="platformbox">
                  <p className="platformboxcont">{el}</p>
                  <button className="botonX" onClick={() => handleDelete(el)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="generosform">
            <label>Selecciona uno o más géneros: </label>
            {generos.map((el) => {
              return (
                <label>
                  <input type="checkbox" name={el} value={el} />
                  {el}
                </label>
              );
            })}
          </div>
        </div>

        <button className="crearbutton2" type="submit">
          Crear nuevo juego
        </button>
      </form>
    </div>
  );
}
