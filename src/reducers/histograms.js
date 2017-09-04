import { TOGGLE_CLUSTER, INIT_ACTIVE_CLUSTERS, SELECT_ALL, UNSELECT_ALL, SAVE_CLUSTER_DECK,LOAD_CLUSTER_DECK,CHANGE_CLUSTER_RULE,INGREDIENT_INSTRUCTION_COMBO, DELETE_HIGHLIGHT, SET_HIGHLIGHT} from '../constants/actionTypes'
import {HistogramBaseState} from './BaseState'
import axios from 'axios'

const BASE_URL = "https://recipe.hyeungshikjung.com/recipe/"

const histograms = (state = HistogramBaseState, action) => {
    
    switch(action.type){
        case INGREDIENT_INSTRUCTION_COMBO:
        if(!action.source) {
            if(state.IngredientCombos.find( d=> d.action == action.ingredient_action.action && d.ingredient == action.ingredient_action.ingredient)){
                return Object.assign({}, state, {IngredientCombos: state.IngredientCombos.filter(e => e.ingredient != action.ingredient_action.ingredient)});

            } else return Object.assign({}, state, {IngredientCombos: [ action.ingredient_action, ...state.IngredientCombos.filter(e => e.ingredient != action.ingredient_action.ingredient)]});
        } else if(state.InstructionCombos.find( d=> d.action == action.ingredient_action.action && d.ingredient == action.ingredient_action.ingredient)){
            return Object.assign({}, state, {InstructionCombos: state.InstructionCombos.filter(e => e.action != action.ingredient_action.action)});
        } else return Object.assign({}, state, {InstructionCombos: [ action.ingredient_action ,...state.InstructionCombos.filter(e => e.action != action.ingredient_action.action)]});
    default: return state;
    }
}

export default histograms;