import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton } from '@material-ui/core';
import {
  SearchOutlined,
  Add
} from '@material-ui/icons';
/* Style Components */
import { Container } from './styled';
/* Assets */
import Assets from '../../assets';
/* Components */
import Reminder from '../Reminder';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Constants */

const Sidebar = () => {
  const textInputRef = useRef(null);

  const {
    reminders,
    calendarSelectedReminderDispatch,
    calendarModalChangeVisibleDispatch
  } = useCalendar();

  const handleSelection = async (e, reminder) => {
    e.preventDefault();
    await calendarSelectedReminderDispatch(reminder);
  };

  const handleAddReminder = async e => {
    e.preventDefault();
    await calendarModalChangeVisibleDispatch(true);
  };

  return (
    <Container>
      <div className="sidebar__header">
        <Avatar src={Assets.googleCalendar} />
        <div className="sidebar__headerRight">
          <IconButton onClick={(e) => handleAddReminder(e)}>
            <Add />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input ref={textInputRef} placeholder="Search remiders by title" type="text" />
        </div>
      </div>

      <div className="sidebar__issues">
        {reminders.map((reminder) => (
            <Reminder key={`reminder-${reminder._id}`} {...reminder} onClick={(e) => handleSelection(e, reminder) } />
          ))
        }
      </div>
    </Container>
  )
};

Sidebar.propTypes = {

};

export default Sidebar;
