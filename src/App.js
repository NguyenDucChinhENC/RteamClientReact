import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import About from './components/about/aboutPage';
import Main from './main'
import Header from './components/common/header';
import {checkCurrentUser} from './components/service/login.service';
import axios from 'axios';
// import { connect } from 'react-redux';
import * as userAction from "./actions/userAction";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      current_user: false
    }
  }
  setCurrentUser(value){
    // this.props.dispatch(userAction.addCurrentUser(value))    
  }
  componentDidMount(){
    // this.setState({ current_user: checkLogined()});
    // checkLogined(this.setCurrentUser.bind(this));
    checkCurrentUser(this.setCurrentUser.bind(this));
    // console.log(this.state.current_user);

  };
  render() {
    return (
      <div className="App">
        <Header/>
        <Main updateCurrentUser={this.setCurrentUser.bind(this)}/>
        {/* <script src={require('./assets/js/bootstrap.js')}></script> */}
        <script src={require('./assets/js/custom.js')}></script>
        <script src={require('./assets/js/animate.js')}></script>
        <script src={require('./assets/js/inview.js')}></script>
        <script src={require('./assets/js/jquery.cslider.js')}></script>
        <script src={require('./assets/js/jquery.easing.1.3.js')}></script>
        <script src={require('./assets/js/jquery.flexslider.js')}></script>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
      current_user: state.current_user
  };
}

export default App;
