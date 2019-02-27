import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAllEvents} from '../service/event.service';

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
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
        this.setState({ events: this.state.events});
    }
    render() {
        return (
            <div>
            <h2>hihi</h2>
    </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        current_user: state.current_user,
    };
}

export default connect(mapStateToProps)(About);