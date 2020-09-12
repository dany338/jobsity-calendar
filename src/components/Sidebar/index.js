import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton } from '@material-ui/core';
import {
  SearchOutlined,
  RotateLeft
} from '@material-ui/icons';
/* Style Components */
import { Container } from './styled';
/* Assets */
import Assets from '../../assets';
/* Components */
// import Issue from '../Issue';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Constants */

const Sidebar = () => {
  const textInputRef = useRef(null);

  const {
    reminders,
    calendarSelectedReminderDispatch
  } = useCalendar();

  const handleSelection = async (e, reminder) => {
    e.preventDefault();
    await calendarSelectedReminderDispatch(reminder);
  };

  return (
    <Container>
      <div className="sidebar__header">
        <Avatar src={Assets.googleCalendar} />
        <div className="sidebar__headerRight">
          <IconButton>
            <RotateLeft />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input ref={textInputRef} placeholder="Search issues by title min 3 letters" type="text" />
        </div>
      </div>

      <div className="sidebar__issues">
        {/* {reminders.map((reminder) => (
            <Issue key={`reminder-${reminder._id}`} {...reminder} onClick={(e) => handleSelection(e, reminder) } />
          ))
        } */}
      </div>
    </Container>
  )
};

Sidebar.propTypes = {

};

export default Sidebar;
