import React from 'react';
import { IMG_URL } from '../../constan';

class ListEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: []
    }
  }

  componentWillReceiveProps(NextProps){
    if(NextProps.events){
      this.state.status = Array(NextProps.events.length).fill(true);
      this.setState({status: this.state.status});
    }
  }

  photoUrl = (link) => {
    return IMG_URL +  link;
  }

  limitString = (string) =>{
    return string.substring(0,300) + "...";
  }

  toggleText = (id_element,text) => {
    if (this.state.status[id_element]){
      document.getElementById("event-" + id_element).innerHTML= text;
      document.getElementById("toggleButton-" +  id_element).innerHTML = "See less";
      this.state.status[id_element] = false;
      this.setState({status: this.state.status});
    } else {
      document.getElementById("event-" + id_element).innerHTML=this.limitString(text);
      document.getElementById("toggleButton-" + id_element).innerHTML = "See more";
      this.state.status[id_element] = true;
      this.setState({status: this.state.status});
    } 
  }

  event = (events) => {
    debugger;
    if (events.length >0){
    return (
      events.map((event, i) => {
        return (
          <article>
            <div className="row">
              <div className="span8 team-box">
                <div className="post-image">
                  <div className="post-heading">
                    <h3><a href="#">{event.name}</a></h3>
                  </div>

                  <img src={this.photoUrl(event.photo)} alt="" />
                </div>
                <div className="meta-post">
                  <ul>
                    <li><i className="icon-file"></i></li>
                    <li>By <a href="#" className="author">Admin</a></li>
                    <li>On <a href="#" className="date">10 Jun, 2013</a></li>
                    <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                  </ul>
                </div>
                <div className="post-entry">
                  <p id={"event-" + i}>
                      {this.limitString(event.infor)}
                    </p>
                  <a onClick={this.toggleText.bind(this,i,event.infor)} id={"toggleButton-" + i} className="readmore">Read more <i className="icon-angle-right"></i></a>
                </div>
              </div>
            </div>
          </article>
        )
      })
    )
    }
  }

  render() {
    return (
      <div>
        {this.event.bind(this,this.props.events)}
      </div>
    )
  }
}

export default ListEvent;