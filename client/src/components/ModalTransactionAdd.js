import React, { useState, useEffect } from 'react';
import { dataCorrentComplete } from '../helpers/dateHelper';

/**
 * Utilização de 'react-modal'
 */
import Modal from 'react-modal';

/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement('#root');

/**
 * Componente ModalTransaction
 */
export default function ModalTransactionAdd({ onSaveAdd, onCloseAdd }) {

  // Valor da transacão
  const [type, setType] = useState('+');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dataCorrentComplete());

  // Mensagem de erro
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * Evento para monitorar a tecla Esc, através de keydown
   */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);


    // Eliminando evento
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  /**
   * Cercando a tecla "Esc"
   * e fechando a modal caso
   * seja digitada
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onCloseAdd(null);
    }
  };

  /**
   * Função para lidar com o envio
   * de dados do formulário. Devemos
   * prevenir o envio e tratar manualmente
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (value < 1 || !value) {
      setErrorMessage(
        `O valor da transação não pode ser menor ou igual a 0`
      );
      event.preventDefault();
      return;
    }

    const formData = {
      description,
      value,
      category,
      year: `${date.substring(0, 4)}`,
      month: `${date.substring(5, 7)}`,
      day: `${date.substring(9, 10)}`,
      yearMonth: `${date.substring(0, 7)}`,
      yearMonthDay: date,
      type
    };

    onSaveAdd(formData);
  };

  /**
   * Lidando com o fechamento da modal
   */
  const handleModalClose = () => {
    onCloseAdd(null);
  };

  /**
   * Lidando com a mudança da transacão
   * no input
   */
  const handleTypeModify = (event) => {
    const newType = event.target.value;
    console.log(event);
    setType(newType);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value.toString();
    setDescription(newDescription);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value.toString();
    setCategory(newCategory);
  };

  const handleValueChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  /**
   * JSX
   */
  return (
    <div>
      <Modal isOpen={true} >
        <div style={styles.flexRow}>
          <span style={styles.title}>Novo Lançamento</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input className="with-gap" id="radioTypeExpense" name="radioType" value='-' type="radio" onChange={handleTypeModify} />

            <span>Despesa</span>
            <input className="with-gap" id="radioTypeRevenue" name="radioType" value='+' type="radio" checked onChange={handleTypeModify} />
            <span>Receita</span>
          </div>
          <div className="input-field">
            <input id="inputDescription" type="text" value={description} onChange={handleDescriptionChange} />
            <label className="active" htmlFor="inputDescription">
              Descricão:
  </label>
          </div>
          <div className="input-field">
            <input id="inputCategory" type="text" value={category} onChange={handleCategoryChange} />
            <label className="active" htmlFor="inputCategory">
              Categoria:
  </label>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="inputTransaction"
                type="number"
                min="0"
                step="1"
                autoFocus
                value={value}
                onChange={handleValueChange}
              />
              <label className="active" htmlFor="inputTransaction">
                Valor:
  </label>
            </div>
            <div className="input-field col s4">
              <input id="inputDate" type="date" value={date} onChange={handleDateChange} />
              <label className="active" htmlFor="inputDate">
                Data:
  </label>
            </div>
          </div>
          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
            >
              Salvar
  </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  }
};
