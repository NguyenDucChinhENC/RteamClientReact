import React from 'react';

class ListEvent extends React.Component {

    event = (events) => {
        debugger;
        return(
        events.map((event,i) => {
            return (
            <article>
            <div className="row">

              <div className="span8">
                <div className="post-quote">
                  <div className="post-heading">
                    <h3><a href="#">Nice example of quote post format below</a></h3>
                  </div>


                </div>
                <div className="meta-post">
                  <ul>
                    <li><i className="icon-quote-left"></i></li>
                    <li>By <a href="#" className="author">Admin</a></li>
                    <li>On <a href="#" className="date">10 Jun, 2013</a></li>
                    <li>Tags: <a href="#">Design</a>, <a href="#">Blog</a></li>
                  </ul>
                </div>
                <div className="post-entry">
                  <blockquote>
                    Lorem ipsum dolor sit amet, ei quod constituto qui. Summo labores expetendis ad quo, lorem luptatum et vis. No qui vidisse signiferumque...
                  </blockquote>
                  <a href="#" className="readmore">Read more <i className="icon-angle-right"></i></a>
                </div>

              </div>
            </div>
          </article>
            )
        })
        )
               
    } 

    render(){
        return (
            <div>
            {this.event(this.props.events)}
            </div>
        )
    }
}

export default ListEvent;