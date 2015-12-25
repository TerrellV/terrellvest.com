import React from "react";
import ReactDOM from "react-dom";

// run client side javscript here....
import clientScript from "../onLoad.js";

// then if at certain page ... render the dom element
if (document.location.pathname === "/portfolio" ) {
  let App = React.createClass({
    getInitialState(){
      return {
        sliderLength: 65,
        left: 10
      }
    },
    handleClick: function(click){
      if(click === "showDev"){
        this.setState({
          sliderLength:29,
          left: 36
        });
      } else {
        this.setState({
          sliderLength:65,
          left: 10
        });
      }
    },
    render: function(){
      let styles = {
        position: "absolute",
        transition: "all 500ms ease-in-out",
        width: this.state.sliderLength,
        left: this.state.left +'vw',
        height: 3,
        top: 32
      }
      return(
        <div className={"subhead"}>
          <h1 className={"page-title-port"} onClick={this.handleClick}>Business</h1>
          <h1 className={"page-title-port"} onClick={this.handleClick.bind(this,"showDev")}>Web</h1>
          <span style={styles} id={"slider"}></span>
        </div>
      )
    }
  })

  ReactDOM.render( <App/>, document.getElementById('content') )
}
