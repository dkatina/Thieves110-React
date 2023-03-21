import './App.css';
import React, { Component } from 'react'
import Nav from './components/Nav';
import Home from './views/Home';
import Pokemon from './views/Pokemon';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Feed from './views/Feed';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      test: 'phone',
      age: 99
    }
  }

  addOne = () => {
    console.log('button was clicked')
    // this is not the right way
    // this.state.age += 1

    // use setter method
    this.setState({age : this.state.age + 1})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav/>

          <Routes>
            <Route path='/' element={<Home test={this.state.test} age={this.state.age} addOne={this.addOne}/>}/>
            <Route path='/pokemon' element={<Pokemon/>}/>
            <Route path='/feed' element={<Feed/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}