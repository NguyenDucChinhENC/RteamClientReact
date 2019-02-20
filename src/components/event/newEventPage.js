import React from 'react';
import { connect } from 'react-redux';
import { IMG_URL } from '../../constan';
import { read } from 'fs';
import { createEvent } from '../service/event.service';

class NewEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            event: {}
        }
    }

    setEventState = (event) => {
        
        let field = event.target.name;
        let value = event.target.value;
        this.state.event[field] = value;
        this.setState({event: this.state.event});
    }

    previewFile(){
        let preview = document.querySelector('#image-event');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader;

        reader.onloadend = this.setPhotoField.bind(this, reader, preview)

        if (file) {
            reader.readAsDataURL(file);
          } else {
            preview.src = "";
          }
    }

    onClickSubmit(){
        createEvent(this.props.current_user, this.state.event);
    }

    setPhotoField(reader, preview){
        preview.src = reader.result;
        this.state.event.avatar = reader.result;
        this.setState({event: this.state.event});
    }
    render() {
        return (
            <section id="content">

                <div className="container">
                    <div className="row">
                        <article>
                            <div className="row">

                                <div className="span12">
                                <div className="post-image">
                                    <div className="post-heading">
                                    <h3><a href="#">New Event</a></h3>
                                    </div>
                                </div>
                                <div className="meta-post">
                                <div className="row controls">
                                    <div className="span12 control-group">
                                        <label>Name (required)</label>
                                        <textarea maxlength="5000" 
                                            rows="2"
                                            name="name"
                                            className="span12" 
                                            onChange={this.setEventState} >
                                            </textarea>
                                        </div>
                                    <div className="span3 control-group">
                                        <label>Address</label>
                                        <input type="text" 
                                            name="location" 
                                            maxlength="100" 
                                            className="span3" 
                                            onChange={this.setEventState} />
                                    </div>
                                    <div className="span3 control-group">
                                        <label>Quantity</label>
                                        <input type="text" 
                                            name="quantity" 
                                            maxlength="100" 
                                            className="span3"
                                            onChange={this.setEventState} />
                                    </div>
                                    <div className="span3 control-group">
                                        <label>Time</label>
                                        <input type="date" 
                                            name="time"  
                                            maxlength="100" 
                                            className="span3"
                                            onChange={this.setEventState} />
                                    </div>
                                    <div className="span3 control-group">
                                        <label>Registration deadline</label>
                                        <input type="date" 
                                            name="registration_deadline" 
                                             maxlength="100" 
                                             className="span3"
                                             onChange={this.setEventState} />
                                    </div>
                                    <div className="span12 control-group">
                                        <label>Information</label>
                                        <textarea maxlength="5000" 
                                            name="infor"
                                            rows="7" 
                                            className="span12"
                                            onChange={this.setEventState}>
                                        </textarea>
                                    </div>
                                    {/* <input type="file" id="my-file" name="photo" onChange={(e)=> {this.previewFile(e,this.setPhotoField)}}></input> */}
                                    <div className="tab-pane span9" id="Tabs-Ketiga">
                                        <div className="col-md-12">
                                            <div className="form-group files">
                                                <label>Upload Photo Event </label>
                                                <input type="file" id="my-file" name="photo" onChange={(e)=> {this.previewFile(e,this.setPhotoField)}} className="form-control" multiple=""/>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <a href="#" className="btn btn-medium btn-danger btn-rounded pull-right" onClick={this.onClickSubmit.bind(this)}>Submit</a>

                                <div className="post-entry">
                                    <p>
                                    See event information below ...
                                    </p>
                                </div>
                                </div>
                                

                            </div>
                            <div className="row preview-event">

                                    <div className="span8">

                                        <aside className="left-sidebar">
                                            <div className="post-image">
                                                <div className="post-heading">
                                                <h3><a href="#">{this.state.event.name}</a></h3>
                                                </div>
                                                <img id="image-event" src="https://photo2.tinhte.vn/data/attachment-files/2019/02/4566127_cover_home_Galaxy_S10_dien_thoai_trung_quoc.jpg" alt="" />
                                            </div>
                                        </aside>
                                    </div>

                                    <div className="span3 flyRight">
                                        
                                        <div className="row">
                                            <div className="span3">
                                            
                                            <div className="about-author span3" id="table-info">
                                                <h6><i className="icon-time"></i><a href="#"> Time: {this.state.event.time}</a></h6>
                                                <h6><i className="icon-map-marker"> </i><a href="#">  Location: {this.state.event.location}</a></h6>
                                                <h6><i className="icon-user"></i><a href="#"> Quantity: {this.state.event.quantity}</a></h6>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </article>
                        
                    </div>
                    
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        current_user: state.current_user,
    };
}

export default connect(mapStateToProps)(NewEvent);