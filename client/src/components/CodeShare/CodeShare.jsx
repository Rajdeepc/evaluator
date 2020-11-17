import React from "react";
import Pusher from "pusher-js";
import "./codeshare.css";
import DataCallApi from "../../utils/api";

class CodeShare extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.uniqueKey;
    this.state = {
      shareTxt: "",
    };
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentDidMount() {
    const pusher = new Pusher("c43c5ce3243819bb058e", {
      cluster: "mt1",
    });

    const getEditor = document.getElementById("text-editor");
    const channel = pusher.subscribe(this.id);

    channel.bind("message", (html) => {
      getEditor.innerHTML = html;
    });
  }

  triggerChange(event) {
    this.setState(
      {
        shareTxt: event.target.value,
      },
      () => {
        const payload = {
          message: this.state.shareTxt,
          uniqueId: this.id,
        };

        DataCallApi.pusherMessage(payload).then((response) => {
          console.log(response);
        });
      }
    );
  }

  render() {
    return (
      <div className="share-code">
         <div className="doc">
        <header>
          <div className="row">
            <div className="col-md-6 text-left"><h3>Online Code Share Room</h3></div>
            <div className="col-md-6 text-right"><button className="btn btn-danger">End Session</button></div>
          </div>
        </header>
       
          <textarea
            placeholder="// Start typing your code here."
            id="text-editor"
            className="language-javascript"
            value={this.state.shareTxt}
            onChange={this.triggerChange}
            padding={10}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default CodeShare;
