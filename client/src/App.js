import React, { useState, useEffect } from 'react';
import { formatNumber } from './helpers/formatterHelper';
import { dataCorrent } from './helpers/dateHelper';
import M from "materialize-css";
import TransactionService from './services/TransactionService';
import Header from './components/Header';
import SelectDates from './components/SelectDates';
import Totalizers from './components/Totalizers';
import ButtonDown from './components/ButtonDown';
import ButtonUp from './components/ButtonUp';
import ButtonAdd from './components/ButtonAdd';
import Filters from './components/Filters';
import Transactions from './components/Transactions';
import Actions from './components/Actions';
import ModalTransaction from './components/ModalTransactionEdit';
import ModalTransactionAdd from './components/ModalTransactionAdd';
import Spinner from './components/Spinner';


export default function App() {
  const [dataMonth, setDataMonth] = useState(dataCorrent());
  const [dataList, setDataList] = useState([]);
  const [dataSelectedId, setDataSelectedId] = useState();
  const [dataSelectedName, setDataSelectedName] = useState('');
  const [statusButtonUp, setStatusButtonUp] = useState('');
  const [statusButtonDown, setStatusButtonDown] = useState('');
  const [totalLanc, setTotalLanc] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [filter, setFilter] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [havingRemoveOrEditId, setHavingRemoveOrEditId] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  useEffect(() => {
    /** Ativando o JavaScript do Materialize  **/
    M.AutoInit();
    const retrieveDates = async () => {
      const dates = await TransactionService.getAllDates();
      setDataList(dates.data);
      dates.data.map((item, index) => {
        if (item._id === dataMonth) {
          setDataSelectedId(index);
          setDataSelectedName(item._id);
        }
        return true;
      });
    };

    retrieveDates();
  }, [dataMonth]);

  useEffect(() => {
    let monthSelect = '';
    dataList.filter((item, index) => {
      if (index === parseInt(dataSelectedId)) {
        monthSelect = item._id;
        setDataMonth(item._id);
      }
      return monthSelect;
    });
    const totals = async () => {
      let arrayAssit = [];
      let revenue = 0;
      let expenses = 0;

      const getTransactions = await TransactionService.getListTransactions(
        monthSelect === '' ? dataMonth : monthSelect, filter
      );
      setTimeout(() => {
        arrayAssit = getTransactions.data;
        setTotalLanc(arrayAssit.length);
        arrayAssit.forEach((item) => {
          if (item.type === '+') {
            revenue += parseFloat(item.value)
          } else {
            expenses += parseFloat(item.value);
          }
        });
        setRevenue(revenue);
        setExpenses(expenses);
        setBalance(revenue - expenses);
        /** Criando lista de transações */
        setTransactions(
          arrayAssit.map(({ _id, day, category, description, value, type }) => {
            return {
              _id, day, category, description, value, type
            }
          })
        )
      }, 100);
    }

    totals();
  }, [dataSelectedId, dataList, dataMonth, filter, havingRemoveOrEditId, isModalOpen, isModalOpenAdd])

  const handleChangeSelect = (newValue) => {
    const newDataId = newValue;
    setDataSelectedId(newDataId);
  }

  const handleChanceButtonDown = () => {
    if (dataSelectedId === 0) {
      setStatusButtonDown('disabled');
    } else {
      setDataSelectedId(dataSelectedId - 1);
      setStatusButtonDown('');
    }
  }

  const handleChanceButtonUp = () => {
    if (dataSelectedId === 35) {
      setStatusButtonUp('disabled');
    } else {
      setDataSelectedId(parseInt(dataSelectedId) + 1);
      setStatusButtonUp('');
    }
  }

  const handleChangeFilter = (filterInserted) => {
    setFilter(filterInserted);
  }

  const handleDelete = (id) => {
    TransactionService.remove(id)
      .then((response) => {
        setHavingRemoveOrEditId(id);
        console.log("Excluído com sucesso");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleModalEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  }

  const handleModalAdd = () => {
    setIsModalOpenAdd(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  }

  const handleCloseAdd = () => {
    setIsModalOpenAdd(false);
  }

  const handleEdit = async (id, value) => {
    await TransactionService.edit(id, value);
    console.log("Editado com sucesso!");
    setIsModalOpen(false);
  }

  const handleAdd = async (newTransaction) => {
    await TransactionService.create(newTransaction);
    setIsModalOpenAdd(false);
  }

  return (
    <div className="container">
      <Header
        description="Bootcamp Full Stack - Desafio Final"
        subtitle="Controle Financeiro Pessoal"
      />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
      }} >
        <div className="row">
          <ButtonDown onClickButtonDown={handleChanceButtonDown} statusButtonDown={statusButtonDown} />
          <SelectDates onChangeSelect={handleChangeSelect} dataList={dataList} dataSelectedName={dataSelectedName} dataSelectedId={dataSelectedId} />
          <ButtonUp onClickButtomUp={handleChanceButtonUp} statusButtonUp={statusButtonUp} />
        </div>
      </div>

      <Totalizers
        totalLanc={totalLanc}
        revenue={revenue}
        expenses={expenses}
        balance={balance}
      />

      <div className="row">
        <ButtonAdd onAdd={handleModalAdd} />
        <Filters onChanceFilter={handleChangeFilter} />
      </div>
      {transactions.length === 0 && <Spinner />}

      <Transactions>
        <div className="row">
          {transactions.map(({ type, _id, day, category, description, value }) => {
            let color = type === "-" ? "#ffab91" : "#81c784";
            return (
              <div className="row" key={_id} style={{
                backgroundColor: `${color}`,
                borderRadius: "5px",
                margin: "2px",
                padding: "5px"
              }}>
                <div style={{ fontWeight: "bold", marginTop: "25px" }} className="input-field col s1">
                  <span>{day}</span>
                </div>
                <div className="input-field col s6">
                  <span style={{ fontWeight: "bold" }}>{category}</span>
                  <br />
                  <span>{description}</span>
                </div>
                <div style={{ marginTop: "25px" }} className="input-field col s2">
                  <span>{formatNumber(value)}</span>
                </div>
                <Actions
                  onEdit={handleModalEdit}
                  onDelete={handleDelete}
                  idTransaction={_id}
                  selectedTransaction={selectedTransaction}
                />
              </div>
            )
          })}
        </div >
      </Transactions>

      {isModalOpen && (
        <ModalTransaction
          onSave={handleEdit}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}

      {isModalOpenAdd && (
        <ModalTransactionAdd
          onSaveAdd={handleAdd}
          onCloseAdd={handleCloseAdd}
        />
      )}
    </div >
  )
}
