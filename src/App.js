import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
// uuid can be used to generate random ids
//import uuid from 'uuid';
import axios from 'axios';
import './App.css';

export class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getAllTodo')
      .then(res => this.setState({
        todos: res
      }))
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  delTodo = (id) => {
    axios.post(`http://localhost:5000/delTodo`,{
      _id: id
    })
      .then(res => this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }));
  }

  addTodo = (title) => {
    axios.post('http://localhost:5000/addTodo', {
      title: title,
      completed: false
    })
      .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;