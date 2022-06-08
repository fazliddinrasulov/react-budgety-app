import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, removeItem, editItem }) => {
  return <div className='grocery-list'>{
    list.map(item => {
      const { id, title, value } = item;
      return <article key={id} className={`grocery-item ${item.profit === 'dec'? 'container-red' : 'container-green'}`} >
        <p className={`title `}>{title}</p>
        <div className={`btn-container`}>
          <span>{value}$</span>
          <button
            type='button' 
            className='edit-btn'
            onClick={()=> {
              editItem(id);
              }}>
            <FaEdit></FaEdit>
          </button>
          <button
            type='button'
            className='delete-btn'
            onClick={() => removeItem(id)}>
            <FaTrash></FaTrash>
          </button>
        </div>
      </article>
    })
  }</div>
}

export default List
