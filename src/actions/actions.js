import {getItems, createItem, updateItem, deleteItem, updateItemPropsServer} from '../lib/services';

export const updateCurrentItem = (val) => ({type: 'UPDATE_ITEM', payload: val})


export const toggleItemStatus = (id) => ({type: 'TOGGLE_STATUS', payload: id})
export const updateItemStatus = (item) => {
  return (dispatch) => {
    dispatch(toggleItemStatus(item.id));
    updateItem(item)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

export const updateItemProps = (item) => ({type: 'UPDATE_ITEM_PROPS', payload: item})
export const saveUpdatedItem = (item) => {
  return (dispatch) => {
    dispatch(updateItemProps(item));
    dispatch(updateCurrentItem(null));
    updateItemPropsServer(item)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

export const loadItems = (items) => ({type: 'LOAD_ITEMS', payload: items})
export const fetchItems = () => {
  return (dispatch) => {
    getItems()
      .then(items => dispatch(loadItems(items)))
      .catch(err => console.log(err))
  }
}

//thru POST
export const addItemToState = (item) => ({type: 'ADD_ITEM', payload: item})
//at network error, just mock
export const createItemInState = (name) => ({type: 'CREATE_ITEM', payload: name})
export const saveItem = (name) => {
  return (dispatch) => {
    createItem(name)
    .then(res => dispatch(addItemToState(res)))
    .catch(err => {
      dispatch(createItemInState(name))
      console.log(err)
    });
    dispatch(updateCurrentItem(null));
  }
}

export const removeItemFromState = (id) => ({type: 'DELETE_ITEM', payload: id})
export const removeItem = (id) => {
  return (dispatch) => {
    dispatch(removeItemFromState(id));
    deleteItem(id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
}
