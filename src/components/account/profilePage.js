import React, { Component } from 'react';
import { getProfile } from '../service/user.service';
import { connect } from 'react-redux';
import { IMG_URL } from '../../constan';
import ModalImage from 'react-modal-image'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        getProfile(this.props.match.params.id, this.getUserSuccess.bind(this));
    }

    getUserSuccess(value){
        this.state.user = value;
        this.state.user.avatar = IMG_URL + value.avatar;
        this.setState({user: this.state.user});
        console.log(value);
    }

    renderButtonEditOrFollow(){
      if (this.props.current_user_status == true) {
        if (this.props.match.params.id == this.props.current_user.id){
          return (
            <a href={'/user/edit'} className="btn btn-warning btn-rounded">Edit profile</a>
          )
        } else {
          return (
            <a href="#" className="btn btn-warning btn-rounded">Follow</a>
          )
        }
      }
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
                    <ModalImage
                        small={this.state.user.avatar}
                        large={this.state.user.avatar}
                        className="img-responsive"
                      />
                      {/* <img src={this.state.user.avatar} className="img-responsive" alt="" /> */}
                      
                    </div>
                   
                    <div className="profile-usertitle">
                      <div className="profile-usertitle-name">
                        {this.state.user.name}
                      </div>
                      <div className="profile-usertitle-job">
                        Developer
                      </div>
                    </div>
                    <div className="profile-userbuttons">
                      {this.renderButtonEditOrFollow()}
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

export default connect(mapStateToProps)(Profile);
