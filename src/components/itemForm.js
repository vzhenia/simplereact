import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateCurrentItem, saveItem} from '../actions/actions';


class ItemForm extends Component {

  handleInputChange = (e) => {
    const name = e.target.value;
    const updatedItem = Object.assign({...this.props.currentItem}, {name});
    this.props.updateCurrentItem(updatedItem);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentItem){
      this.props.saveItem(this.props.currentItem.name);
    }
    this.props.saveForm();
  }
  render(){
    const {currentItem, caller} = this.props;
    return (
      <div>
        {caller === 'addItem' &&
          <div className='buttonSaveForm'
            onClick={this.handleSubmit}
          >SAVE ITEM</div>
        }
        <form onSubmit={this.handleSubmit} className='form' style={caller === 'editItem' ? {marginLeft: 10} : {marginLeft: '25%'}}>
          <input type='text'
            value={currentItem ? currentItem.name : ''}
            onChange={this.handleInputChange}
            maxLength={15}/>
        </form>
      </div>
)}
}

export default connect(
  (state) => ({currentItem: state.currentItem}),
  {updateCurrentItem, saveItem}
)(ItemForm)
