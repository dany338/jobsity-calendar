import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { Avatar, IconButton } from '@material-ui/core';
import {
  InsertEmoticon,
  Send,
  RotateLeft,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';
import Swal from 'sweetalert2';
/* Style Components */
import { Container } from './styled';
/* Assets */
import Assets from '../../assets';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Components */
import Calendar from '../Calendar';
/* Constants */
import { monthsYear } from '../../infrastructure/config/const';

const Content = () => {
  const [_, setCookie, removeCookie] = useCookies(['titleReminder']);
  const titleReminderInput = useRef(null);
  const {
    calendarChangeMonthDispatch,
    calendarModalChangeVisibleDispatch,
    calendarResetAllInitDispatch,
    currentDate,
    reminderSelected
  } = useCalendar();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const handleChangeMonth = async (e, direction) => {
    const today = new Date();
    let newYear = year;
    let newMonth = month;
    if (month === 0 && direction === '<') {
      newMonth = 11;
      newYear = year - 1;
    } else if (month === 11 && direction === '>') {
      newMonth = 0;
      newYear = year + 1;
    } else {
      newMonth = (direction === '>') ? month + 1 : month - 1;
    }
    let newDayMonth = newYear === today.getFullYear() && newMonth === today.getMonth() ? today.getDate() : 1;
    const newDate = new Date(newYear, newMonth, newDayMonth);
    await calendarChangeMonthDispatch(newDate);
  };

  const handleAddReminder = async e => {
    e.preventDefault();
    if(titleReminderInput.current.value !== '') {
      setCookie('titleReminder', titleReminderInput.current.value);
      await calendarModalChangeVisibleDispatch(true);
    } else {
      Swal.fire({
        title: 'Fill the field title reminder!',
        icon: 'info',
        text: `Something field there is empty!. `,
        confirmButtonText: 'OK'
      })
    }
  };

  const handleChangeTitle = e => {
    if(titleReminderInput.current.value === '') {
      removeCookie('titleReminder');
    }
  };

  const handleResetCalendar = async e => {
    e.preventDefault();
    await calendarResetAllInitDispatch();
  };

  return (
    <Container>
      <div className="content__header">
        <Avatar src={Assets.googleCalendar} />
        <div className="content__headerInfo">
          <div className="content__center">
            <IconButton onClick={(e) => handleChangeMonth(e, '<')}>
              <KeyboardArrowLeft />
            </IconButton>
            <h3>{`  ${monthsYear[month]} of ${year}  `}{reminderSelected && `Date selected: ${reminderSelected.date.toDateString()}`}</h3>
            <IconButton onClick={(e) => handleChangeMonth(e, '>')}>
              <KeyboardArrowRight />
            </IconButton>
          </div>
        </div>

        <div className="chat__headerRight">
          <IconButton onClick={(e) => handleResetCalendar(e)}>
            <RotateLeft />
          </IconButton>
        </div>
      </div>

      <div className="content__body">
        <Calendar />
      </div>

      <div className="content__footer">
        <InsertEmoticon />
        <form>
          <input ref={titleReminderInput} placeholder="Type a your new reminder or clicked in specific date of calendar and clicked in the send icon button" type="text" onChange={(e) => handleChangeTitle(e)} />
        </form>
        <IconButton onClick={(e) => handleAddReminder(e)}>
          <Send />
        </IconButton>
      </div>
    </Container>
  )
};

export default Content;
