import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

// Traido de la documentacion de npm react-modal examples
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')  // Nos pide usar nuestra raiz

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {

  const [dateStart, setDateStart] =  useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
  })

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }


  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const closeModal = () => {
    // TODO: Cerrar el modal
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStar = moment( start );
    const momentEnd = moment( end );

    // la funcion de moment isSameOrAfter
    // valida si la fecha inicial es igual o mayor a la fecha final
    if(momentStar.isSameOrAfter(momentEnd)){
      return Swal.fire('Error', 'La fecha final no puede ser igual o menor a la fecha inicial', 'error')
    }

    // Validamos que el titulo no este vacio y tenga como minimo 2 caracteres
    if( title.trim().length < 2 ){
      return setTitleValid(false);
    }

    // TODO: realizar la grabación 

    setTitleValid(true);
    closeModal()
  }
  return (
    <Modal
      isOpen={true}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form 
        className="container"
        onSubmit={handleSubmitForm}
        >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            minDate={dateStart}
            value={dateEnd}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ !titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </ Modal>
  )
}