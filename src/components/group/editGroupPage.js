import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getGroup, updateGroup, acceptMember, denyGroup } from '../service/group.service';
import { browserHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {},
            membered: false,
            accept: false,
            cover: null,
            id_membered_group: null,
            events: [],
            member_waiting: [],
            list_membered: []
        }
    }

    componentWillReceiveProps(NextProps) {
        if (NextProps.current_user) {
            let id = this.props.match.params.id;
            getGroup(NextProps.current_user, id, this.getGroupSuccess.bind(this));
        }
    }

    getGroupSuccess(value) {
        if (value.admin) {
            this.state.group = value.group;
            this.setState({
                group: this.state.group,
                membered: value.membered,
                accept: value.accept,
                events: value.events,
                member_waiting: value.member_waiting,
                list_membered: value.list_membered
            })

            if (value.group.cover != null) {
                this.setState({ cover: value.group.cover.url })
            } else {
                this.setState({ cover: null })
            }
            if (value.id_membered_group != null) {
                this.setState({ id_membered_group: value.id_membered_group })
            } else {
                this.setState({ id_membered_group: null })
            }
        } else {
            this.props.history.push('/')
        }
    }

    renderListWaiting = (value) => {
        return (
            value.map((member, i) => {
                return (
                    <tr>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {member.member.name}
                        </td>
                        <td>
                            <a onClick={this.onClickAccept.bind(this, member.id, i)} className="btn btn-mini btn-primary">Accept</a>
                        </td>
                        <td>
                            <a onClick={this.onClickDeny.bind(this, member.id)} className="btn btn-mini btn-primary">Deny</a>
                        </td>
                    </tr>
                )
            })
        )
    }

    renderListMember = (value) => {
        return (
            value.map((member, i) => {
                return (
                    <tr>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {member.member.name}
                        </td>
                        <td>
                            {/* <a onClick={this.onClickAccept.bind(this, member.id)} className="btn btn-mini btn-primary">Accept</a> */}
                        </td>
                        <td>
                        <a onClick={this.onClickRemove.bind(this, member.id)} className="btn btn-mini btn-primary">Remote</a>
                        </td>
                    </tr>
                )
            })
        )
    }

    onSave() {
        updateGroup(this.props.current_user, this.state.group, this.updateSuccess.bind(this));
    }

    updateSuccess = (value) => {
        toast.success(value + " Sucdess!")
    }

    acceptSuccess = (index) => {
        this.addMember(index);
        this.removeWaiting(index);
        toast.success("Accept Sucdess!")
    }

    denySuccess = (index) => {
        this.removeWaiting(index);
        toast.success("Deny Sucdess!")
    }

    removeSucess = (index) => {
        var list_membered = [...this.state.list_membered];
        list_membered.splice(index, 1);
        this.setState({ list_membered: list_membered });
        toast.success("Remove Sucdess!")
    }

    removeWaiting = (index) => {
        var member_waiting = [...this.state.member_waiting];
        member_waiting.splice(index, 1);
        this.setState({ member_waiting: member_waiting });
    }

    addMember = (index) => {
        var list_membered = [...this.state.list_membered];
        list_membered.push(this.state.member_waiting[index]);
        this.setState({ list_membered: list_membered });
    }

    setGroupState = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        this.state.group[field] = value;
        this.setState({ group: this.state.group });
    }

    onClickAccept(id, index) {
        acceptMember(this.props.current_user, id, this.acceptSuccess.bind(this, index))
    }

    onClickDeny(id, index) {
        denyGroup(this.props.current_user, id, this.denySuccess.bind(this, index))
    }

    onClickRemove(id,index){
        denyGroup(this.props.current_user, id, this.removeSucess.bind(this, index))
    }



    render() {
        return (
            <section id="content">
                <ToastContainer />
                <div className="container">
                    <div className="row">
                        <h2 className="title"><strong>Update</strong> - information group.<span></span></h2>
                        <div className="span4">
                            <aside className="left-sidebar">
                            </aside>
                        </div>
                        <div class="span8">
                            <article>
                                <div class="card">
                                    <div class="box">
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
                                                        value={this.state.group.name}
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
                                                        value={this.state.group.description}
                                                        onChange={this.setGroupState} >
                                                    </textarea>
                                                </div>
                                            </aside>
                                        </div>
                                        <a className="btn btn-medium btn-danger btn-rounded pull-right" onClick={this.onSave.bind(this)}>Submit</a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div className="row">
                        <div className="span6">
                            <h4 className="title"><strong>Waiting</strong> - member is waiting<span></span></h4>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                    </th>
                                        <th>
                                            First Name
                                    </th>
                                        <th>
                                            Last Name
                                    </th>
                                        <th>
                                            Username
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListWaiting(this.state.member_waiting)}
                                </tbody>
                            </table>
                        </div>
                        <div className="span6">
                            <h4 className="title"><strong>Member</strong> - Members list<span></span></h4>

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                    </th>
                                        <th>
                                            Name
                                    </th>
                                        <th>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListMember(this.state.list_membered)}
                                </tbody>
                            </table>
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

export default connect(mapStateToProps)(EditGroup);