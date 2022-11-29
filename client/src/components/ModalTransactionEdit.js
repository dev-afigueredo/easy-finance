import React, { useState, useEffect } from 'react';

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
export default function ModalTransactionEdit({ onSave, onClose, selectedTransaction }) {
  /**
   * Desestruturando selectedTransaction
   */
  const { type, _id, category, description, value, yearMonthDay } = selectedTransaction;

  //Definido qual radio ficará marcado com checked
  const isRadioSelectedRevenue = type === "+" ? true : false;
  const isRadioSelectedExpense = type === "-" ? true : false;

  // Valor da transacão
  const [transactionValue, setTransactionValue] = useState(value);

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
      onClose(null);
    }
  };

  /**
   * Função para lidar com o envio
   * de dados do formulário. Devemos
   * prevenir o envio e tratar manualmente
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (transactionValue < 1) {
      setErrorMessage(
        `O valor da transação não pode ser menor ou igual a 0`
      );
      event.preventDefault();
      return;
    }
    onSave(_id, transactionValue);
  };

  /**
   * Lidando com o fechamento da modal
   */
  const handleModalClose = () => {
    onClose(null);
  };

  /**
   * Lidando com a mudança da transacão
   * no input
   */
  const handleTransactionChange = (event) => {
    setTransactionValue(+event.target.value);
  };

  /**
   * JSX
   */
  return (
    <div>
      <Modal isOpen={true} >
        <div style={styles.flexRow}>
          <span style={styles.title}>Editar Lançamento</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input className="with-gap" id="radioTypeExpense" value="-" type="radio" checked={isRadioSelectedExpense} disabled />
            <span>Despesa</span>
            <input className="with-gap" id="radioTypeRevenue" value="+" type="radio" checked={isRadioSelectedRevenue} disabled />
            <span>Receita</span>
          </div>
          <div className="input-field">
            <input id="inputDescription" type="text" value={description} readOnly />
            <label className="active" htmlFor="inputDescription">
              Descricão:
            </label>
          </div>
          <div className="input-field">
            <input id="inputCategory" type="text" value={category} readOnly />
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
                value={transactionValue}
                onChange={handleTransactionChange}
              />
              <label className="active" htmlFor="inputTransaction">
                Valor:
            </label>
            </div>
            <div className="input-field col s4">
              <input id="inputDate" type="date" value={yearMonthDay} readOnly />
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
