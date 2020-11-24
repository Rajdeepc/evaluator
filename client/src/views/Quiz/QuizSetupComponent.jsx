import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { shuffleArray } from "../../utils/commonUtil";
import QuizApp from "./QuizApp";
import Result from "./Results";
import "./Quiz.css";
import styled from "styled-components";
import TimeNavbar from "../../components/TimeNavbar/TimeNavbar";
import {updateLeaderBoard} from './quiz.action'
import { connect } from 'react-redux';

const QuizAppWrapper = styled.div`
  .navbar {
    background: #fff;
    height: 50px;
  }
  background: #fff;
  .quiz-container {
    height: calc(100vh - 106px);
  }
  .timeremaining {
    color: #ccc;
    margin-right: 20px;
    font-size: 14px;
  }
  #time {
    color: #000;
    font-weight: bold;
  }
`;

const INITIAL_STATE = {
  counter: 0,
  questionId: 1,
  question: "",
  answerOptions: [],
  answer: "",
  answersCount: {},
  result: undefined,
};

function QuizSetupComponent({ quizTopic, ...props }) {
  const [quiz, setQuizState] = useState(INITIAL_STATE);

  const [questionSet, setSelectedQuestionSet] = useState([]);

  const getQuestionsData = async (topic) => {
    const getArrayItems = await import(
      `../../utils/quiz-questions/${topic}.json`
    );
    console.log(getArrayItems.default)
    return getArrayItems.default;
  };

  useEffect(() => {
    async function getTopicQuestions(){
      const response = await getQuestionsData(quizTopic);
      setSelectedQuestionSet(response);
    }
    getTopicQuestions()
  }, []);

  useEffect(() => {
    if(questionSet && questionSet.length){
      const shuffledAnswerOptions = questionSet.map((question) =>
      shuffleArray(question.answers)
    );

    setQuizState((prevState) => {
      return {
        ...prevState,
        question: questionSet[0].question,
        answerOptions: shuffledAnswerOptions[0],
      };
    });
    }
  },[questionSet && questionSet.length]) 

  /** get results from your selected answers */
  const getResults = () => {
    const answersCount = quiz.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    let numCorrect = 0;
    for (let i = 0; i < answersCountKeys.length - 1; i++) {
      if (answersCountKeys[i] === questionSet[i].correct) {
        numCorrect++;
      }
    }
    return numCorrect;
  };

  /**
   * show your results
   * @param {*} result
   */
  const setResults = (result) => {
    if (result > -1) {
      setQuizState((prevState) => {
        return {
          ...prevState,
          result: result,
        };
      });
      const quizObj = {
        quizName:quizTopic,
        quizId: quizTopic,
        highest_score: result
      }

      const emailId = sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData")).email;

       const profileObj = {
         username: sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData")).username,
         userImg: sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData")).userImg
       }


       props.updateLeaderBoard(emailId,profileObj, quizObj);


    } else {
      setQuizState((prevState) => {
        return {
          ...prevState,
          result: "Undetermined",
        };
      });
    }
  };
  /**
   * update new answer on changing answer options
   * @param {*} answer
   */
  const setUserAnswer = (answer) => {
    setQuizState((prevState) => {
      return {
        ...prevState,
        answersCount: {
          ...prevState.answersCount,
          [answer]: (prevState.answersCount[answer] || 0) + 1,
        },
        answer: answer,
      };
    });
  };

  /**
   * Get selected questions data
   *
   */
  const handleAnswerSelected = (event) => {
    setUserAnswer(event.currentTarget.value);
  };

  /**
   * clicking on submit go to the next question
   */
  const setNextQuestion = () => {
    const counter = quiz.counter + 1;
    const questionId = quiz.questionId + 1;
    setQuizState((prevState) => {
      return {
        ...prevState,
        counter: counter,
        questionId: questionId,
        question:
          questionSet[counter] && questionSet[counter].question
            ? questionSet[counter].question
            : "",
        answerOptions:
          questionSet[counter] && questionSet[counter].answers
            ? questionSet[counter].answers
            : [],
        answer: "",
      };
    });
  };

  const handleSubmitAnswer = () => {
    if (quiz.questionId < questionSet.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      setTimeout(() => setResults(getResults()), 300);
    }
  };

  const closeModal = () => {
    setQuizState(INITIAL_STATE);
  };

  const getTimeEnded = (value) => {
    if (value) {
      setTimeout(() => setResults(getResults()), 300);
    }
  };

  const renderQuiz = () => {
    return (
      <QuizAppWrapper>
        <TimeNavbar
          startTime={props.startTime}
          timeEnded={getTimeEnded}
          endTime={quiz.result}
        />
        <QuizApp
          answer={quiz.answer}
          answerOptions={quiz.answerOptions}
          questionId={quiz.questionId}
          question={quiz.question}
          questionTotal={questionSet.length}
          onAnswerSelected={handleAnswerSelected}
          submitAnswer={handleSubmitAnswer}
        />
      </QuizAppWrapper>
    );
  };

  const renderResult = () => {
    return (
      <div className="result-container">
        <Result
          quizResult={quiz.result}
          close={closeModal}
          questionTotal={questionSet.length}
        />
      </div>
    );
  };

  return <div>{quiz.result !== undefined ? renderResult() : renderQuiz()}</div>;
}

QuizSetupComponent.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  counter: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loginUserDetails: state.LoginReducer.loggedInUserDetails
})


const QuizSetUpContainer = connect(mapStateToProps, {
  updateLeaderBoard
})(QuizSetupComponent)

export default QuizSetUpContainer;
