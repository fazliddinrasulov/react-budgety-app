import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { queryByDisplayValue } from '@testing-library/react';


// const getLocalStorage = () => {
//   let list = localStorage.getItem('list');
//   if (list) {
//     return JSON.parse(localStorage.getItem('list'));
//   } else {
//     return []
//   }
// }
// const getLocalStorageSummary = () => {
//   let summary = localStorage.getItem('summary');
//   if (summary) {
//     return JSON.parse(localStorage.getItem('summary'));
//   } else {
//     return 0
//   }
// }
const App = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [summary, setSummary] = useState(0);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [profit, setProfit] = useState('inc');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !value) {
      showAlert(true, 'please enter description and value', 'danger');
    }
    if (name && isEditing) {
      setList(list.map(item => {
        if (item.id === editId) {
          return { ...item, title: name, value: value }
        }
        return item
      }))
      showAlert(true, 'value changed', 'success');
      setName('');
      setValue('');
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, 'item added to the list', 'success')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        value: value,
        profit: profit
      }
      setList([...list, newItem]);
      setName('');
      setValue('');
    }

  }
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type })
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
    setValue(specificItem.value);
  }
  const removeItem = (id) => {
    const newItem = list.find(item => item.id === id);
    showAlert(true, 'item removed', 'danger');
    setList(list.filter((item) => item.id !== id));
  }
  
  useEffect(()=>{
    let sum = 0;
    list.forEach(item =>{
      if(item.profit === 'inc'){
        sum = sum + parseInt(item.value);
      }else{
        sum = sum - parseInt(item.value);
      }
    })
    setSummary(sum);
  },[list])
  const change = (event) => {
    setProfit(event.target.value)
  }
  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list))
  // }, [list])
  // useEffect(() => {
  //   localStorage.setItem('summary', JSON.stringify(summary))
  // }, [summary])
  return <section className='section-center'>
    <article className='show-budget'>
      <h3>available budget in month: <span>{summary}$</span> </h3>
    </article>
    <form className='grocery-form'>
      {alert.show && <Alert {...alert} removeAlert={showAlert}></Alert>}
      <h3>budgety app</h3>
      <div className="form-control">
        <select className='grocery select' onChange={change}>
          <option value="inc">+</option>
          <option value="dec">-</option>
        </select>
        <input
          type="text"
          id='grocery'
          className='grocery'
          placeholder='Add description'
          value={name}
          onChange={(event) => setName(event.target.value)} />
        <input
          type="number"
          className='grocery grocery-number'
          placeholder='value'
          value={value}
          onChange={(event) => setValue(event.target.value)} />
        <button
          type='submit'
          onClick={handleSubmit}
          className='submit-btn'>
          {isEditing ? "edit" : "submit"}
        </button>
      </div>
    </form>
    {list.length > 0 && <div className="grocery-container">
      <List list={list} removeItem={removeItem} editItem={editItem}></List>
      <button type='button' className='clear-btn' onClick={() => {
        showAlert(true, 'items cleared', 'danger');
        setName('');
        setValue('');
        setList([]);
        setSummary(0);
      }}>clear items</button>
    </div>}
  </section>
}

export default App
