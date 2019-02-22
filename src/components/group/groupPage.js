import React from 'react';
import { connect } from 'react-redux';
import { getGroup, leaveGroup, joinGroup } from '../service/group.service';
import { IMG_URL } from '../../constan';
import ListEvent from './listEvent';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {},
            membered: false,
            accept: false,
            cover: null,
            id_membered_group: null,
            events: []
        }
    }
    componentWillReceiveProps(NextProps) {
        if (NextProps.current_user) {
            let id = this.props.match.params.id;
            getGroup(NextProps.current_user, id, this.getGroupSuccess.bind(this));
        }
    }

    getGroupSuccess(value) {
        this.state.group = value.group;
        this.setState({
            group: this.state.group,
            membered: value.membered,
            accept: value.accept,
            events: value.events
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
    }

    onClickLeaveGroup() {
        debugger;
        leaveGroup(this.props.current_user, this.state.id_membered_group, this.leaveGroupSuccess.bind(this));
    }

    leaveGroupSuccess(value) {
        this.setState({
            membered: false,
            accept: false,
            id_membered_group: 0
        })

    }

    onClickJoinGroup(){
        joinGroup(this.props.current_user, this.state.group.id, this.joinGroupSuccess.bind(this))
    }

    joinGroupSuccess(value){
        this.setState({
            membered: false,
            accept: true,
            id_membered_group: value.group.id
        })
    }


    renderButtonMember = () => {
        if (this.state.membered) {
            return (
                <div>
                    <div className="btn-group  dropdown show-on-hover">
                        <button type="button" className="btn btn-danger btn-rounded" data-toggle="dropdown">
                            Joined <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Something else here</a></li>
                            <li className="divider"></li>
                            <li><a onClick={this.onClickLeaveGroup.bind(this)}>Leave Group</a></li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            if (this.state.accept){
                return (
                    <div className="btn-group  dropdown show-on-hover">
                        <button type="button" className="btn btn-danger btn-rounded" data-toggle="dropdown">
                        Waitting Join Group <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Something else here</a></li>
                            <li className="divider"></li>
                            <li><a onClick={this.onClickLeaveGroup.bind(this)}>Leave Group</a></li>
                        </ul>
                    </div>
                )
            } else {
                return (
                    <button type="button" onClick={this.onClickJoinGroup.bind(this)} className="btn btn-danger btn-rounded" data-toggle="dropdown">
                            Join Group
                        </button>
                )
            }
            
        }
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
                                                <img id="image-group" className="img-group" src={this.state.cover} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <article>
                                    <div className="row preview-event">
                                        <div className="span8">
                                            <br></br><br></br><br></br><br></br>
                                            <div className="meta-post">
                                                <aside className="left-sidebar">
                                                    <div className="post-heading">
                                                        <h3><a>{this.state.group.name}</a></h3>
                                                    </div>
                                                    < ListEvent events={this.state.events}/>
                                                </aside>
                                            </div>

                                        </div>
                                        <div className="span3 flyRight">
                                            <br></br><br></br><br></br><br></br>
                                            {this.renderButtonMember()}
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

export default connect(mapStateToProps)(Group);