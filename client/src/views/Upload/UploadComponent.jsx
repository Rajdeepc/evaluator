import React, { Component } from "react";
import {
  Button,
  Form,
  Col,
  Toast,
  Alert,
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "./upload.css";
import "./react-draft.css";
import styled from "styled-components";
import { levels } from "../../utils/constants";
import TopicSelector from "../../common-components/TopicSelector/TopicSelector";
// import memoize from "memoize-one";

/** styles */
const EditorStyle = styled.div`
  border-top: 0px;
  border-radius: 0.25rem;
  min-height: 20em;
  background: #fff;
  border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: #dee2e6;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px 0px;
  button {
    border-radius: 6px;
    padding: 16px 50px;
    font-size: 18px;
    line-height: 17px;
    text-transform: uppercase;
    transition: all 0.2s ease-out;
    margin-left: 10px;
  }
  .submit {
    background:#897FC8
  }
`;

const PreviewTabs = styled.div`
  width: 100%;
  .rdw-editor-toolbar {
    border: 0px;
  }
  .nav-tabs {
    .nav-item.nav-link {
      color: #ccc;
      &.active {
        color: #000;
      }
    }
  }
  .tab-content {
    padding: 0;
    min-height: 200px;
    height: auto;
    .preview {
      padding:1em
    }
  }

`;

const CustomLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

export default class UploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      topicSelectValue: "",
      category: "",
      question: "",
      signInUser: "",
      uploadobjState: this.props.uploadobjState,
      uploadSuccessFul: false,
      author_name: "",
      email: "",
      userPic: "",
      redirect: false,
      newPostDataSuccess: null,
      showErrorAlert: false,
      difficulty: "",
      showToast:false
    };
  }

  componentDidMount() {
    this.getUserDetailsFromSessionStorage();
  }

  componentDidUpdate(){
    console.log('I am updated')
  }


  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.uploadobjState.updateSuccess){
      this.setState({
        showToast: nextProps.uploadobjState.updateSuccess
      })
    }
  }



  getUserDetailsFromSessionStorage = () => {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    if (data) {
      this.setState({
        email: data ? data.email : "",
        author_name: data ? data.username : "",
      });
    }
  };

  getTodayDate = () => {
    let newDate = new Date();
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate();
    let yyyy = newDate.getFullYear();
    let date = mm + "/" + dd + "/" + yyyy;
    return date;
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    console.log("editor value", this.state.editorState);
  };

  topicSelect = (e) => {
    this.setState({
      topicSelectValue: e.target.value,
    });
  };

  subTopicSelect = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleChangeTitle = (e) => {
    this.setState({
      question: e.target.value,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      author_name: e.target.value,
    });
  };
  /**
   * @method validateFormFields
   */

  validateFormFields = () => {
    const { topicSelectValue, category, question, difficulty, editorState,author_name } = this.state;
    if (topicSelectValue && category && difficulty && question && editorState && author_name) {
      return true;
    }
    return false;
  };

  /**
   * @method handleSubmit
   */

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      topicSelectValue,
      category,
      question,
      email,
      difficulty,
      author_name,
    } = this.state;
    const validateForm = this.validateFormFields();
    if (!validateForm) {
      this.setState({
        showErrorAlert: true,
      });
      return;
    }
    const uploadObj = {
      topicSelectValue,
      category,
      question,
      email,
      difficulty,
      author_name,
      editorValue: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      ),
      today_date: this.getTodayDate(),
    };
    this.setState({
      showToast: false
    },() => {
      this.props.submitFormForUpload(uploadObj);
    })
    
    this.clearFields();
  };

  logout = () => {
    //this.props.logOutSession()
    sessionStorage.clear();
    this.setState({
      newPostDataSuccess: false,
    });
  };

  getProfileDetails = (profObj) => {
    console.log("profObj" + JSON.stringify(profObj));
    this.setState(
      {
        email: profObj.email,
      },
      () => {
        console.log("updated email" + this.state.email);
      }
    );
  };

  handleDismiss = () => this.setState({ showErrorAlert: false });

  clearFields = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
      question: "",
      difficulty: "",
      author_name:'',
      showToast:false
    });
  };

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  levelSelect = (e) => {
    this.setState({
      difficulty: e.target.value,
    });
  };

  getSelectedValues = (objValues) => {
    console.log(objValues);
    this.setState({
      topicSelectValue: objValues.selectedTopic,
      category: objValues.selectedCategory,
    });
  };

  render() {
    const { editorState, author_name, question } = this.state;
    return (
      <div>

        <div className="upload-container">
          <Container>
            {/* <SocialSignOn {...this.props} /> */}

            <div className="text-center">
              <h3 className="upload-title">Upload Your Question</h3>
              <h4>
                To make sure we have the right type of data in the website, we
                might tweak your data a bit to align to the norms of the
                website.If you are not happy with the changes please feel free
                to contact via{" "}
                <a href="mailto:rajdchandra@deloitte.com">email</a>
              </h4>
            </div>

            <Form
              noValidate
              onSubmit={this.handleSubmit}
              className="upload-form"
            >
              <Form.Row>
                <Form.Group as={Col} md="6" className="uploadtopic">
                  <Form.Label>
                    <CustomLabel>Topic*</CustomLabel>
                  </Form.Label>
                  <TopicSelector selectedValues={this.getSelectedValues} />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="helpBuddyForm.difficultyLevel"
                >
                  <Form.Label>
                    <CustomLabel>Difficulty Level*</CustomLabel>
                  </Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={this.levelSelect}
                    value={this.state.difficulty}
                  >
                    <option selected value="default">
                      Select One Level
                    </option>
                    {levels.map((item) => {
                      return (
                        <option value={item.value} key={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                  {/* <p>Selected {this.state.topicSelectValue}</p> */}
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="helpBuddyForm.name">
                  <Form.Label>
                    <CustomLabel>Enter Your Name* </CustomLabel>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name Here..."
                    onChange={this.handleNameChange}
                    value={author_name}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="helpBuddyForm.titile">
                  <Form.Label>
                    <CustomLabel>Enter Question* </CustomLabel>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Question Here..."
                    rows="3"
                    onChange={this.handleChangeTitle}
                    value={question}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <PreviewTabs>
                  <Tabs
                    defaultActiveKey="scratchpad"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="scratchpad" title="Enter Answer">
                      <Form.Group controlId="helpBuddyForm.SubTopicName">
                        <EditorStyle>
                          <Editor
                            required
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        </EditorStyle>
                      </Form.Group>
                    </Tab>
                    <Tab eventKey="preview" title="Preview Changes">
                      <div className="preview"
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                          ),
                        }}
                      />
                    </Tab>
                  </Tabs>
                </PreviewTabs>
              </Form.Row>
              <ButtonContainer>
                <Button variant="light" onClick={this.clearFields}>
                  Clear
                </Button>
                <Button variant="success" type="submit" className="submit">
                  Submit
                </Button>
              </ButtonContainer>
            </Form>
            <Toast
              onClose={() => this.setState({showToast: false})}
              show={this.state.showToast}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="mr-auto">Upload SuccessFul.</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>
                Upload SuccessFul. Your Submission is in Review. Please check
                your profile for approval status. Thanks for contributing!!
              </Toast.Body>
            </Toast>
            {this.state.showErrorAlert === true ? (
              <Alert variant="danger" onClose={this.handleDismiss} dismissible>
                Please fill all the fields and resubmit
              </Alert>
            ) : (
              <div />
            )}
          </Container>
        </div>
      </div>
    );
  }
}
