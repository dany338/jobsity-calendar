import {
  calendarChangeMonthInit,
  calendarAddReminderInit,
  calendarSelectedReminderInit,
  calendarUpdateReminderInit,
  calendarDeleteRemindersByIdInit,
  calendarModalChangeVisibleInit,
  calendarResetAllInit
} from './actions';

export const calendarChangeMonthDispatch = date => {
  return async dispatch => {
    try {
      dispatch(calendarChangeMonthInit(date));
      return { msg: `month changed`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarAddReminderDispatch = reminder => {
  return async dispatch => {
    try {
      dispatch(calendarAddReminderInit(reminder));
      return { msg: `reminder Added`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarSelectedReminderDispatch = reminder => {
  return async dispatch => {
    try {
      dispatch(calendarSelectedReminderInit(reminder));
      return { msg: `month changed`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarUpdateReminderDispatch = reminder => {
  return async dispatch => {
    try {
      dispatch(calendarUpdateReminderInit(reminder));
      return { msg: `reminder updated`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarDeleteRemindersByIdIDispatch = reminders => {
  return async dispatch => {
    try {
      dispatch(calendarDeleteRemindersByIdInit(reminders));
      return { msg: `month changed`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarModalChangeVisibleDispatch = visible => {
  return async dispatch => {
    try {
      dispatch(calendarModalChangeVisibleInit(visible));
      return { msg: `modal visible changed`, err: false };
    } catch (error) {
      console.error(error);
      return { msg: 'An error was generated please consult the administrator!' };
    }
  };
};

export const calendarResetAllInitDispatch = () => {
  return async dispatch => {
    try {
      dispatch(calendarResetAllInit());
    } catch (error) {
      console.error(error);
    }
  };
};
