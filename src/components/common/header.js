import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../service/login.service';
import * as userAction from '../../actions/userAction';
import * as userStatusAction from '../../actions/userStatusAction';
import {checkCurrentUser} from '../service/login.service';

class Header extends Component {
    componentWillMount(){
    };

    setCurrentUser(value){
        this.props.dispatch(userAction.addCurrentUser(value))
        this.props.dispatch(userStatusAction.addUserStatus(true));
    }

    componentDidMount(){
        checkCurrentUser(this.setCurrentUser.bind(this));
    }

    onClickLogout = () => {
        logoutUser(this.props.current_user,this.removeCurrenUser.bind(this));
    }

    removeCurrenUser = () => {
        this.props.dispatch(userAction.addCurrentUser({}));
        this.props.dispatch(userStatusAction.addUserStatus(false));
    }

    renderHeader = () => {
        // if (Object.keys(this.props.current_user).length != 0){
        if (this.props.current_user_status == true){
          return (
            <ul className="nav topnav">
                <li className="dropdown">
                <a href={'/'}><i className="icon-home"></i> Home <i className="icon-angle-down"></i></a>
                <ul className="dropdown-menu">
                    <li><a href="index-alt2.html">Homepage 2</a></li>
                    <li><a href="index-alt3.html">Homepage 3</a></li>
                    <li><a href="index-alt4.html">Parallax slider</a></li>
                    <li><a href="index-landingpage.html">Landing page</a></li>
                </ul>
                </li>
                
                {/* <li className="dropdown">
                <a href="index.html">Features <i className="icon-angle-down"></i></a>
                <ul className="dropdown-menu">
                    <li><a href="typography.html">Typography</a></li>
                    <li><a href="components.html">Components</a></li>
                    <li><a href="icons.html">Icons</a></li>
                    <li><a href="icon-variations.html">Icon variations</a></li>
                    <li className="dropdown"><a href="index.html">3rd menus<i className="icon-angle-right"></i></a>
                    <ul className="dropdown-menu sub-menu-level1">
                        <li><a href="index.html">Sub menu</a></li>
                        <li><a href="index.html">Sub menu</a></li>
                    </ul>
                    </li>
                </ul>
                </li>
                <li className="dropdown active">
                <a href="index.html">Pages <i className="icon-angle-down"></i></a>
                <ul className="dropdown-menu">
                    <li><a href="about.html">About us</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="team.html">Team</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="pricingbox.html">Pricing boxes</a></li>
                    <li><a href="404.html">404</a></li>
                </ul>
                </li>
                <li className="dropdown">
                <a href="index.html">Portfolio <i className="icon-angle-down"></i></a>
                <ul className="dropdown-menu">
                    <li><a href="portfolio-2cols.html">Portfolio 2 columns</a></li>
                    <li><a href="portfolio-3cols.html">Portfolio 3 columns</a></li>
                    <li><a href="portfolio-4cols.html">Portfolio 4 columns</a></li>
                    <li><a href="portfolio-detail.html">Portfolio detail</a></li>
                </ul>
                </li> */}
                <li className="dropdown">
                <a href={'/users/' + this.props.current_user.id}> {this.props.current_user.name}  <i className="icon-angle-down"></i></a>
                <ul className="dropdown-menu">
                    <li><a href={'/users/' + this.props.current_user.id}>Your Profile</a></li>
                    <li><a onClick={this.onClickLogout.bind(this)}>Logout</a></li>
                </ul>
                </li>
                <li>
                </li>
            </ul>
          )
        } else {
            return (
                <ul className="nav topnav">
                    <li className="dropdown">
                    <a href="index.html">Blog <i className="icon-angle-down"></i></a>
                    <ul className="dropdown-menu">
                        <li><a href="blog-left-sidebar.html">Blog left sidebar</a></li>
                        <li><a href="blog-right-sidebar.html">Blog right sidebar</a></li>
                    </ul>
                    </li>
                    <li>
                    <Link to="/login" >Login</Link>
                    </li>
                </ul>
            )
        }
    };

    render() {
        return (
            <div>
                <header>
                <div className="top">
                </div>
                <div className="container">
                    <div className="row nomargin">
                    <div className="span4">
                        <div className="logo">
                        <a href={'/'}><img src={require('../../assets/img/logo.png')} alt="" /></a>
                        </div>
                    </div>
                    <div className="span8">
                        <div className="navbar navbar-static-top">
                        <div className="navigation">
                            <nav>
                                {this.renderHeader()}
                            </nav>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </header>
                {/* <section id="inner-headline">
      <div className="container">
        <div className="row">
          <div className="span12">
            <div className="inner-heading">
              <ul className="breadcrumb">
                <li><a href="index.html">Home</a> <i className="icon-angle-right"></i></li>
                <li className="active">Blog left sidebar</li>
              </ul>
              <h2>Blog left sidebar</h2>
            </div>
          </div>
        </div>
      </div>
    </section> */}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        current_user: state.current_user,
        current_user_status: state.current_user_status
    };
}

export default connect(mapStateToProps)(Header);