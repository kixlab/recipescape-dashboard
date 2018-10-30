import { combineReducers } from "redux";
import recipeDeck from "./recipeDeck";
import clusters from "./clusters";
import histograms from "./histograms";

const recipeApp = combineReducers({
  recipeDeck,
  clusters,
  histograms
});

export default recipeApp;
