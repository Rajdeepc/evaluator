import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Result(props) {

  const [name, setUserName] = useState('')


  useEffect(() => {
    const myItems = JSON.parse(sessionStorage.getItem('userData'))
    setUserName(myItems.username)
  }, [])

  return (
    <div className="result text-center">
      <h3>Hi {name}</h3>
      <br></br>
      <br></br>
      <h1 className="jumbotron">
        Your score is <strong>{props.quizResult}</strong> / {props.questionTotal}
      </h1>
      <h1>
        
      </h1>
      <div className="back-to-row">
        <Link className="btn btn-primary" to="/quiz">Go Back</Link>{" "}
        <Link className="btn btn-success"  to="/quiz">Try Again</Link>
      </div>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
  questionTotal: PropTypes.number
};


export default Result;