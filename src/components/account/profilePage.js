import React, { Component } from 'react';
import { getProfile } from '../service/user.service';
import { connect } from 'react-redux';
import { IMG_URL } from '../../constan';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        getProfile(this.props.match.params.id, this.getUserSuccess.bind(this))
    }

    getUserSuccess(value){
        this.state.user = value;
        this.state.user.avatar = IMG_URL + value.avatar;
        this.setState({user: this.state.user});
        console.log(value);
    }

    renderButtonEditOrFollow(){
      if (this.props.current_user_status == true) {
        if (this.props.match.params.id == this.props.current_user.id){
          return (
            <a href={'/user/edit'} className="btn btn-warning btn-rounded">Edit profile</a>
          )
        } else {
          return (
            <a href="#" className="btn btn-warning btn-rounded">Follow</a>
          )
        }
      }
    }
    render() {
        return (
            <section id="content">

      <div className="container">
        <div className="row">

          <div className="span4">

            <aside className="left-sidebar">


              <div className="widget">
              <div className="row profile">
                <div className="col-md-3">
                  <div className="profile-sidebar">
                    <div className="profile-userpic">
                      <img src={this.state.user.avatar} className="img-responsive" alt="" />
                    </div>
                    <div className="profile-usertitle">
                      <div className="profile-usertitle-name">
                        {this.state.user.name}
                      </div>
                      <div className="profile-usertitle-job">
                        Developer
                      </div>
                    </div>
                    <div className="profile-userbuttons">
                      {this.renderButtonEditOrFollow()}
                    </div>
                  </div>
                </div>
   
              </div>
                {/* <h5 className="widgetheading">Categories</h5> */}

                <ul className="cat">
                  {/* <li><i className="icon-angle-right"></i> <a href="#">Web design</a><span> (20)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Online business</a><span> (11)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Marketing strategy</a><span> (9)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">Technology</a><span> (12)</span></li>
                  <li><i className="icon-angle-right"></i> <a href="#">About finance</a><span> (18)</span></li> */}
                </ul>
              </div>
              </aside>

         

          {/* <div class="span8">
            <article>
              <div class="row">

                <div class="span8">
                  <div class="post-image">
                    <div class="post-heading">
                      <h3><a href="#">This is an example of standard post format</a></h3>
                    </div>

                    <img src="img/dummies/blog/img1.jpg" alt="" />
                  </div>
                  <div class="meta-post">
                    <ul>
                      <li><i class="icon-file"></i></li>
                      <li>By <a href="#" class="author">Admin</a></li>
                      <li>On <a href="#" class="date">10 Jun, 2013</a></li>
                      <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div class="post-entry">
                    <p>
                      Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet, ocurreret pertinacia pri an. No mei nibh consectetuer, semper laoreet perfecto ad qui, est rebum nulla argumentum ei. Fierent adipisci iracundia est ei, usu timeam persius
                      ea. Usu ea justo malis, pri quando everti electram ei, ex homero omittam salutatus...
                    </p>
                    <a href="#" class="readmore">Read more <i class="icon-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </article>

            <article>
              <div class="row">

                <div class="span8">
                  <div class="post-slider">
                    <div class="post-heading">
                      <h3><a href="#">This is an example of slider post format</a></h3>
                    </div>
                    <div class="clear"></div>
                    <div class="flexslider">
                      <ul class="slides">
                        <li>
                          <img src="img/dummies/blog/img1.jpg" alt="" />
                        </li>
                        <li>
                          <img src="img/dummies/blog/img2.jpg" alt="" />
                        </li>
                        <li>
                          <img src="img/dummies/blog/img3.jpg" alt="" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="meta-post">
                    <ul>
                      <li><i class="icon-picture"></i></li>
                      <li>By <a href="#" class="author">Admin</a></li>
                      <li>On <a href="#" class="date">10 Jun, 2013</a></li>
                      <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div class="post-entry">
                    <p>
                      Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet, ocurreret pertinacia pri an. No mei nibh consectetuer, semper laoreet perfecto ad qui, est rebum nulla argumentum ei. Fierent adipisci iracundia est ei, usu timeam persius
                      ea. Usu ea justo malis, pri quando everti electram ei, ex homero omittam salutatus...
                    </p>
                    <a href="#" class="readmore">Read more <i class="icon-angle-right"></i></a>
                  </div>

                </div>
              </div>
            </article>


            <article>
              <div class="row">

                <div class="span8">
                  <div class="post-quote">
                    <div class="post-heading">
                      <h3><a href="#">Nice example of quote post format below</a></h3>
                    </div>


                  </div>
                  <div class="meta-post">
                    <ul>
                      <li><i class="icon-quote-left"></i></li>
                      <li>By <a href="#" class="author">Admin</a></li>
                      <li>On <a href="#" class="date">10 Jun, 2013</a></li>
                      <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div class="post-entry">
                    <blockquote>
                      Lorem ipsum dolor sit amet, ei quod constituto qui. Summo labores expetendis ad quo, lorem luptatum et vis. No qui vidisse signiferumque...
                    </blockquote>
                    <a href="#" class="readmore">Read more <i class="icon-angle-right"></i></a>
                  </div>

                </div>
              </div>
            </article>

            <article>
              <div class="row">

                <div class="span8">
                  <div class="post-video">
                    <div class="post-heading">
                      <h3><a href="#">Amazing video post format here</a></h3>
                    </div>
                    <div class="video-container">
                      <iframe src="http://player.vimeo.com/video/30585464?title=0&amp;byline=0">			</iframe>
                    </div>
                  </div>
                  <div class="meta-post">
                    <ul>
                      <li><i class="icon-facetime-video"></i></li>
                      <li>By <a href="#" class="author">Admin</a></li>
                      <li>On <a href="#" class="date">10 Jun, 2013</a></li>
                      <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div class="post-entry">
                    <p>
                      Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet, ocurreret pertinacia pri an. No mei nibh consectetuer, semper laoreet perfecto ad qui, est rebum nulla argumentum ei. Fierent adipisci iracundia est ei, usu timeam persius
                      ea. Usu ea justo malis, pri quando everti electram ei, ex homero omittam salutatus...
                    </p>
                    <a href="#" class="readmore">Read more <i class="icon-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </article>


            <article>
              <div class="row">

                <div class="span8">
                  <div class="post-link">
                    <div class="post-heading">
                      <h3><a href="http://iweb-studio.com">Example of link post format</a></h3>
                    </div>
                  </div>
                  <div class="meta-post">
                    <ul>
                      <li><i class="icon-link"></i></li>
                      <li>By <a href="#" class="author">Admin</a></li>
                      <li>On <a href="#" class="date">10 Jun, 2013</a></li>
                      <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                    </ul>
                  </div>
                  <div class="post-entry">
                    <p>
                      Qui ut ceteros comprehensam. Cu eos sale sanctus eligendi, id ius elitr saperet, ocurreret pertinacia pri an. No mei nibh consectetuer, semper laoreet perfecto ad qui, est rebum nulla argumentum ei. Fierent adipisci iracundia est ei, usu timeam persius
                      ea. Usu ea justo malis, pri quando everti electram ei, ex homero omittam salutatus...
                    </p>
                    <a href="#" class="readmore">Read more <i class="icon-angle-right"></i></a>
                  </div>
                </div>
              </div>
            </article>

            <div id="pagination">
              <span class="all">Page 1 of 3</span>
              <span class="current">1</span>
              <a href="#" class="inactive">2</a>
              <a href="#" class="inactive">3</a>
            </div>
          </div>
        </div> */}
      </div>
      </div>
      </div>
    </section>
        )
    }
}

function mapStateToProps(state, ownProps){
  return{
      current_user: state.current_user,
      current_user_status: state.current_user_status
  };
}

export default connect(mapStateToProps)(Profile);
