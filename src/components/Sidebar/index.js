import React, { useRef, useEffect, useCallback, useState } from 'react';
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
  const [filtered, setFiltered] = useState([]);
  const {
    reminders,
    calendarSelectedReminderDispatch,
    calendarModalChangeVisibleDispatch
  } = useCalendar();
  const textInputRef = useRef(null);

  const handleChange = async e => {
    e.preventDefault();
    const { value: query } = e.target;
    const newFiltered = reminders.filter((reminder) => reminder.title.toLowerCase().includes(query.toLowerCase()));
    setFiltered(newFiltered);
  };

  const handleSelection = async (e, reminder) => {
    e.preventDefault();
    await calendarSelectedReminderDispatch(reminder);
    await calendarModalChangeVisibleDispatch(true);
  };

  const handleAddReminder = async e => {
    e.preventDefault();
    await calendarModalChangeVisibleDispatch(true);
  };

  const load = useCallback(async () => {
    setFiltered(reminders);
  }, [reminders]);

  useEffect(() => {
    console.log('reminders', reminders);
    load();
  }, [load, reminders]);

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
          <input ref={textInputRef} placeholder="Search remiders by title" type="text" onChange={e => handleChange(e)}/>
        </div>
      </div>

      <div className="sidebar__issues">
        {filtered.length > 0 && filtered.sort((a, b) => {
          if(b.date > a.date) return 1;
          if(b.date < a.date) return -1;
          if(b.time > a.time) return 1;
          if(b.time < a.time) return -1;
        }).map((reminder) => (
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
