import React, { Component } from "react";
import {
  Col,
  Button,
  Row,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import styled from "styled-components";
import TopicSelector from "../../common-components/TopicSelector/TopicSelector";
import { connect } from "react-redux";
import { getAllQuestions, getAllApprovedItems } from "./selectorbar.action";
import QuestionAccordian from "../QuestionAccordian/QuestionAccordian";
import { Link } from "react-router-dom";
import { levels } from "../../utils/constants";
import withLoader from "../../common-components/Loader/Loader";
import { getUniqueId } from '../../utils/commonUtil'


const BlogMenu = styled.div`
  background: #f3f4f7;
  width: 100%;
  padding: 10px 0px;
  .form-inline {
    width: 100%;
  }
  select.custom-select {
    width: 48%;
  }
`;

const QuestionPanel = styled.div`
  background: #f3f4f7;
  width: 100%;
  padding: 35px 0px;
`;

const QuestionInfoHeader = styled.div`
  text-align: center;
  background: #fff;
  padding: 30px 0px;
  h1 {
    margin-bottom: 20px;
  }
  a {
    display: block;
    padding: 18px 35px;
    text-decoration: none;
    background: #897FC8;
    width: 350px;
    border-radius: 3px;
    margin: 0 auto;
    color: #fff;
  }
`;

const FilterDifficulty = styled.div`
  overflow: auto;
  margin-bottom: 30px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    float: right;
    li {
      float: left;
      margin-left: 10px;
      padding: 4px 20px;
      border-radius: 32px;
      font-size: 12px;
      cursor: pointer;
      &.all {
        background: #d9fbd9;
        &.active {
          background: #284d81;
          color: #fff;
        }
      }
      &.easy {
        background: #d9fbd9;
        &.active {
          background: #284d81;
          color: #fff;
        }
      }
      &.medium {
        background: #ffffde;
        &.active {
          background: #284d81;
          color: #fff;
        }
      }
      &.hard {
        background: #ffe0e0;
        &.active {
          background: #284d81;
          color: #fff;
        }
      }
    }
  }
  .btn.btn-link {
    padding: 0;
    font-size: 14px;
    text-decoration: none;
  }
`;

const ContributionButtonControl = styled.div`
.btn-grad {background-image: linear-gradient(to right, #FF512F 0%, #F09819  51%, #FF512F  100%)}
.btn-grad {
  padding: 10px 15px;
  text-transform: uppercase;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 6px;
  display: block;
  font-size: 13px;
 }

 .btn-grad:hover {
   background-position: right center; /* change the direction of the change here */
   color: #fff;
   text-decoration: none;
 }
`;

class SelectorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      difficultyLevelSelected: "all",
      questionData: [],
      drawerOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      questionData: this.props.allQuestionsState,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.allQuestionsState !== nextProps.allQuestionsState) {
      this.props.setLoading(false);
      this.setState({
        questionData: nextProps.allQuestionsState,
      });
    }
  }



  getSelectedValues = (objValues) => {
    this.setState({
      category: objValues.selectedCategory,
      difficultyLevelSelected: "all",
      questionData: [],
    });
    this.props.setLoading(true);
    this.props.getAllQuestions(objValues);
  };

  filterQuestionByDifficulty = (difficultyValue) => {
    const allFilteredData = this.props.allQuestionsState.filter(
      (item) => item.difficulty === "all"
    );
    const filteredData = this.props.allQuestionsState.filter(
      (item) => item.difficulty === difficultyValue
    );
    this.setState(
      {
        difficultyLevelSelected: difficultyValue,
        questionData:
          difficultyValue === "all"
            ? filteredData
            : [...filteredData, ...allFilteredData],
      },
      () => {
        console.log(this.state.questionData);
      }
    );
  };

  clearFilter = () => {
    this.setState(
      {
        difficultyLevelSelected: "all",
      },
      () => {
        this.filterQuestionByDifficulty("all");
      }
    );
  };

  filterDataBySearchInput = (searchValue) => {
    const questionDataTemp = [...this.props.allQuestionsState];
    if (searchValue) {
      const filteredData = questionDataTemp.filter((item) =>
        item.question.toLowerCase().includes(searchValue.toLowerCase())
      );

      this.setState({
        questionData: filteredData,
        difficultyLevelSelected: "",
      });
    } else {
      this.setState({
        questionData: this.props.allQuestionsState,
        difficultyLevelSelected: "",
      });
    }
  };

  handleSearch = (value) => {
    this.filterDataBySearchInput(value);
  };


  startQuiz = () => {

  }



  render() {
    return (
      <div>
        <BlogMenu>
          <Container>
            <Row>
              <Col sm={6}>
                <TopicSelector selectedValues={this.getSelectedValues} />
              </Col>
              <Col sm={4}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder={`Search ${this.state.category} questions...`}
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(e) => this.handleSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col sm={2}>
                <InputGroup>
                <ContributionButtonControl>
                  <Link
                    className="btn-grad"
                    variant="light"
                    to={`/sharecode/${getUniqueId()}`}
                  >
                    Start Code Share
                  </Link>
                </ContributionButtonControl>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </BlogMenu>

        <QuestionInfoHeader>
          <h1>
            {this.props.allQuestionsState &&
              this.props.allQuestionsState.length}{" "}
            {this.state.category} Interview{" "}
            {this.props.allQuestionsState &&
            this.props.allQuestionsState.length > 0
              ? "Questions"
              : "Question"}
          </h1>
          <Link to="/upload">SUBMIT AN INTERVIEW QUESTION</Link>
        </QuestionInfoHeader>

        <QuestionPanel>
          <Container>
            <Row>
              <Col>
                <FilterDifficulty>
                  <ul>
                    {levels.map((item) => {
                      if (item.show) {
                        return (
                          <li key={item.id}
                            className={`${item.id} ${
                              item.id === this.state.difficultyLevelSelected
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              this.filterQuestionByDifficulty(item.id)
                            }
                          >
                            {item.name}
                          </li>
                        );
                      }
                    })}
                    <li>
                      <Button variant="link" onClick={this.clearFilter}>
                        X Clear
                      </Button>
                    </li>
                  </ul>
                </FilterDifficulty>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.questionData && this.state.questionData.length ? (
                  <QuestionAccordian data={this.state.questionData} />
                ) : (
                  <div className="text-center">
                    <h4>No Questions Uploaded yet</h4>
                    <Link to="/upload">SUBMIT AN INTERVIEW QUESTION</Link>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </QuestionPanel>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allQuestionsState: state.SelectorBarReducer.allQuestionsByTopic,
  allApprovedItems: state.SelectorBarReducer.allApprovedItems,
});

const SelectorBarContainer = connect(mapStateToProps, {
  getAllQuestions,
  getAllApprovedItems,
})(SelectorBar);

export default withLoader(
  SelectorBarContainer,
  "Please wait while the data is loaded"
);
