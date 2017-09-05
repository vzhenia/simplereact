import React from 'react';
import ItemForm from './itemForm';

export const Item = (props) => {

  return (
    <li className={props.classN}>
      <input type='checkbox' checked={props.isActive} onChange={() => props.handleToggle(props.item)}/>

      {
        props.itemEditId === props.item.id ?
        <ItemForm
          changeCurrent={props.updateCurrentItem}
          caller='editItem'/> :
        <div style={{width: 250}}>{props.item.name}</div>
      }

      {
        props.itemEditId !== props.item.id ?
        (<div>
          <div><a href='#' onClick={() => props.handleEdit(props.item.id)} className='editItem'>Edit</a></div>
          <div className='deleteButton'>
            <a href='#' onClick={() => props.handleRequestDelete(props.item.id)} className='deleteItem'>x</a>
          </div>
        </div>
        ) :
        <div onClick={props.handleSave}><a href='#' className='editItem'>Save</a></div>
      }
    </li>
  )
}
