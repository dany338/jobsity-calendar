import { useGlobalStore } from '../../store';
import bindActions from '../../store/bindActions';
import calendarReducer from '../../store/calendar';

const { dispatchers } = calendarReducer;

const useCalendar = () => {
  const { state, dispatch } = useGlobalStore();

  // List of Props
  const { calendar } = state;

  // List of Dispatchers
	const {
    calendarChangeMonthDispatch,
    calendarAddReminderDispatch,
    calendarSelectedReminderDispatch,
    calendarUpdateReminderDispatch,
    calendarDeleteRemindersByIdIDispatch,
    calendarModalChangeVisibleDispatch,
    calendarResetAllInitDispatch
  } = dispatchers;

  // Bind Actions
	const calendarActions = bindActions({
    calendarChangeMonthDispatch,
    calendarAddReminderDispatch,
    calendarSelectedReminderDispatch,
    calendarUpdateReminderDispatch,
    calendarDeleteRemindersByIdIDispatch,
    calendarModalChangeVisibleDispatch,
    calendarResetAllInitDispatch
  }, dispatch);

  return { ...calendar, ...calendarActions };
};

export default useCalendar;
