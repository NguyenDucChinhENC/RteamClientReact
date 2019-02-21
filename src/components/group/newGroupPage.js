import React from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../service/group.service';

class NewGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            group: {}
        }    
    }

    setGroupState = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.state.group[field] = value;
        this.setState({group: this.state.group});
    }

    previewFile(){
        let preview = document.querySelector('#image-group');
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader;

        reader.onloadend = this.setCoverField.bind(this, reader, preview)

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    setCoverField(reader, preview) {
        preview.src = reader.result;
        this.state.group.cover = reader.result;
        this.setState({ group: this.state.group });
    }

    onClickSubmit(){
        createGroup(this.props.current_user,this.state.group)
    }

    render() {
        return (
            <div>
                <section id="content">

                    <div className="container">
                        <div className="row">
                            <article>
                                <div className="row preview-event">
                                    <div className="span12 cover-group">
                                        <div className="post-image">
                                            <div className="crop-div">
                                                <img id="image-group" className="img-group" src="https://photo2.tinhte.vn/data/attachment-files/2019/02/4566127_cover_home_Galaxy_S10_dien_thoai_trung_quoc.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <article>
                                    <div className="row preview-event">
                                        <div className="span8">
                                            <div className="row">
                                                <div className="span8">
                                                    <div className="meta-post">
                                                    </div>
                                                    <div className="post-entry">
                                                        <p>
                                                            See event information below ...
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="meta-post">
                                            <aside className="left-sidebar">
                                                <div className="post-image">
                                                    <div className="post-heading">
                                                    </div>
                                                    <label>Name (required)</label>
                                                    <textarea maxlength="5000"
                                                        rows="2"
                                                        name="name"
                                                        className="span7"
                                                        onChange={this.setGroupState} >
                                                    </textarea>
                                                </div>
                                                <div className="post-image">
                                                    <div className="post-heading">
                                                    </div>
                                                    <label>Descriptions (required)</label>
                                                    <textarea maxlength="5000"
                                                        rows="8"
                                                        name="description"
                                                        className="span7"
                                                        onChange={this.setGroupState} >
                                                    </textarea>
                                                </div>
                                                <div className=" span4" id="Tabs-Ketiga">
                                                <div className="col-md-6">
                                                    <div className="form-group ">
                                                        <label>Upload Photo Event </label>
                                                        <input type="file" id="my-file" name="photo" onChange={(e) => { this.previewFile(e, this.setCoverField) }} className="form-control" multiple="" />
                                                    </div>

                                                </div>
                                            </div>
                                            </aside>
                                            </div>
                                    <a className="btn btn-medium btn-danger btn-rounded pull-right" onClick={this.onClickSubmit.bind(this)}>Submit</a>

                                            <aside className="left-sidebar">
                                                
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

function mapStateToProps(state, ownProps) {
    return {
        current_user: state.current_user,
    };
}

export default connect(mapStateToProps)(NewGroup);