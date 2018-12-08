import React, { Component } from 'react';
import axios from 'axios'
import Button from "./Components/Button"


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userInput: '',
      list: [],
      editTggle: false,
      editInput: '',
    }
    this.state.list.map = this.state.list.map.bind(this)
  }

  componentDidMount(){
    axios.get('/api/list')
      .then(res => {
        console.log(res)
        this.setState({
          list: res.data
        })
      })
  }

  handleChange(val){
    this.setState({
      userInput: val
    })
  }

  handleEditInput(val){
    this.setState({
      editInput: val
    })
  }

  addItem = () => {
    console.log('clicked')
    console.log(this.state.input)
    axios.post(`/api/list`, {text: this.state.userInput})
      .then(res => {
        this.setState({
          list: res.data
        })
      })
  }

  removeItem(id){
    axios.delete(`/api/list/${id}`)
      .then(res => {
        this.setState({
          list: res.data
        })
      })
  }

  editItem(id){
    if(!this.state.editTggle){
      this.setState({
        editTggle: true
      })
    }else {
      axios.put(`/api/list/${id}`, {editInput: this.state.editInput})
        .then(res => {
          console.log(res.data)
          this.setState({
            list: res.data,
            editTggle: false
          })
        })
    }
  }

  render() {
    console.log(this.state)
    const showList = this.state.list.map(listItem => {
      console.log(listItem)
      return( <div key={listItem.id}>
        {this.state.editTggle ? 
        <input onChange={e => this.handleEditInput(e.target.value)}/>
        :
        <p>{listItem.list}</p>
      }
      <button onClick={() => this.removeItem(listItem.id)}>Delete</button>
      <button onClick={() => this.editItem(listItem.id)}>Edit</button>
      </div>)
    })
    return (
      <div className="App">
        {showList}
      <input
      placeholder='Add new item...'
        onChange={e => this.handleChange(e.target.value)}/>
        <Button addItem={this.addItem}/>
        
        
      </div>
    );
  }
}

export default App;
