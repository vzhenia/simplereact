import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchItems, saveUpdatedItem, removeItem, updateItemStatus, updateCurrentItem} from '../actions/actions';
import {Item} from './item';

const RequestDeleteDialog = (props) => {
  const onConfirmDelete = () => {
    props.handleDelete(props.itemToDeleteId);
    props.closeDialog();
  }
  return (
    <div className='requestDeleteDialog'>
      <div className='controlButtonContainer'>
        <p className='question'>Are you sure you want to delete the item?</p>
        <div className='yes'
          onClick={onConfirmDelete}>Yes</div>
        <div className='no'
          onClick={() => props.closeDialog()}>No</div>
      </div>
    </div>
  )
}

class ItemList extends Component {

  state = {
    itemEditId: null,
    loadingMessage: null,
    requestDeleteDialog: false,
    itemToDeleteId: null,
  }

  componentDidMount(){
    const res = this.props.fetchItems();
    this.setState({loadingMessage: 'Loading items from server...'});
    setTimeout(() => this.setState({loadingMessage: null}), 2000)
  }
  handleEdit = (id) => {
    this.setState({itemEditId: id})
    const currentItem = this.props.items.filter(item => item.id === id)[0];
    this.props.updateCurrentItem(currentItem);
  }
  handleSave = () => {
    this.props.saveUpdatedItem(Object.assign({},this.props.currentItem));
    this.setState({itemEditId: null});
  }
  handleRequestDelete = (id) => {
    this.setState({requestDeleteDialog: true, itemToDeleteId: id})
  }
  closeDialog = () => {
    this.setState({requestDeleteDialog: false, itemToDeleteId: null})
  }

  render(){
    const {loadingMessage, requestDeleteDialog, itemToDeleteId} = this.state;
    return (
      <div className='itemList'>
        {loadingMessage && <span style={{color:'red'}}>{loadingMessage}</span>}
        {this.props.items.map((item, i) => (
          <Item key={`item-${i}`}
            item={item}
            classN={`listItem tile-${i%9}`}
            handleRequestDelete={id => this.handleRequestDelete(id)}
            handleToggle={item => this.props.updateItemStatus(item)}
            handleEdit={this.handleEdit}
            handleSave={this.handleSave}
            itemEditId={this.state.itemEditId}
          />
          )
        )}
        {requestDeleteDialog &&
          <RequestDeleteDialog
            itemToDeleteId={itemToDeleteId}
            handleDelete={id => this.props.removeItem(id)}
            closeDialog={() => this.closeDialog()}
            />}
      </div>
    )
  }
}

export default connect(
  (state) => ({currentItem: state.currentItem, items: state.items}),
  {fetchItems, saveUpdatedItem, removeItem, updateItemStatus, updateCurrentItem}
)(ItemList)
