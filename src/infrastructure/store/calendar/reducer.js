import {
  CALENDAR_CHANGE_MONTH,
  CALENDAR_ADD_REMINDER,
  CALENDAR_SELECTED_REMINDER,
  CALENDAR_UPDATE_REMINDER,
  CALENDAR_DELETE_REMINDERS_BY_ID,
  CALENDAR_MODAL_CHANGE_VISIBLE,
  CALENDAR_RESET_ALL
} from './types';

const now = new Date();

const initialState = {
  reminders: [],
  currentDate: now,
  reminderSelected: null,
  error: null,
  visible: false,
};

const calendar = (state = initialState, { type, payload }) => {
  switch (type) {
    case CALENDAR_CHANGE_MONTH: {
      return {
        ...state,
        error: null,
        currentDate: payload,
      };
    }

    case CALENDAR_ADD_REMINDER: {
      return {
        ...state,
        error: null,
        reminderSelected: null,
        reminders: [ ...state.reminders, payload]
      };
    }

    case CALENDAR_SELECTED_REMINDER: {
      return {
        ...state,
        error: null,
        reminderSelected: payload,
        // currentDate: payload ? payload.date : new Date()
      };
    }

    case CALENDAR_UPDATE_REMINDER: {
      return {
        ...state,
        error: null,
        reminders: state.reminders.map((reminder) => reminder._id === payload._id ? payload : reminder)
      };
    }

    case CALENDAR_DELETE_REMINDERS_BY_ID: {
      const isReminder = id => payload.some((reminder) => reminder === id)

      return {
        ...state,
        error: null,
        reminders: state.reminders.filter(({ _id }) => !isReminder(_id))
      };
    }

    case CALENDAR_MODAL_CHANGE_VISIBLE: {
      return {
        ...state,
        error: null,
        visible: payload
      }
    }

    case CALENDAR_RESET_ALL: {
      return {
        ...state,
        error: null,
        visible: false,
        reminders: [],
        currentDate: new Date(),
        reminderSelected: null,
      }
    }

    default: {
      return state;
    }
  }
};

export { calendar as default, initialState };
