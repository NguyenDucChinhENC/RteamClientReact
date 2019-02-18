import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './components/about/aboutPage';
import LoginPage from './components/account/loginPage';
import ProfilePage from './components/account/profilePage';
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={About}/>
      <Route path='/about' component={About}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/users/:id' component={ProfilePage}/>
    </Switch>
  </main>
)

export default Main;