import {
  CALENDAR_CHANGE_MONTH,
  CALENDAR_ADD_REMINDER,
  CALENDAR_SELECTED_REMINDER,
  CALENDAR_UPDATE_REMINDER,
  CALENDAR_DELETE_REMINDERS_BY_ID,
  CALENDAR_MODAL_CHANGE_VISIBLE
} from './types';

export const calendarChangeMonthInit = date => ({ type: CALENDAR_CHANGE_MONTH, payload: date });
export const calendarAddReminderInit = reminder => ({ type: CALENDAR_ADD_REMINDER, payload: reminder });
export const calendarSelectedReminderInit = reminder => ({ type: CALENDAR_SELECTED_REMINDER, payload: reminder });
export const calendarUpdateReminderInit = reminder => ({ type: CALENDAR_UPDATE_REMINDER, payload: reminder });
export const calendarDeleteRemindersByIdInit = reminders => ({ type: CALENDAR_DELETE_REMINDERS_BY_ID, payload: reminders });
export const calendarModalChangeVisibleInit = visible => ({ type: CALENDAR_MODAL_CHANGE_VISIBLE, payload: visible });
