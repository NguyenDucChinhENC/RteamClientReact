import React from 'react';
import { connect } from 'react-redux';
import { getEvent, joinEvent, leaveEvent } from '../service/event.service';
import { editComment, createComment, deleteComment } from '../service/comment.service';
import { IMG_URL } from '../../constan';
import * as js from '../../assets/js/custom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { ToastContainer, toast } from 'react-toastify';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            owner: {
                name: null
            },
            comments: [],
            member_joined: []
        }
    }

    showImage(url) {
        return IMG_URL + url;
    }
    componentWillReceiveProps(NextProps) {
        if (NextProps.current_user) {
            let id = this.props.match.params.id;
            getEvent(NextProps.current_user, id, this.getEventSuccess.bind(this));
        }
    }
    getEventSuccess = (value) => {
        this.state.event = value.event;
        this.setState({ event: this.state.event, owner: this.state.event.owner, comments: this.state.event.comments, member_joined: this.state.event.member_joined });
    }

    onClickJoin() {
        debugger
        joinEvent(this.props.current_user, this.state.event.id, this.joinSuccess.bind(this))
    }

    joinSuccess(value) {
        debugger
        this.state.event.member = value.id;
        this.setState({ event: this.state.event });
    }

    onClickLeave() {
        debugger
        leaveEvent(this.props.current_user, this.state.event.member, this.leaveSuccess.bind(this));
    }

    leaveSuccess() {
        this.state.event.member = false;
        this.setState({ event: this.state.event });
    }

    showFormEdit(id) {
        var comment = document.getElementById('form-' + id);
        let value = document.getElementById('comment-' + id).innerHTML;
        var input = document.getElementById('input-comment-' + id);
        input.value = value;
        comment.style.display = "block";
    }

    onClickSave(id_comment, id) {
        var comment = document.getElementById('input-comment-' + id);
        editComment(this.props.current_user, id_comment, comment.value, this.editSuccess.bind(this, id))
    }

    editSuccess(id, value) {
        var comment = document.getElementById('form-' + id);
        this.state.event.comments[id].body = value;
        this.setState({ event: this.state.event });
        toast.success("Update Sucdess!")
        comment.style.display = "none";
    }

    onClickSubmitComment() {
        let comment = document.getElementById('input-new-comment');
        createComment(this.props.current_user, this.state.event.id, comment.value, this.submitCommentSuccess.bind(this))
    }

    submitCommentSuccess(value) {
        let comments = this.state.event.comments
        let input = document.getElementById('input-new-comment');
        comments.push(value.object);
        this.state.event.comments = comments;
        this.state.event.comments[comments.length - 1].user_name = this.props.current_user.name;
        this.state.event.comments[comments.length - 1].time_ago = "1 minute";
        this.setState({ event: this.state.event });
        input.value = "";
        toast.success("New Comment Complete")
    }

    deleteComment(comment_id, i) {
        deleteComment(this.props.current_user, comment_id, this.deleteCommentSuccess.bind(this, i));
    }

    deleteCommentSuccess(i) {
        let comments = [...this.state.comments];
        comments.splice(i, 1);
        this.state.comments = comments;
        this.setState({ comments: this.state.comments })
        toast.warning("Delete Comment")
    }

    hideNumberPhone = (numberPhone) =>{
        if (numberPhone != null){
        let phone = numberPhone.toString();
        if (phone.length > 2){
        return  phone.substring(0,phone.length - 2) + '**';
        }}else {
            return numberPhone;
        }
    }

    hideAddress = (address) =>{
        if (address && address.length >= 9){
        return '**********' + address.substring(8);
        } else {
            return address;
        }
    }


    renderButtonMember = () => {
        if (this.state.event.member) {
            return (
                <div>
                    <div className="btn-group  dropdown show-on-hover">
                        <button type="button" className="btn btn-danger btn-rounded" data-toggle="dropdown">
                            Joined Event <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Something else here</a></li>
                            <li className="divider"></li>
                            <li href="#" onClick={this.onClickLeave.bind(this)}><a>Leave Event</a></li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="btn-group show-on-hover">
                    <button onClick={this.onClickJoin.bind(this)} type="button" className="btn btn-danger btn-rounded" data-toggle="dropdown">
                        Join Event
                    </button>

                </div>
            )

        }
    }

    renderButtonDelete = (comment, index) => {
        if (this.state.event.admin || this.props.current_user.id == comment.user_id) {
            return (
                <a onClick={this.deleteComment.bind(this, comment.id, index)} className="btn btn-mini btn-theme margin-button">Delete</a>
            )
        }
    }

    renderListComments() {
        return (
            this.state.comments.map((comment, i) => {
                return (
                    <div className="media">
                        <div className="media-body" >
                            <div className="media-content">
                                <h6></h6>
                                <p id={"comment-" + i}>{comment.body}</p>
                                {this.props.current_user.id == comment.user_id &&
                                    <a onClick={this.showFormEdit.bind(this, i)} className="btn btn-mini btn-theme margin-button">Edit</a>
                                }
                                {this.renderButtonDelete(comment, i)}
                                {}
                                <a href="#" className="align-right"><span>{"Comment " + comment.time_ago + "ago"}</span> by  {comment.user_name}</a>
                                <div className="margintop10 form-comment" id={"form-" + i}>
                                    <p>
                                        <textarea rows="4" className="input-block-level" placeholder="*Your comment here" id={"input-comment-" + i}></textarea>
                                        <button onClick={this.onClickSave.bind(this, comment.id, i)} className="btn btn-theme margintop10 pull-right" type="submit">Submit comment</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    renderListMembers() {
        return (
            this.state.member_joined.map((member, i) => {
                return (
                    <tr>
                        <td>
                            {i+1}
                        </td>
                        <td>
                            {member.name}
                        </td>
                        <td>
                            {this.hideNumberPhone(member.number_phone)}
                        </td>
                        <td>
                            {this.hideAddress(member.address)}
                        </td>
                    </tr>
                )
            })
        )

    }

    render() {
        return (
            <div>
                <ToastContainer />
                <section id="inner-headline">
                    <div className="container">
                        <div className="row">
                            <div className="span12">
                                <div className="inner-heading">
                                    <ul className="breadcrumb">
                                        <li><a href="index.html">Home</a> <i className="icon-angle-right"></i></li>
                                        <li><a href="#">Event</a> <i className="icon-angle-right"></i></li>
                                        <li className="active">{this.state.owner.name}</li>
                                    </ul>
                                    <h2><strong>{this.state.event.name}</strong></h2>
                                    <div className="pull-right">{this.renderButtonMember()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="content">
                    <div className="container">
                        <div className="row">
                            <div className="span12">
                                <article className="noborder">
                                    <div className="top-wrapper">
                                        <div className="post-heading">

                                        </div>
                                        <div className="portfolio-detail">
                                            <img src={this.showImage(this.state.event.photo)} alt="" />
                                        </div>
                                    </div>

                                    <p>
                                        {this.state.event.infor}</p>

                                </article>

                                <Tabs>
                                    <TabList>
                                        <Tab>Comments</Tab>
                                        <Tab>List Members</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <div>
                                            <div class="row" >
                                                <div class="span8">
                                                    <div className="comment-area">

                                                        <h4>{this.state.comments.length} Comments</h4>
                                                        {this.renderListComments()}
                                                        <div className="marginbot30"></div>
                                                        <h4>Leave your comment</h4>
                                                        <div className="row">
                                                            <div className="span8 margintop10">
                                                                <p>
                                                                    <textarea id="input-new-comment" rows="7" className="input-block-level" placeholder="*Your comment here"></textarea>
                                                                </p>
                                                                <p>
                                                                    <button onClick={this.onClickSubmitComment.bind(this)} className="btn btn-theme btn-medium margintop10">Submit comment</button>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div class="span6">
                                            <h4 class="title"><strong>Members</strong> - list of people registered to participate<span></span></h4>

                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Number Phone</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderListMembers()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </TabPanel>
                                </Tabs>

                            </div>
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

export default connect(mapStateToProps)(Event);