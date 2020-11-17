import React from "react";
import Pusher from "pusher-js";
import "./codeshare.css";
import DataCallApi from "../../utils/api";
import { PUSHER_CLUSTER, PUSHER_KEY } from "../../utils/constants";
import { Modal, Button } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";

class CodeShare extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.uniqueKey;
    this.state = {
      shareTxt: "",
      show: false,
      videoOn: false,
    };
    this.triggerChange = this.triggerChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.closeAndGoback = this.closeAndGoback.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.send = this.send.bind(this);
    this.streamCamVideo = this.streamCamVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.localStream = null;
  }

  componentDidMount() {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(this.id);

    channel.bind("client-message", (html) => {
      this.setState({
        shareTxt: html,
      });
    });
  }

  componentWillUnmount() {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(this.id);
    channel.unbind("client-message");
    this.stopVideo();
  }

  streamCamVideo() {
    this.setState(
      {
        videoOn: !this.state.videoOn,
      },
      () => {
        console.log(this.state.videoOn);
        var constraints = { audio: true, video: { width: 300, height: 200 } };
        const video = document.querySelector("video");
        if (this.state.videoOn) {
          video.style.display = 'block';
          //Start Web Came
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            //use WebCam
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
              this.localStream = stream;
              video.srcObject = stream;
              video.play();
            });
          }
        } else {
          this.stopVideo()
        }
      }
    );
  }

  stopVideo() {
    const video = document.querySelector("video");
   
    video.pause();
    video.src = "";
    video.srcObject = null;
    video.style.display = 'none';
    // As per new API stop all streams
    if (this.localStream)
      this.localStream.getTracks().forEach((track) => track.stop());
  }

  triggerChange(event) {
    this.setState(
      {
        shareTxt: event.target.value,
      },
      () => {
        this.send();
      }
    );
  }

  send() {
    const payload = {
      message: this.state.shareTxt,
      uniqueId: this.id,
    };
    DataCallApi.pusherMessage(payload).then((response) => {
      console.log(response);
    });
  }

  showModal() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  closeAndGoback() {
    this.setState(
      {
        show: false,
      },
      () => {
        this.props.history.push("/");
      }
    );
  }

  copyToClipboard() {
    console.log(this.refs.input);
    this.refs.input.select();
    document.execCommand("copy");
  }

  render() {
    return (
      <div className="share-code">
        <div className="doc">
          <header>
            <div className="row">
              <div className="col-md-6 text-left">
                <h3>Online Code Share Room</h3>
              </div>
              <div className="col-md-6 text-right">
                <span>
                  <button className="btn btn-danger" onClick={this.showModal}>
                    End Session
                  </button>
                </span>
              </div>
            </div>
          </header>
          <div className="sub-header">
            {" "}
            <span className="share-link">
              <span>
                Share link:{" "}
                <input
                  ref="input"
                  disabled
                  value={window.location.href}
                ></input>
              </span>
              <span>
                <Button variant="primary" onClick={this.copyToClipboard}>
                  Copy
                </Button>
              </span>
            </span>
          </div>
          <div id="video-container">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          <div className="enable-video">
            <img
              onClick={this.streamCamVideo}
              src={
                !this.state.videoOn
                  ? window.location.origin + "/assets/img/no-video.svg"
                  : window.location.origin + "/assets/img/video-camera.png"
              }
              alt="video"
            /> <b>{ this.state.videoOn ? 'On' : 'OFF'}</b>
          </div>

          <div className="text-center">
            <svg height="20" width="20" className="blinking">
              <circle cx="5" cy="5" r="5" fill="lightgreen" />
              Sorry, your browser does not support inline SVG.
            </svg>{" "}
            You session is live
          </div>
          <DebounceInput
            element="textarea"
            minLength={2}
            id="text-editor"
            value={this.state.shareTxt}
            debounceTimeout={300}
            onChange={this.triggerChange}
          />
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to end this session?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.closeAndGoback}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CodeShare;
