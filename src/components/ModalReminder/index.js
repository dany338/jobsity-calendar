import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Swal from 'sweetalert2';
import { HexColorPicker } from 'react-colorful';
import { nanoid } from 'nanoid';
// include styles
import 'rodal/lib/rodal.css';
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Constants */
import { defaultColors } from '../../infrastructure/config/const';
import * as WeatherServices from "../../infrastructure/services";

const modalRoot = document.getElementById('modal-root');
const customStyles = {
  overflowY: 'auto',
};

const ModalReminder = ({ visible, onClose }) => {
  const [weather, setWeather] = useState(null);
  const [color, setColor] = useState('#4285F4');
  const titleInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const weatherInputRef = useRef(null);

  const { calendarAddReminderDispatch, reminderSelected } = useCalendar();
  // const [ existing, setExisting ] = useState(defaultExisting);
  // const [ action, setAction ] = useState(defaultAction);

  const handleAction = async e => {
    e.preventDefault();
    const reminder = {
      _id: reminderSelected ? reminderSelected._id : nanoid(),
      date: reminderSelected ? reminderSelected.date : new Date(),
      title: titleInputRef.current.value,
      time: timeInputRef.current.value,
      city: cityInputRef.current.value,
      weather: weatherInputRef.current.value,
      color
    };
    const {msg, err} = await calendarAddReminderDispatch(reminder);
    if(err) {
      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        text: `Something went wrong! ${msg}`,
        confirmButtonText: 'OK'
      })
    } else {
      onClose();
    }
    // e.stopPropagation();
  };

  const handleChangeCity = async e => {
    e.preventDefault();
    const { name, value: query } = e.currentTarget;
    console.log(name, query);
    const weather = await WeatherServices.apiWeather.getWeather(query);
    console.log(weather); // weatherInputRef.current.value setWeather(weather);
  };

  return ReactDOM.createPortal(
    <Rodal
      visible={visible}
      onClose={onClose}
      animation="zoom"
      customStyles={customStyles}
      className="modal-rodal-container"
      closeOnEsc
    >
      <Container>
        <div className="modal__title">
          <h4>Reminder for date: </h4>
        </div>
        <div className="modal__content">
          <div className="modal__row">
            <input ref={titleInputRef} type="text" name="title" value={reminderSelected.title} placeholder="Enter your title" style={{ width: '100%'}} />
            {reminderSelected && reminderSelected.title === '' && (
              <p style={{color: 'red'}}>
                Title is required!
              </p>
            )}
          </div>
          <div className="modal__row">
            <input ref={timeInputRef} type="time" name="time" value={reminderSelected.time} placeholder="Enter your time" style={{ width: '100%'}} />
            {reminderSelected && reminderSelected.time === '' && (
              <p style={{color: 'red'}}>
                Time is required!
              </p>
            )}
          </div>
          <div className="modal__row">
            <input ref={cityInputRef} type="text" name="city" value={reminderSelected.city} onChange={(e) => handleChangeCity(e)} placeholder="Enter your city min three letters" style={{ width: '100%'}} />
            {reminderSelected && reminderSelected.mobile === '' && (
              <p style={{color: 'red'}}>
                City is required!
              </p>
            )}
          </div>
          <div className="modal__row">
            <input ref={weatherInputRef} type="text" name="weather" value={reminderSelected.weather} placeholder="Enter your weather" style={{ width: '100%'}} readOnly />
            {reminderSelected && reminderSelected.weather === '' && (
              <p style={{color: 'red'}}>
                Weather is required!
              </p>
            )}
          </div>
          <div className="modal__row">
            <HexColorPicker color={color} onChange={setColor} />
            <div className="value" style={{ borderLeftColor: color }}>
              Current color of reminder is {color}
            </div>
            <div className="buttons">
              {defaultColors.map((color) => (
                <button onClick={() => setColor(color.color)} style={{ backgroundColor: color.color, color: '#000' }}>{color.label}</button>
              ))}
            </div>
          </div>

          <div className="modal__action" onClick={(e) => handleAction(e)}>
            <h4>SAVE</h4>
          </div>
        </div>
      </Container>
    </Rodal>,
    modalRoot
  )
}

ModalReminder.propTypes = {

}

export default ModalReminder;
