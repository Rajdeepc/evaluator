import React, { useEffect } from "react";
import AnswerOption from "./AnswerOption";
import Question from "./Question";
import QuestionCount from "./QuestionCount";

export default function QuizApp(props) {


  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key}
        answerContent={key}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <>
      {/* quiz question and answers */}
      <div className="quiz-container">
        <div className="quiz">
          <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
          />
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
          <div className="form-group text-center">
            <button className="btn btn-success" onClick={props.submitAnswer}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
