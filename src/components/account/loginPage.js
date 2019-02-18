import React, {Component} from 'react';
import {loginUser} from '../service/login.service';
import { connect } from 'react-redux';
import * as userAction from '../../actions/userAction';
import * as userStatusAction from '../../actions/userStatusAction';
import { browserHistory } from 'react-router';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountLogin: {
            mail: '',
            password: ''
            }
        }
    }

    loginSuccess = (current_user) => {
        this.props.dispatch(userAction.addCurrentUser(current_user));
        this.props.dispatch(userStatusAction.addUserStatus(true));
        this.props.history.push('/');
    }

    setAccountLoginStaten = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.state.accountLogin[field] = value;
        return this.setState({accountLogin: this.state.accountLogin})
    }

    handleClick = (event) => {
        event.preventDefault();
        loginUser(this.state.accountLogin,this.loginSuccess.bind(this));
    }

   render() {
       return (

        <section id="content">
      <div className="container">
        <div className="row demobtn">
          <div className="span12">

            <div class="row">
              <div className="span5">

                <h4>Button with icon</h4>

                <p>You can add icon from about 249 available icons to any choosen buttons. See some example below:</p>
                <p>You can add icon from about 249 available icons to any choosen buttons. See some example below:</p>
                <p>You can add icon from about 249 available icons to any choosen buttons. See some example below:</p>
              </div>
              <div class="span">
                <div class="col-md-6 offset-md-3">
                        <h2><strong>Login to <span class="colored">your RTeam</span></strong></h2>
                        <p class="animated fadeInUp">Nếu bạn đã có tài khoản</p>
                        <form>
                        <div className="row controls">
                            <input className="span5" 
                                type="text" 
                                name="mail" 
                                ref="mail" 
                                onChange={this.setAccountLoginStaten} 
                                value={this.state.accountLogin.mail} />
                            <input className="span5"  
                                type="password" 
                                name="password" 
                                ref="password" 
                                onChange={this.setAccountLoginStaten} 
                                value={this.state.accountLogin.password} />
                                <br/>
                            <a type="submit" className="btn btn-warning btn-rounded" onClick={this.handleClick.bind(this)}>rounded button</a>
                            <button class="btn btn-warning btn-rounded" type="submit" onClick={this.handleClick.bind(this)}>Login</button>
                        </div>
                        
                        </form>
                    </div>
                </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>


        // <section id="featured">
        //     <div class="landing">
        //         <div class="container">
        //             <div class="row">
        //             <div class="span5">
        //                 <img src={require('../../assets/img/lp/screen-1.png')} alt="" class="flyLeft" />
        //             </div>
                    // <div class="span6">
                    //     <h2><strong>Login to <span class="colored">your RTeam</span></strong></h2>
                    //     <p class="animated fadeInUp">Nếu bạn đã có tài khoản</p>
                    //     <form>
                    //     <div class="input-append">
                    //         <input class="span3 input-large" 
                    //             type="text" 
                    //             name="mail" 
                    //             ref="mail" 
                    //             onChange={this.setAccountLoginStaten} 
                    //             value={this.state.accountLogin.mail} />
                    //     </div>
                    //     <div class="input-append">
                    //         <input class="span3 input-large" 
                    //             type="password" 
                    //             name="password" 
                    //             ref="password" 
                    //             onChange={this.setAccountLoginStaten} 
                    //             value={this.state.accountLogin.password} />
                    //     </div>
                    //     <br/>
                    //         <button class="btn btn-theme btn-large" type="submit" onClick={this.handleClick.bind(this)}>Login</button>
                    //     </form>
                    // </div>
        //         </div>
        //     </div>
        //     </div>
        // </section>
       )
   } 
}

function mapStateToProps(state, ownProps){
    return{
        current_user: state.current_user
    };
}

export default connect(mapStateToProps)(LoginPage);