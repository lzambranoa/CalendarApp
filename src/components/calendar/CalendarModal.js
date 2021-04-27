import React, { useState } from 'react';
import Modal from 'react-modal';

// Traido de la documentacion de npm react-modal examples
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root')  // Nos pide usar nuestra raiz

export const CalendarModal = () => {
    
    const [ isOpen, setIsOpen ] = useState(true);

    const closeModal = () =>{ 
        setIsOpen(false);
    }
    return(
        <Modal
          isOpen={isOpen}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          className='modal'
          overlayClassName='modal-fondo'
        >
        <h1>Hola Mundo</h1>
        <hr/>
        <h2>Hola de nuevo...</h2>
        </ Modal>
    )
}