const baseUrl = 'http://localhost:8080/items';

export const getItems = () => {
  return fetch(baseUrl).then(res => res.json())
}

export const createItem = (item) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: item, isActive: false})
  })
  .then(res => res.json())
}

export const saveItem = (item) => {
  return fetch(`${baseUrl}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(response => response.json())
}

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const updateItem = (item) => {
  return fetch(`${baseUrl}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign({...item}, {isActive:!item.isActive}))
  }).then(response => response.json())
}

export const updateItemPropsServer = (item) => {
  return fetch(`${baseUrl}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then(response => response.json())
}
