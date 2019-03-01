import React, { Component } from 'react';
import { Switch, Route,  Redirect } from 'react-router-dom';
import About from './components/about/aboutPage';
import LoginPage from './components/account/loginPage';
import ProfilePage from './components/account/profilePage';
import EditProfilePage from './components/account/editProfilePage';
import NewEventPage from './components/event/newEventPage';
import NewGroupPage from './components/group/newGroupPage';
import GroupPage from './components/group/groupPage';
import editGroupPage from './components/group/editGroupPage';
import eventPage from './components/event/eventPage';
import editEventPage from './components/event/editEventPage';
import listGroupPage from './components/about/listGroupPage';

const PrivateRoute = ({ component: Component, ...rest}) =>(
  <Route {...rest} render={(props) => (
    localStorage.getItem('current_user')
    ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const Main = () => (
  <main>
    <Switch>
        <Route exact path='/' component={About}/>
        <Route path='/about' component={About}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/users/:id' component={ProfilePage}/>
        <Route path='/user/edit' component={EditProfilePage} />
        <Route path='/groups/:id/event/new' component={NewEventPage} />
        <Route path='/group/new' component={NewGroupPage} />
        <Route path='/groups/:id' component={GroupPage} />
        <PrivateRoute path='/group/edit/:id' component={editGroupPage}/>
        <Route path='/events/:id' component={eventPage} />
        <Route path='/event/edit/:id' component={editEventPage} />
        <Route path='/groups' component={listGroupPage} />
      }
    </Switch>
  </main>
)

export default Main;