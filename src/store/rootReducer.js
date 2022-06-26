import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TABLE_NAME} from "./types";
import {defaultStyles} from "../constants";

export function rootReducer(state, action) {
  let field;
  let prevState;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      return {...state, [field]: value(state, field, action)};
    case CHANGE_TEXT:
      field = "dataState";
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};

    case APPLY_STYLE:
      field = "stylesState";
      prevState = state[field] || {};
      action.data.ids.forEach(item => {
        prevState[item] = {...prevState[item], ...action.data.value};
      });
      return {
        ...state,
        stylesState: prevState,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };

    case CHANGE_TABLE_NAME: {
      field = "tableName";
      return {...state, [field]: action.data};
    }

    default:
      return state;


  }
}


function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
