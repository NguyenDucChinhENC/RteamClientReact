import React from 'react';
import { connect } from 'react-redux';
import { getEvent, leaveEvent, updateEvent, addAdminEvent } from '../service/event.service';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { toast, ToastContainer } from 'react-toastify';

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            member_joined: [],
            list_admin: []
        }
    }

    setEventState = (event) => {

        let field = event.target.name;
        let value = event.target.value;
        this.state.event[field] = value;
        this.setState({ event: this.state.event });
    }

    componentWillReceiveProps(NextProps) {
        if (NextProps.current_user) {
            let id = this.props.match.params.id;
            getEvent(NextProps.current_user, id, this.getEventSuccess.bind(this));
        }
    }

    getEventSuccess(value) {
        if (value.event.admin) {
            this.state.event = value.event;
            this.state.event.time = this.dateTime(this.state.event.time);
            this.state.event.registration_deadline = this.dateTime(this.state.event.registration_deadline);
            this.setState({
                event: this.state.event,
                member_joined: this.state.event.member_joined,
                list_admin: this.state.event.list_admin
            })
        } else {
            this.props.history.push('/')
        }
    }

    dateTime = (date) => {
        return date = new Date(date).toJSON().slice(0, 10);
    }

    onClickSave() {
        updateEvent(this.props.current_user, this.state.event.id, this.state.event, this.onSaveSuccess.bind(this));
    }

    onSaveSuccess() {
        toast.success("Update Success")
    }

    onClickAddAdmin(user_id, index) {
        addAdminEvent(this.props.current_user, user_id, this.state.event.id, this.addAdminSuccess.bind(this, index));
    }

    addAdminSuccess(index) {
        this.state.list_admin = [...this.state.list_admin, this.state.member_joined[index]];
        this.setState({ list_admin: this.state.list_admin })
    }

    renderListMembers() {
        return (
            this.state.member_joined.map((member, i) => {
                return (
                    <tr>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {member.name}
                        </td>
                        <td>
                            {member.email}
                        </td>
                        <td>
                            {this.dateTime(member.birthday)}
                        </td>
                        <td>
                            {member.number_phone}
                        </td>
                        <td>
                            {member.address}
                        </td>
                        <td>
                            {member.link_facebook}
                        </td>
                        <td>
                            <a onClick={this.onClickAddAdmin.bind(this, member.id, i)} className="btn btn-mini btn-theme margin-button">Delete</a>
                            <a className="btn btn-mini btn-theme margin-button">Delete</a>
                        </td>
                    </tr>
                )
            })
        )


    }

    renderListAdmins() {
        return (
            this.state.list_admin.map((member, i) => {
                return (
                    <tr>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {member.name}
                        </td>
                        <td>
                            {member.email}
                        </td>
                        <td>
                            {this.dateTime(member.birthday)}
                        </td>
                        <td>
                            {member.number_phone}
                        </td>
                        <td>
                            {member.address}
                        </td>
                        <td>
                            {member.link_facebook}
                        </td>
                        <td>
                            <a className="btn btn-mini btn-theme margin-button">Delete</a>
                        </td>
                    </tr>
                )
            })
        )


    }
    render() {
        return (
            <div className="container">
                <ToastContainer />
                <br></br>
                <Tabs>
                    <TabList>
                        <Tab>Member Manager</Tab>
                        <Tab>Information Manager</Tab>
                    </TabList>
                    <TabPanel>
                        <div class="span6">
                            <h4 class="title"><strong>Admins</strong> - list of people registered to participate<span></span></h4>

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Birthday</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Link Fb</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListAdmins()}
                                </tbody>
                            </table>
                            <h4 class="title"><strong>Members</strong> - list of people registered to participate<span></span></h4>

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Birthday</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Link Fb</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListMembers()}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="row">

                            <div className="span12">
                                <div className="post-image">
                                    <div className="post-heading">
                                        <h4 class="title"><strong>Update</strong> - Event Information<span></span></h4>
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
                                                value={this.state.event.name}
                                                onChange={this.setEventState} >
                                            </textarea>
                                        </div>
                                        <div className="span3 control-group">
                                            <label>Address</label>
                                            <input type="text"
                                                name="location"
                                                maxlength="100"
                                                className="span3"
                                                value={this.state.event.location}
                                                onChange={this.setEventState} />
                                        </div>
                                        <div className="span3 control-group">
                                            <label>Quantity</label>
                                            <input type="text"
                                                name="quantity"
                                                maxlength="100"
                                                className="span3"
                                                value={this.state.event.quantity}
                                                onChange={this.setEventState} />
                                        </div>
                                        <div className="span3 control-group">
                                            <label>Time</label>
                                            <input type="date"
                                                name="time"
                                                maxlength="100"
                                                className="span3"
                                                value={this.state.event.time}
                                                onChange={this.setEventState} />
                                        </div>
                                        <div className="span3 control-group">
                                            <label>Registration deadline</label>
                                            <input type="date"
                                                name="registration_deadline"
                                                maxlength="100"
                                                className="span3"
                                                value={this.state.event.registration_deadline}
                                                onChange={this.setEventState} />
                                        </div>
                                        <div className="span12 control-group">
                                            <label>Information</label>
                                            <textarea maxlength="5000"
                                                name="infor"
                                                rows="7"
                                                className="span12"
                                                value={this.state.event.infor}
                                                onChange={this.setEventState}>
                                            </textarea>
                                        </div>
                                        {/* <input type="file" id="my-file" name="photo" onChange={(e)=> {this.previewFile(e,this.setPhotoField)}}></input> */}
                                        {/* <div className="tab-pane span9" id="Tabs-Ketiga">
                                            <div className="col-md-12">
                                                <div className="form-group files">
                                                    <label>Upload Photo Event </label>
                                                    <input type="file" id="my-file" name="photo" onChange={(e) => { this.previewFile(e, this.setPhotoField) }} className="form-control" multiple="" />
                                                </div>

                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <a href="#" className="btn btn-medium btn-danger btn-rounded pull-right" onClick={this.onClickSave.bind(this)}>Submit</a>

                                <div className="post-entry">
                                    <p>
                                        See event information below ...
    </p>
                                </div>
                            </div>


                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current_user: state.current_user,
    };
}

export default connect(mapStateToProps)(EditEvent);