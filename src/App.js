import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemForm from './components/itemForm';
import ItemList from './components/itemList';

class App extends Component {
  state = {
    formDisplayed: false,
  }

  displayForm = () => {
    this.setState({formDisplayed: true})
  }
  saveForm = () => {
    this.setState({formDisplayed: false})
  }

  render() {
    const formDisplayed = this.state.formDisplayed;
    return (
      <div className='itemApp'>
        <ItemList
          handleToggle={this.props.handleToggle}
          handleEdit={this.props.handleEdit}
          handleDelete={this.props.handleDelete}
          />

        {!formDisplayed ?
          <div className='buttonAddForm'
            onClick={this.displayForm}
            >ADD ITEM</div> :
          <ItemForm
            changeCurrent={this.props.updateCurrent}
            saveForm={this.saveForm}
            caller='addItem'
          />
        }
      </div>
    );
  }
}

export default App
