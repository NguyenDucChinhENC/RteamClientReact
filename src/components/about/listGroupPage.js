import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllGroups } from '../service/group.service';

class ListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      events_comming: []
    }
  }
  componentWillReceiveProps(NextProps) {
    if (NextProps.current_user) {
      let id = this.props.match.params.id;
      getAllGroups(NextProps.current_user, this.getAllGroupsSuccess.bind(this));
    }
  }
  getAllGroupsSuccess = (value) => {
    this.state.groups = value.groups;
    this.setState({ groups: this.state.groups});
  }
  renderListGroups = (groups) => {
    return (
      groups.map((group, i) => {
        return (
          <li><a href={'/groups/' + group.id}>{group.name}</a><span></span></li>
        )
      })
    )
  }

  renderListGroup = () => {
      return (
          this.state.groups.map((group,i) => {
              return (
                <li className="item-thumbs span4 design"  data-id="id-0" data-type="design">
                <div className="team-box thumbnail" href={'/groups/' + group.id}>
                  <div className="caption">
                    <h5><a href={'/groups/' + group.id}>{group.name.substring(0,25)}</a></h5>
                    <p>
                      Web designer
                    </p>
                  </div>
                </div>
              </li>
              )
          })
      )
  }
  render() {
    return (
      <section id="content">

        <div className="container">
          <div className="row">

            <div className="span3">

              <aside className="left-sidebar">
                <div className="widget">

                  <h5 className="widgetheading">{"Events Comming (" + this.state.groups.length + ")"}</h5>

                  <ul className="cat">
                    {this.renderListGroups(this.state.groups)}
                  </ul>
                </div>
                <hr></hr>
                <div className="widget">
                  <div className="row profile">
                    <div className="col-md-3">
                      <div className="profile-sidebar">
                        <div className="profile-userpic">
                          {/* <img src={this.state.user.avatar} className="img-responsive" alt="" /> */}

                        </div>

                        <div className="profile-usertitle">
                          <div className="profile-usertitle-name">
                          </div>
                          <div className="profile-usertitle-job">
                          </div>
                        </div>
                        <div className="profile-userbuttons">
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
            <div className="span9">
            <section id="team">
                <ul className="s">
                  {this.renderListGroup()}
                  </ul>
                  </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    current_user: state.current_user,
  };
}

export default connect(mapStateToProps)(ListGroup);