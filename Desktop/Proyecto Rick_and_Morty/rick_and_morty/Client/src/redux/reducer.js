import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./actions";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  // const rootReducer = (state = initialState, action) => {
  switch (type) {
    case ADD_FAV:
      // let copy1 = state.myFavorites;
      let copy1 = state.allCharacters;
      copy1.push(payload);
      // return { ...state, myFavorites: copy1 };
      return { ...state, myFavorites: payload, allCharacters: payload };
    // return { ...state, myFavorites: copy1, allCharacters: copy1 };
    //return {...state, myFavorites: [...state.myFavorites, action.payload]};

    case REMOVE_FAV:
      let copy2 = state.myFavorites.filter((char) => {
        return char.id !== Number(payload);
      });
      return { ...state, myFavorites: payload };
    // return { ...state, myFavorites: copy2 };
    //return {...state, myFavorites: state.myFavorites.filter((char)=>char.id !== action.payload),};

    case FILTER:
      let copy3 = state.allCharacters.filter((char) => {
        return char.gender === payload;
      });
      return { ...state, myFavorites: copy3 };

    case ORDER:
      let copy4 = state.allCharacters.sort((a, b) => {
        return payload === "A" ? a.id - b.id : b.id - a.id;
      });
      return { ...state, myFavorites: copy4 };

    default:
      return { ...state };
  }
};

export default rootReducer;
