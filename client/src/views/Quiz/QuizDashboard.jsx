import React, { Component } from "react";
import { Jumbotron, Card, Row, Col, Button, Container } from "react-bootstrap";
import { quiz } from "../../utils/constants";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { getLeaderBoardList } from "./quiz.action";
import { connect } from "react-redux";

const QuizWrapper = styled.div`
  .bg-white {
    background: #fff;
  }
  .bg-grey{
    background:#e6e6e6
  }
  padding: 0px 15px;
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

const HeroBanner = styled.div`
  padding: 40px 45px;
  background: white;
  .quiz-image {
    img {
      width: 100%;
    }
  }
`;

const LeaderBoard = styled.div`
  overflow: auto;
  max-height: 340px;
  padding-top: 16px;
  h3{
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
`;
const LeaderItem = styled.div`
  margin-bottom: 20px;
  background:#fff;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.11);
  border-radius:6px;
  padding: 8px;
  img{
    height: 50px;
    border-radius: 32px;
  }
  .email{
    font-size: 12px;
    margin-top: 4px;
  }
`;

class QuizComponent extends Component {
  componentDidMount() {
    this.props.getLeaderBoardList();
  }

  UNSAFE_componentWillReceiveProps() {
    console.log(this.props.allLeaderBoardList);
  }

  render() {
    return (
      <QuizWrapper>
        <Row>
          <Col md="8" className="bg-white">
            <HeroBanner>
              <Row>
                <Col md="6">
                  <h1>Assessment</h1>
                  <p>Select and choose any topic and take your assessment</p>
                  <p>
                    <Button variant="primary">Learn more</Button>
                  </p>
                </Col>
                <Col md="6">
                  <div className="quiz-image">
                    <img
                      src={window.location.origin + "/assets/img/allquiz.svg"}
                      alt=""
                    />
                  </div>
                </Col>
              </Row>
            </HeroBanner>
          </Col>
          <Col md="4" className="bg-grey">
            {this.props.allLeaderBoardList && this.props.allLeaderBoardList.length > 0 &&
            <LeaderBoard>
              <h3>Leaderboard</h3>
              {(this.props.allLeaderBoardList || []).map((item,i) => {
                return (
                  <LeaderItem>
                    <Row>
                      <Col md="2">
                      <img src={item.profile.userImg} alt=""/>
                      </Col>
                      <Col md="8">
                        <div>{item.profile.username}</div>
                        <div className="email">{item.email}</div>
                      </Col>
                      <Col md="2" className='text-center'>
                        {i + 1}
                      </Col>
                      </Row>
                  </LeaderItem>
                );
              })}
            </LeaderBoard>
  }
          </Col>
        </Row>

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

const mapStateToProps = (state) => ({
  allLeaderBoardList: state.QuizLeaderBoardReducer.getLeaderBoardList,
});

const QuizComponentContainer = connect(mapStateToProps, {
  getLeaderBoardList,
})(QuizComponent);

export default withRouter(QuizComponentContainer);
