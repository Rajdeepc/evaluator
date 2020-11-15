import React, { Component } from "react";
import { Jumbotron, Card, Row, Col, Button, Container } from "react-bootstrap";
import { quiz } from "../../utils/constants";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const QuizWrapper = styled.div`
  .jumbotron {
    padding: 4rem 2rem;
    background: #fff;
    img {
      height: 200px;
    }
  }
  .track-cards {
    > h3 {
      font-weight: lighter;
      margin-bottom: 50px;
      margin-top: 50px;
    }
    .all-topics {
      font-weight: 300;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        height: 5px;
        width: calc(100% - 130px);
        top: 8px;
        left: 130px;
        background-color: #e5e7e8;
      }
    }
  }
  .card {
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    min-height: 140px;
    margin-bottom: 30px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
    .coming-soon {
      position: absolute;
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      h4 {
        color: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        margin-top: -14px;
      }
    }
    .img-titile {
      height: 26px;
      margin-right: 10px;
      vertical-align: text-top;
    }
  }
  .card-boxes {
    text-decoration: none;
  }
`;

class QuizComponent extends Component {
  getSelectedValues = (objValues) => {
    console.log(objValues);
    // this.setState({
    //   topicSelectValue: objValues.selectedTopic,
    //   category: objValues.selectedCategory,
    // });
  };

  render() {
    return (
      <QuizWrapper>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Assessment</h1>
                <p>Select and choose any topic and take your assessment</p>
                <p>
                  <Button variant="primary">Learn more</Button>
                </p>
              </Col>
              <Col>
                <div className="text-right">
                  <img
                    src={window.location.origin + "/assets/img/allquiz.svg"}
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Container>
          <div className="track-cards">
            <h3>Programming Assessment Quiz</h3>
            <div className="all-topics medium-margin-bottom align-left">
              <span className="regular weight-600 caps dark">ALL TRACKS</span>
            </div>
            <Row>
              {(quiz || []).map((item) => {
                return (
                  <Col md="3" key={item.id}>
                    <Card id={item.id}>
                      {!item.id ? (
                        <div>
                          <div className="coming-soon">
                            <h4>Coming Soon...</h4>
                          </div>
                          <Card.Body>
                          <h4 className="dark">
                            <img
                              className="img-titile"
                              src={window.location.origin + item.img}
                              alt="alternate-image"
                            />
                            <span>{item.name}</span>
                          </h4>
                          <div className="small light">{item.desc}</div>
                          </Card.Body>
                        </div>
                      ) : (
                        <Link
                          className="card-boxes"
                          to={`/startquiz/${item.id}`}
                        >
                          <Card.Body>
                            <Card.Title>
                              <div>
                                <h4 className="dark">
                                  <img
                                    className="img-titile"
                                    src={window.location.origin + item.img}
                                    alt="alternate-image"
                                  />
                                  <span>{item.name}</span>
                                </h4>
                              </div>
                            </Card.Title>
                            <Card.Text>
                              <div className="small light">{item.desc}</div>
                            </Card.Text>
                          </Card.Body>
                        </Link>
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </QuizWrapper>
    );
  }
}

export default withRouter(QuizComponent);
