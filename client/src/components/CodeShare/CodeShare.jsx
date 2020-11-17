import React from "react";
import Pusher from "pusher-js";
import "./codeshare.css";
import DataCallApi from "../../utils/api";
import { PUSHER_CLUSTER , PUSHER_KEY } from '../../utils/constants';
import { Link } from "react-router-dom";




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
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
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
            <div className="col-md-6 text-right"><Link to='/' className="btn btn-danger">End Session</Link></div>
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
