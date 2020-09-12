import React from 'react';
import PropTypes from 'prop-types';
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

const Content = props => {
  const { calendarChangeMonthDispatch, currentDate } = useCalendar();
  const month = currentDate.getMonth();

  return (
    <Container>
      <div className="content__header">
        <Avatar src={Assets.googleCalendar} />
        <div className="content__headerInfo">
          <div className="content__center">
            <IconButton>
              <KeyboardArrowLeft />
            </IconButton>
            <h3>{monthsYear[month]}</h3>
            <IconButton>
              <KeyboardArrowRight />
            </IconButton>
          </div>
          <div className="content__center">
            <p>Selected...</p>
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
          <input placeholder="Type a comment" type="text" />
          <button type="submit">Send a comment</button>
        </form>
        <Send />
      </div>
    </Container>
  )
};

Content.propTypes = {

};

export default Content;
