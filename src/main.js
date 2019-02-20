import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './components/about/aboutPage';
import LoginPage from './components/account/loginPage';
import ProfilePage from './components/account/profilePage';
import EditProfilePage from './components/account/editProfilePage';
import NewEventPage from './components/event/newEventPage';
import NewGroupPage from './components/group/newGroupPage';
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={About}/>
      <Route path='/about' component={About}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/users/:id' component={ProfilePage}/>
      <Route path='/user/edit' component={EditProfilePage} />
      <Route path='/event/new' component={NewEventPage} />
      <Route path='/group/new' component={NewGroupPage} />
    </Switch>
  </main>
)

export default Main;