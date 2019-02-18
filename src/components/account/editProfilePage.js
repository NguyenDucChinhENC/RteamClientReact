import React, { Component } from 'react';
import { getProfile } from '../service/user.service';
import { editpro } from '../service/user.service';
import { connect } from 'react-redux';

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }
    componentWillReceiveProps(NextProps) {
        let current_user_id = localStorage.getItem('current_user') || false;
        if (NextProps.current_user){
            getProfile(NextProps.current_user.id, this.getUserSuccess.bind(this));
    }
    }

    setCurrentUserState = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.state.user[field] = value;
        return this.setState({user: this.state.user})
    }


    getUserSuccess(value){
        this.state.user = value;
        this.setState({user: this.state.user});
        console.log(value);
    }

    onClickSave(){
        // debugger;
        editpro(this.props.user, this.props.current_user);
        console.log('hihi');
    }
    render() {
        return (
            <section id="content">

      <div className="container">
        <div className="row">

          <div className="span4">

            <aside className="left-sidebar">


              <div className="widget">
              <div className="row profile">
                <div className="col-md-3">
                  <div className="profile-sidebar">
                    <div className="profile-userpic">
                      <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/46456138_2179737705616854_5669200979241730048_n.jpg?_nc_cat=109&_nc_oc=AQnMm6e87Tmp3MGYNRD6bOR_rPvmmmt_ibKnJ8V8FmV_ZCM27qcsw7JNLCgZesk585Y&_nc_ht=scontent.fhan2-3.fna&oh=a44382b4655d3e2ed4e3e3c1898e271c&oe=5CEF8C9F" className="img-responsive" alt="" />
                    </div>
                    <div className="profile-usertitle">
                      <div className="profile-usertitle-name">
                        Marcus Doe
                      </div>
                      <div className="profile-usertitle-job">
                        Developer
                      </div>
                    </div>
                  </div>
                </div>
   
              </div>
                {/* <h5 className="widgetheading">Categories</h5> */}

                <ul className="cat">
                  {/* <li><i className="icon-angle-right"></i> <a href="#">Web design</a><span> (20)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Online business</a><span> (11)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Marketing strategy</a><span> (9)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Technology</a><span> (12)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">About finance</a><span> (18)</span></li> */}
                </ul>
             </div>
            </aside>
        </div>

         

            <div className="span8">
                <div className="row controls">
                    <div className="span6 control-group">
                      <label>Your name (required)</label>
                      <input type="text" name="name" value={this.state.user.name} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span3 control-group">
                      <label>Your email address (required)</label>
                      <input type="text" name="email" value={this.state.user.email} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                </div>
                <a type="submit" className="btn btn-warning btn-rounded" onClick={this.onClickSave.bind(this)}>Save</a>
            </div>
      </div>
      </div>
    </section>
        )
    }
}

function mapStateToProps(state, ownProps){
  return{
      current_user: state.current_user,
      current_user_status: state.current_user_status
  };
}

export default connect(mapStateToProps)(EditProfile);
