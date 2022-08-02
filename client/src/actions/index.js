import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_AZ = "ORDER_AZ";
export const GENRE_ORDER = "GENRE_ORDER";
export const GET_NAME = "GET_NAME";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";

// const baseUrl = "http://localhost:3001";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var response = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderAZ(payload) {
  return {
    type: "ORDER_AZ",
    payload,
  };
}

export function genreOrder(payload) {
  return {
    type: "GENRE_ORDER",
    payload,
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_NAME",
        payload: json.data,
      });
    } catch (error) {
      return console.log(error);
    }
  };
}

export function getVideogameDetail(id) {
  return async function (dispatch) {
    try {
      var response = await axios.get("http://localhost:3001/videogames/" + id);
      return dispatch({
        type: "GET_VIDEOGAME_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      return console.log(error);
    }
  };
}

export function createVideogame(data) {
  return async function () {
    try {
      var response = await axios.post("http://localhost:3001/videogames", data);
      alert("Videojuego creado");
      return response;
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
  };
}
