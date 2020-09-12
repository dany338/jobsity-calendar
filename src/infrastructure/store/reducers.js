/* eslint-disable import/no-cycle */
import calendarReducer from "./calendar";

import { logger } from "./middlewares";

export const initialState = {
  calendar: calendarReducer.initialState
};

export default function mainReducer(state, action) {
  // Receiving previous state here
  const {
    calendar
  } = state;

  // Receiving current state here
  const currentState = {
    calendar: calendarReducer.reducer(calendar, action),
  };

  // Middlewares
  logger(action, state, currentState);

  return currentState;
}
