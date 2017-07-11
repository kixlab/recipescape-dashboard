import { INCREMENT, DECREMENT } from '../constants/actionTypes'

function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT:
    return state + 1
  case DECREMENT:
    return state - 1
  default:
    return state
  }
}

export default counter;
