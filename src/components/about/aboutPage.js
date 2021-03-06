import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllEvents } from '../service/event.service';
import ListEvent from '../group/listEvent';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      events_comming: []
    }
  }
  componentWillReceiveProps(NextProps) {
    if (NextProps.current_user) {
      let id = this.props.match.params.id;
      getAllEvents(NextProps.current_user, this.getAllEventsSuccess.bind(this));
    }
  }
  getAllEventsSuccess = (value) => {
    this.state.events = value.events;
    this.state.events_comming = value.events_comming;
    this.setState({ events: this.state.events, events_comming: this.state.events_comming });
  }
  renderListEvent = (events) => {
    return (
      events.map((event, i) => {
        return (
          <li><a href={'/events/' + event.id}>{event.name}</a><span></span></li>
        )
      })
    )
  }
  render() {
    return (
      <section id="content">

        <div className="container">
          <div className="row">

            <div className="span4">

              <aside className="left-sidebar">
                <div className="widget">

                  <h5 className="widgetheading">{"Events Comming (" + this.state.events_comming.length + ")"}</h5>

                  <ul className="cat">
                    {this.renderListEvent(this.state.events_comming)}
                  </ul>
                </div>
                <hr></hr>
                <div className="widget">

                  <h5 className="widgetheading">{"Events (" + this.state.events.length + ")"}</h5>

                  <ul className="cat">
                    {this.renderListEvent(this.state.events)}
                  </ul>
                </div>
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
            <div className="span8">
              <ListEvent events={this.state.events} />
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

export default connect(mapStateToProps)(About);