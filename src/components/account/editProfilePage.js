import React, { Component } from 'react';
import { getProfile } from '../service/user.service';
import { editpro } from '../service/user.service';
import { connect } from 'react-redux';
import * as userAction from '../../actions/userAction';
import { IMG_URL } from '../../constan';

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
        if (this.props.current_user.name != value.name){
          let current_user = {
            name: value.name,
            id: this.props.current_user.id,
            authentication_token: this.props.current_user.authentication_token
          }
          this.props.dispatch(userAction.addCurrentUser(current_user));
          localStorage.setItem('current_user', JSON.stringify(current_user));
        }
        this.state.user = value;
        this.state.user.avata = IMG_URL + value.avatar;
        debugger;
        this.setState({user: this.state.user});
        console.log(value);
    }

    onClickSave(){
      debugger;
        editpro(this.state.user, this.props.current_user, this.getUserSuccess.bind(this));
        console.log('hihi');
        console.log(this.state.user);
        console.log('hihi');

    }

    onClickImage(){
      var input = document.querySelector('#my_file');
      input.click();
    }

    previewFile() {
      var preview = document.querySelector('#avatar-user');
      var file = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.onloadend = this.setAvatarField.bind(this, reader, preview)
      
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }

    setAvatarField(reader, preview){
      preview.src = reader.result;
      this.state.user.avatar =reader.result;
      this.setState({user: this.state.user})
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
                      <img src={this.state.user.avata} id="avatar-user" onClick={this.onClickImage} className="img-responsive" alt="" />
                    </div>
                    <div className="profile-usertitle">
                      <div className="profile-usertitle-name">
                        {this.state.user.name}
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

            <div className="span8 flyLeft">
                <div className="row controls">
                    <div className="span6 control-group">
                      <label>Your name (required)</label>
                      <input type="text" name="name" value={this.state.user.name} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span6 control-group">
                      <label>Your email address (required)</label>
                      <input type="text" name="email" value={this.state.user.email} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span3 control-group">
                      <label>Your Number phone</label>
                      <input type="text" name="number_phone" value={this.state.user.number_phone} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span3 control-group">
                      <label>Your Birthday)</label>
                      <input type="date" name="birthday" value={this.state.user.birthday} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span3 control-group">
                      <label>Your Address</label>
                      <input type="text" name="address" value={this.state.user.address} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    <div className="span3 control-group">
                      <label>Your Country</label>
                      <input type="text" name="country" value={this.state.user.country} maxlength="100" onChange={this.setCurrentUserState} className="span3" />
                    </div>
                    {/* <input type="file" id="my_file" style="display: none;" /> */}
                    <input type='file' id="my_file" name="avatar" onChange={(e) => {this.previewFile(e,this.setAvatarField); this.setCurrentUserState(e)}} className="span3" />
                </div>
                <a type="submit" className="btn btn-warning btn-rounded" onClick={this.onClickSave.bind(this) } >Save</a>
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
