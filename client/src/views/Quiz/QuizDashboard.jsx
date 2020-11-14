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
    box-shadow: 0 1px 1px 0 rgba(159, 167, 194, 0.4);
    min-height: 140px;
    margin-bottom: 30px;
    &:hover{
      background: #4D5592;
    }
  }
  .card:hover .card-title h3{ color:#fff}
  .card-boxes{
    text-decoration:none
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
                    <Link className="card-boxes" to={`/startquiz/${item.id}`}
                    >
                      <Card id={item.id}>
                        <Card.Body>
                          <Card.Title>
                            <h3 className="dark">{item.name}</h3>
                          </Card.Title>
                          <Card.Text>
                            <div className="small light">{item.desc}</div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
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
