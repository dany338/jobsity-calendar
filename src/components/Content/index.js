import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
  InsertEmoticon,
  Send,
  RotateLeft,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';
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
  const { calendarChangeMonthDispatch, currentDate, reminderSelected } = useCalendar();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const handleChangeMonth = async (e, direction) => {
    let newYear = year;
    let newMonth = month;
    let newDayMonth = 1;
    if (month === 0 && direction === '<') {
      newMonth = 11;
      newYear = year - 1;
    } else if (month === 11 && direction === '>') {
      newMonth = 0;
      newYear = year + 1;
    } else {
      newMonth = (direction === '>') ? month + 1 : month - 1;
    }
    const newDate = new Date(newYear, newMonth, newDayMonth);
    await calendarChangeMonthDispatch(newDate);
  };

  const handleAddReminder = async e => {
    e.preventDefault();

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
          <IconButton>
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
          <input placeholder="Type a your new reminder or clicked in specific date of calendar" type="text" />
          <button type="submit">Send a comment</button>
        </form>
        <IconButton onClick={(e) => handleAddReminder(e)}>
          <Send />
        </IconButton>
      </div>
    </Container>
  )
};

export default Content;
