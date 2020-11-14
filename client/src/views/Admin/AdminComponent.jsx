import React, { Component } from "react";
import { Row, Form, Col, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { getInReviewData, updateUploadStatus } from "./admin.action";
import { connect } from "react-redux";
import withLoader from "../../common-components/Loader/Loader";

const MyProfileWrapper = styled.div`
  width: 100%;
  padding: 1em 2em;
  background: #f0f0f0;
  min-height: calc(100vh - 40px);
  h4 {
    padding: 30px 0px;
  }
  .card {
    margin-bottom: 20px;
    .card-header {
      text-transform: capitalize;
      .uploaded {
        float: right;
        font-size: 14px;
        color: #7d7d7d;
      }
    }
  }
  .form-control:disabled,
  .form-control[readonly] {
    background-color: transparent;
    opacity: 1;
    border: 0;
    resize: none;
  }
  .question-body {
    font-size: 25px;
    color: #435b71;
    padding: 0;
  }
`;

const Heading = styled.div`
  font-size: 20px;
  color: #ccc;
  font-style: normal;
  margin-bottom: 10px;
`;
const ButtonRow = styled.div`
  margin-top: 20px;
  button {
    margin-right: 10px;
  }
`;
class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionValue: "",
      reviewData: [],
      editableIndex: undefined
    };
  }

  componentDidMount() {
    this.props.getInReviewData("InReview");
    this.props.setLoading(true);
  }

  getProfileDetails = () => {};

  updateItems = (id, status, question, answer) => {
    this.props.updateUploadStatus(id, status, question, answer);
    this.props.setLoading(true);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.getInReviewDataState !== nextProps.getInReviewDataState) {
      this.props.setLoading(false);
      this.setState({
        reviewData: nextProps.getInReviewDataState,
      });
    }
  }

  /**
   * @method handleChangeQuestion
   * @param {*} event
   * @param {*} id
   */
  handleChangeQuestion = (event, id) => {
    const { value } = event.target;
    const data = [...this.state.reviewData];
    const index = data.findIndex((obj) => obj._id === id);
    data[index].question = value;
    this.setState({ reviewData: data }, () => {
      console.log(this.state.reviewData);
    });
  };

  /**
   * @method handleChangeAnswer
   * @param {*} event
   * @param {*} id
   */
  handleChangeAnswer = (event, id) => {
    const { value } = event.target;
    const data = [...this.state.reviewData];
    const index = data.findIndex((obj) => obj._id === id);
    data[index].answer = value;
    this.setState({ reviewData: data }, () => {
      console.log(this.state.reviewData);
    });
  };

  editItem = (id) => {
    console.log(id);
    const data = [...this.state.reviewData];
    const index = data.findIndex((obj) => obj._id === id);
    this.setState(
      {
        editableIndex: index,
      },
      () => console.log(this.state.editableIndex)
    );
  };

  editAndSave = (id, question, status, answer) => {
    this.setState({
      editableIndex: undefined,
    });
  };



  renderItems = () => {
    const { reviewData } = this.state;
    return (
      <div>
        {reviewData.length ? (
          reviewData.map((item, i) => {
            return (
              <Card key={item._id}>
                <Card.Header>
                  Topic: {item.topic_name} - {item.category_name}{" "}
                  <span className="uploaded">
                    Uploaded By: {item.uploadedby}
                  </span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <Heading>Question</Heading>
                    <Form.Control
                      as="textarea"
                      className="question-body"
                      disabled={i === this.state.editableIndex ? false : true}
                      onChange={(event) =>
                        this.handleChangeQuestion(event, item._id)
                      }
                      value={item.question}
                    />
                  </Card.Title>
                  <Heading>Answer</Heading>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.answer,
                    }}
                  />

                  <ButtonRow>
                    <Row>
                      <Col>
                        {i !== this.state.editableIndex ? (
                          <Button
                            variant="primary"
                            onClick={() => this.editItem(item._id)}
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Edit
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() =>
                              this.editAndSave(
                                item._id,
                                item.question,
                                item.answer
                              )
                            }
                          >
                            <i class="fa fa-floppy-o" aria-hidden="true"></i>{" "}
                            Save
                          </Button>
                        )}
                        <Button
                          variant="success"
                          onClick={() =>
                            this.updateItems(
                              item._id,
                              "Approved",
                              item.question,
                              item.answer
                            )
                          }
                        >
                          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
                          Approve
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() =>
                            this.updateItems(
                              item._id,
                              "Rejected",
                              item.question,
                              item.answer
                            )
                          }
                        >
                          <i class="fa fa-times" aria-hidden="true"></i> Reject
                        </Button>
                      </Col>
                    </Row>
                  </ButtonRow>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <MyProfileWrapper>
          <Row>
            <Col>
              {this.state.reviewData.length > 0 && (
                <h4>
                  You have {this.state.reviewData.length} items to Review{" "}
                </h4>
              )}
              {this.state.reviewData.length === 0 && (
                <h4>No Items To Review. Sit back and Relax</h4>
              )}
            </Col>
          
          </Row>


          {this.renderItems()}
        </MyProfileWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getInReviewDataState: state.AdminReducer.allReviewItems,
});

const AdminComponentContainer = connect(mapStateToProps, {
  getInReviewData,
  updateUploadStatus,
})(AdminComponent);

export default withLoader(
  AdminComponentContainer,
  "Please wait while the data is loaded"
);
