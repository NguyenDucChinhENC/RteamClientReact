import React from 'react';
import { connect } from 'react-redux';
import { getEvent, joinEvent, leaveEvent } from '../service/event.service';
import { IMG_URL } from '../../constan';
import * as js from '../../assets/js/custom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            owner: {
                name: null
            }
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
        this.setState({ event: this.state.event, owner: this.state.event.owner });
    }

    onClickJoin() {
        joinEvent(this.props.current_user, this.state.event.id, this.joinSuccess.bind(this))
    }

    joinSuccess(value) {
        this.state.event.member = joinEvent.id;
        this.setState({ event: this.state.event });
    }

    onClickLeave() {
        leaveEvent(this.props.current_user, this.state.event.member, this.leaveSuccess.bind(this));
    }

    leaveSuccess() {
        this.state.event.member = false;
        this.setState({ event: this.state.event });
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

    render() {
        return (
            <div>
                <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
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



                            </div>
                            <div className="span6">

                                <h4>Accordion</h4>
                                <div className="accordion" id="accordion2">
                                    <div className="accordion-group">
                                        <div className="accordion-heading">
                                            <a className="accordion-toggle active" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
                                                <i className="icon-minus"></i> Collapsible Group Item #1 </a>
                                        </div>
                                        <div id="collapseOne" className="accordion-body collapse in">
                                            <div className="accordion-inner">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                                farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
                                        </div>
                                    </div>
                                    <div className="accordion-group">
                                        <div className="accordion-heading">
                                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                                                <i className="icon-plus"></i> Collapsible Group Item #2 </a>
                                        </div>
                                        <div id="collapseTwo" className="accordion-body collapse">
                                            <div className="accordion-inner">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                                farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
                                        </div>
                                    </div>
                                    <div className="accordion-group">
                                        <div className="accordion-heading">
                                            <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                                                <i className="icon-plus"></i> Collapsible Group Item #3 </a>
                                        </div>
                                        <div id="collapseThree" className="accordion-body collapse">
                                            <div className="accordion-inner">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                                                on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                                farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                </div>
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