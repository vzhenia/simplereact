const initState = {
  items: [
      {
        "id": 1,
        "name": "text1",
        "isActive": true
      },
      {
        "id": 2,
        "name": "text2",
        "isActive": true
      },
      {
        "id": 3,
        "name": "text3",
        "isActive": false
      },
      {
        "id": 4,
        "name": "text4",
        "isActive": false
      },
      {
        "name": "sdfs",
        "isActive": false,
        "id": 5
      }
    ],
  currentItem: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {...state, currentItem: '', items: [...state.items, action.payload]}
    case 'LOAD_ITEMS':
      return {...state, items: action.payload}
    case 'UPDATE_ITEM':
      return {...state, currentItem: action.payload}
    case 'UPDATE_ITEM_PROPS':
      const itemToUpdateProps = state.items.filter(i => i.id === action.payload.id)[0];
      const itemIndexProps = state.items.indexOf(itemToUpdateProps);
      const itemUpdatedProps = Object.assign({}, action.payload);
      let items = [...state.items.slice(0, itemIndexProps), itemUpdatedProps, ...state.items.slice(itemIndexProps + 1)]
      return {...state, items}
    case 'DELETE_ITEM':
      return {...state, items: state.items.filter(i => i.id !== action.payload)}
    case 'TOGGLE_STATUS':
      const itemToUpdate = state.items.filter(i => i.id === action.payload)[0];
      const itemIndex = state.items.indexOf(itemToUpdate);
      const itemUpdated = {...itemToUpdate, isActive: !itemToUpdate.isActive};
      items = [...state.items.slice(0, itemIndex), itemUpdated, ...state.items.slice(itemIndex + 1)]
      return {...state, items}
    case 'CREATE_ITEM':
      const newItem = {
        id: state.items.length + 1,
        name: action.payload,
        isActive: false,
      }
      items = [...state.items, newItem];
      return {...state, items}
    default:
      return state
  }
}
