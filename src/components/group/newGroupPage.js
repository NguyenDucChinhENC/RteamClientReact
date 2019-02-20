import React from 'react';
import { connect } from 'react-redux';

class NewGroup extends React.Component {
    render(){
        return(
            <div>
                <section id="content">

<div className="container">
    <div className="row">
        <article>
            <div className="row preview-event">

                <div className="span12 cover-group">

                    <div className="post-image">
                            <div className="crop-div">
                            <img id="image-event" className="img-group" src="https://photo2.tinhte.vn/data/attachment-files/2019/02/4566127_cover_home_Galaxy_S10_dien_thoai_trung_quoc.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                </div>
                <article>
                         <div className="row preview-event">

                                    <div className="span8">
                                    <div className="row">

<div className="span8">
<div className="post-image">
    <div className="post-heading">
    <h3><a href="#">New Event</a></h3>
    </div>
</div>
<div className="meta-post">
<div className="row controls">
    
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
    <div className="span8 control-group">
        <label>Information</label>
        <textarea maxlength="5000" 
            name="infor"
            rows="7" 
            className="span8"
            onChange={this.setEventState}>
        </textarea>
    </div>
    {/* <input type="file" id="my-file" name="photo" onChange={(e)=> {this.previewFile(e,this.setPhotoField)}}></input> */}
    <div className="tab-pane span9" id="Tabs-Ketiga">
        <div className="col-md-8">
            <div className="form-group files">
                <label>Upload Photo Event </label>
                {/* <input type="file" id="my-file" name="photo" onChange={(e)=> {this.previewFile(e,this.setPhotoField)}} className="form-control" multiple=""/> */}
            </div>
            
        </div>
    </div>
</div>
</div>
{/* <a href="#" className="btn btn-medium btn-danger btn-rounded pull-right" onClick={this.onClickSubmit.bind(this)}>Submit</a> */}

<div className="post-entry">
    <p>
    See event information below ...
    </p>
</div>
</div>


</div>


                                        <aside className="left-sidebar">
                                            <div className="post-image">
                                                <div className="post-heading">
                                                </div>
                                                <div className="span8 control-group">
        <label>Name (required)</label>
        <textarea maxlength="5000" 
            rows="2"
            name="name"
            className="span8" 
            onChange={this.setEventState} >
            </textarea>
        </div>
                                                <img id="image-event" src="https://photo2.tinhte.vn/data/attachment-files/2019/02/4566127_cover_home_Galaxy_S10_dien_thoai_trung_quoc.jpg" alt="" />
                                            </div>
                                        </aside>
                                    </div>

                                    <div className="span3 flyRight">
                                        
                                        <div className="row">
                                            <div className="span3">
                                            
                                            <div className="about-author span3" id="table-info">

                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </article>
        </article>
        
    </div>
    
</div>
</section>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        current_user: state.current_user,
    };
}

export default connect(mapStateToProps)(NewGroup);