import React, { useState,useEffect } from "react";
import { Card, Accordion, Col, Row, Modal } from "react-bootstrap";
import "./topic.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { callActionToLike } from "../SelectorBar/selectorbar.action";
import GoogleLoginComponent from "../../common-components/GoogleLoginComponent/GoogleLoginComponent";



const QuestionAccordianWrapper = styled.div`
  .card {
    cursor: pointer;
    margin-bottom: 40px;
    overflow: visible;
    border: 0;
    background: transparent;
    .card-body {
      p span,
      ul li {
        font-size: 20px !important;
        font-family: "Roboto", sans-serif !important;
      }
    }
    .collapsing {
      transition: none;
    }
    .collapse {
      margin-top: 10px;
      background: #fff;
      width: 97%;
      margin-left: 3%;
    }
    &:first-of-type {
      border: 0;
    }
    .card-header {
      border-radius: 6px;
      background: #fff;
      padding: 0;
      color: #284d81;
      border: 1px solid #cecece;
    }
    .card-body {
      font-size: 18px;
      overflow-wrap: break-word;
      padding: 25px 30px 25px 50px;
    }
  }
  .accordian-active.accordion {
    .card-header {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
    }
    .collapse.show {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;

const QuestionTitle = styled.div`
  position: relative;

  font-size: 24px;
  line-height: 1.25em;
  padding: 25px 30px 25px 50px;

  i {
    position: absolute;
    left: -19px;
    top: 14px;
  }
`;

const ShowAnswer = styled.div`
  border-top: 1px solid #f1f1f1;
  height: 35px;
  padding: 7px 30px 7px 50px;
  span {
    margin: 0px 10px;
  }
  .author {
    color: #ccc;
    font-size: 12px;
    font-style: italic;
  }
`;

const LikeRibbon = styled.div`
  border-top: 1px solid #ecebeb;
  padding: 20px 0px;
  margin: 0px 30px;
  span.mr20 {
    margin-right: 20px;
  }
`;

const QuestionAccordian = (props) => {
  const [accordianSelected, setAccordianSelected] = useState(undefined);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  useEffect(() => {
    setShow(false);
  }, [props.loginUserState.loggedinStatus])



  const checkSelected = (e) => {
    console.log("checkselected" + e);
    setAccordianSelected(e);
  };

  const handleLike = (value) => {
    // check for login if login is there
    const emailIfFromSession =
      sessionStorage.getItem("userData") &&
      JSON.parse(sessionStorage.getItem("userData")).email;
    if (emailIfFromSession) {
      props.callActionToLike(value);
    } else {
      // pop up to let user login
      setShow(true)
    }
  };

  return (
    <QuestionAccordianWrapper>
      {props.data.map((item, i) => {
        return (
          <Accordion
            key={item.id}
            activeKey={item.id}
            onSelect={checkSelected}
            className={accordianSelected === i ? "accordian-active" : ""}
          >
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={i}>
                <QuestionTitle>
                  <i
                    className="fa fa-question-circle fa-2x"
                    aria-hidden="true"
                  ></i>
                  {item.question}
                </QuestionTitle>
                <ShowAnswer>
                  <Row>
                    <Col>
                      <i className="fa fa-comments-o" aria-hidden="true"></i>
                      <span>View the answer</span>
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Col>
                    <Col>
                      <div className="text-right">
                        <p className="author">
                          {" "}
                          Submitted by: {item.uploadedby}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </ShowAnswer>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={i} id={item.id}>
                <>
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </Card.Body>
                  <LikeRibbon>
                    <div className="text-right">
                      <span className="mr20">
                        <a
                          href="mailto:rajrock38@gmail.com?subject=Improving Answer"
                          className="link"
                        >
                          Improve answer
                        </a>
                      </span>
                      <span className="mr20">
                        <img
                          src={window.location.origin + "/assets/img/love.png"}
                          alt="love"
                          onClick={() => handleLike(item._id)}
                        />{" "}
                        <span className="count">{item.likes_count || 0}</span>
                      </span>
                    </div>
                  </LikeRibbon>
                </>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Sign In to Like</p>
          <GoogleLoginComponent />
        </Modal.Body>
      </Modal>

      
    </QuestionAccordianWrapper>
  );
};

const mapStateToProps = (state) => ({
  loginUserState: state.LoginReducer
});

const QuestionAccordianConnector = connect(mapStateToProps, {
  callActionToLike,
})(QuestionAccordian);

export default QuestionAccordianConnector;
