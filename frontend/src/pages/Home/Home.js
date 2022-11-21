import "./Home.css";

// Components
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react";
import {  useDispatch, useSelector} from "react-redux";


// Redux
import { profile } from "../../slices/userSlice"
import {transactionsDetails} from "../../slices/transactionsSlice"
import {transaction} from "../../slices/transactionSlice"

const Home =  () => {
  const { user, loading   } = useSelector((state) => state.user) 
  const { transactions } = useSelector((state) => state.transactions)
  const { error } = useSelector((state) => state.transaction)
  const User = user[0]
  const Account =user[1]


  const dispatch = useDispatch();
  const [toAccount, setToAccount] = useState('')
  const [valueTransaction, setValueTransaction] = useState('')
  const [array, setArray] = useState([])
  const [buttonAll, setButtonAll] = useState(false)
  const balance = Account&& Account.balance
 

  const newTransaction = {
    to: toAccount ,
    value: valueTransaction,
    account: Account&& Account.id,
    balance,
  }
  const refresh = ()=>{
    dispatch(profile())
    dispatch(transactionsDetails())
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(transaction(newTransaction))
    setToAccount('')
    setValueTransaction('')
    refresh()
  }
  const handleButton = () =>{
    if(buttonAll){
      setButtonAll(false)
    }else{
    setButtonAll(true)
    }   
    setArray(transactions)
  }  


  useEffect(() => {
    refresh()
  }, [dispatch]);


  return (
    
    <div>
      {loading ? (
        <h1>Carregando...</h1>) : (
          <div id="home">
            <h2>Conta Parceira</h2>
            <h3 className="subtitle">Bem vindo {User&& User.username}.</h3>
            <h4>Conta: {User&& User.idAccount}</h4>
            <form onSubmit={handleSubmit}>
              <div className="balance">
                <input id ="balance" type="text" disabled value={`Saldo: R$ ${balance} `} />      
              </div>
              <p>Transferir</p>
              <input type="number" placeholder="Conta" value={toAccount || ''} required onChange={e => setToAccount(e.target.value)}/>
              <input type="number" placeholder="valor" value={valueTransaction || ''} required onChange={e => setValueTransaction(e.target.value)}/>        
              <input type="submit" value="Enviar"  />
              {error && <Message msg={error} type="error" />}
            </form>
            <div className="search">
              {buttonAll ? (
              <button id="btn-btn" onClick={handleButton}>Esconder</button>
              ) : (
              <button id="btn-btn" onClick={handleButton}>Todas Transações</button>
              )}
              {buttonAll && 
              array !== 0 && array.map((transaction) => {return(
              <div key={transaction.id}>
                  <p>De conta ID: {transaction.debitedAccountId} | Para conta ID: {transaction.creditedAccountId}</p> 
                  <p>R$ {transaction.value}</p>
                  <p>Em {transaction.createdAt}</p>
                  <hr />
              </div>)
              })} 
              {buttonAll&& array.length === 0 &&<h3>Não há transações!</h3>}
            </div>
            
                          
        </div>
        )}      
    </div>
  );
};

export default Home;
