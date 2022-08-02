import {
  GET_VIDEOGAMES,
  FILTER_CREATED,
  ORDER_AZ,
  GENRE_ORDER,
  GET_NAME,
  CREATE_VIDEOGAME,
  GET_GENRES,
  GET_VIDEOGAME_DETAIL,
} from "../actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  filteredVg: [],
  videogameDetails: {},
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case GET_NAME:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetails: action.payload,
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTER_CREATED:
      const allVideogames = state.allVideogames;
      if (action.payload === "Created") {
        const createdFilter = allVideogames.filter((el) => el.createdInDb);
        return {
          ...state,
          videogames: createdFilter,
          filteredVg: createdFilter,
        };
      } else if (action.payload === "Exist") {
        const createdFilter = allVideogames.filter((el) => !el.createdInDb);
        return {
          ...state,
          videogames: createdFilter,
          filteredVg: createdFilter,
        };
      } else {
        return {
          ...state,
          videogames: allVideogames,
          filteredVg: [],
        };
      }

    case GENRE_ORDER:
      const vgGenOrder = state.allVideogames;
      const filtered = state.filteredVg;
      console.log(filtered, "lel");

      if (action.payload === "bygenre") {
        if (filtered[0]) {
          return {
            ...state,
            videogames: filtered,
          };
        } else {
          return {
            ...state,
            videogames: vgGenOrder,
          };
        }
      }
      if (filtered[0]) {
        const createdFilter = filtered.filter((el) =>
          el.createdInDb
            ? el.Genres.map((e) => e.name).includes(action.payload)
            : el.genre?.includes(action.payload)
        );
        return {
          ...state,
          videogames: createdFilter,
        };
      }
      const createdFilter = vgGenOrder.filter((el) =>
        el.createdInDb
          ? el.Genres.map((e) => e.name).includes(action.payload)
          : el.genre?.includes(action.payload)
      );
      return {
        ...state,
        videogames: createdFilter,
      };

    case ORDER_AZ:
      if (action.payload === "ascen") {
        state.videogames.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "descen") {
        state.videogames.sort(function (a, b) {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "ratingasc") {
        state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (a.rating < b.rating) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "ratingdesc") {
        state.videogames.sort(function (a, b) {
          if (a.rating < b.rating) {
            return 1;
          }
          if (a.rating > b.rating) {
            return -1;
          }
          return 0;
        });
      }

    default:
      return state;
  }
}

export default rootReducer;
