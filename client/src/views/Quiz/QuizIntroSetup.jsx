import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GoogleLoginComponent from "../../common-components/GoogleLoginComponent/GoogleLoginComponent";
import { connect } from "react-redux";
import QuizSetupComponent from './QuizSetupComponent'




const TakeQuiz = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  .scrolling-form-container__pane-left {
    z-index: 1;
    flex-direction: column;
    overflow: auto;
    padding: 60px;
    min-height: 100%;
    max-height: 100%;
    width: 40%;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    justify-content: start;
    align-items: center;
    position: relative;
    .logo {
      margin: 60px 0px;
      img {
        height: 40px;
      }
    }
    > a {
      color: #212529;
      position: absolute;
      top: 50px;
      left: 60px;
      font-weight: bold;
    }
    .left-pane {
      span.left-pane__candidate-name {
        margin: 20px 0;
        font-size: 18px;
        display: block;
      }
      .left-pane__test-name {
        color: #0e141e;
        color: var(--color-branding-text, #0e141e);
        margin-bottom: 60px;
        padding: 0;
        word-break: break-word;
        font-weight: 700;
        font-size: 40px;
        line-height: 1.2;
      }
      .left-pane__test-detail-container {
        margin-bottom: 50px;
        min-height: 45px;
        .left-pane__test-detail {
          color: #576871;
          color: var(--color-branding-text, #576871);
          margin-right: 30px;
          .left-pane__test-detail__content {
            color: #39424e;
            color: var(--color-branding-text, #39424e);
            padding: 5px 5px 5px 0;
            font-size: 18px;
          }
        }
      }
    }
  }
  .scrolling-form-container__pane-right {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 60%;
    height: 100vh;
    background: #f3f7f7;
    .right-pane {
      padding: 0px 60px;

      .right-pane__section {
        box-sizing: border-box;
        margin-right: auto;
        padding-top: 78px;
        padding-bottom: 40px;
        .label-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          .checkbox-wrap {
            flex: 0.05;
          }
          .label {
            flex: 0.95;
          }
        }
        .candidate-details__submit {
          padding: 6px 15px;
          background: #0aab2d;
          color: #fff;
          border: 1px solid #0aab2d;
          box-shadow: none;
          font-size: 16px;
          margin-top: 20px;
        }
        #instructions-content,
        .candidate-details {
          font-size: 14px;
          li {
            margin-bottom: 14px;
          }
        }
        .labeled-input.hacker-details {
          margin: 25px 0px;
        }
      }
    }
  }
  .errorTxt {
    color: red;
  }
`;

function QuizStart(props) {
  const { topic } = props.match.params;

  console.log(topic);

  const [showError, setShowError] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userDetailsInQuiz, setUserDetailsInQuiz] = useState(
    JSON.parse(sessionStorage.getItem("userData")) || {
      username: "",
      email: "",
    }
  );
  const [status, setCheckBoxState] = useState(false);




  const validateLoginAndStart = (event) => {
    event.preventDefault();
    if (userDetailsInQuiz && userDetailsInQuiz.email && status) {
      setShowError(false);
      setShowQuiz(true);
    } else {
      setShowError(true);
    }
  };



  useEffect(() => {
    if (
      props.loginUserState.loggedinStatus &&
      props.loginUserState.loggedInUserDetails
    ) {
      console.log("i got it");
      setUserDetailsInQuiz((prevState) => {
        return {
          ...prevState,
          username: props.loginUserState.loggedInUserDetails.name,
          email: props.loginUserState.loggedInUserDetails.email,
        };
      });
    }
  }, [props.loginUserState.loggedInUserDetails]);

  const handleChangeCheckbox = (event) => {
    setCheckBoxState((prevState) => {
      return {
        ...prevState,
        status: !prevState.status,
      };
    });
  };

  return (
    <div id="content">
      {!showQuiz && (
        <TakeQuiz>
          <div className="scrolling-form-container__pane-left">
            <Link to="/quiz">
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i> Back
            </Link>
            <div className="logo">
              <img
                src={window.location.origin + "/assets/img/launchpad.png"}
                alt="upload"
              />
            </div>
            <div className="left-pane d-flex flex-column align-items-start justify-content-between">
              <div className="left-pane__top">
                <span className="left-pane__candidate-name">
                  Hey{" "}
                  {userDetailsInQuiz && userDetailsInQuiz.username
                    ? userDetailsInQuiz.username
                    : "Guest"}
                  ,{" "}
                </span>
                <h1
                  className="left-pane__test-name"
                  aria-label="Welcome to HackerRank Rest API (Intermediate) Skills Certification Test"
                >
                  <span className="d-flex" aria-hidden="true">
                    Welcome to {topic}
                  </span>
                  <span aria-hidden="true"> Test</span>
                </h1>
                <div className="d-flex left-pane__test-detail-container">
                  <div className="d-flex flex-column left-pane__test-detail">
                    <span className="left-pane__test-detail__header">
                      Test duration
                    </span>
                    <span
                      className="left-pane__test-detail__content"
                      data-automation="test-duration"
                    >
                      5 mins
                    </span>
                  </div>
                  <div className="d-flex flex-column left-pane__test-detail">
                    <span className="left-pane__test-detail__header">
                      No. of questions
                    </span>
                    <span className="left-pane__test-detail__content">
                      10 questions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right column */}
          <div className="scrolling-form-container__pane-right">
            <div className="right-pane">
              <div
                id="test-instructions"
                className="right-pane__section right-pane__instructions scrolling-form-page"
              >
                <section className="scrolling-form-page__section">
                  <div className="test-instructions">
                    <h2 className="d-block test-instructions__title">
                      Instructions
                    </h2>
                    <div className="candidate-rich-text">
                      <div>
                        <div id="instructions-content">
                          <ol>
                            <li>
                              This is a timed test. Please make sure you are not
                              interrupted during the test, as the timer cannot
                              be paused once started.
                            </li>
                            <li>
                              Please ensure you have a stable internet
                              connection.
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="test-confirmation-form"
                    className="right-pane__section confirmation scrolling-form-page"
                  >
                    <section className="scrolling-form-page__section">
                      <h2 className="d-block confirmation__title">
                        Confirmation Form
                      </h2>
                      <div className="hr-candidate-form">
                        <div className="candidate-details">
                          <p className="d-block candidate-details__sub-text">
                            Before we start, here is some extra information we
                            need to assess you better.
                          </p>
                          <form noValidate>
                            <div className="labeled-input hacker-details">
                              <span className="label-text">Logged in as</span>{" "}
                              <b>
                                <span className="hacker-details__email">
                                  {userDetailsInQuiz.email ? (
                                    userDetailsInQuiz.email
                                  ) : (
                                    <GoogleLoginComponent />
                                  )}
                                </span>
                              </b>
                            </div>
                            <div className="labeled-input candidate-details__email d-none">
                              <label
                                htmlFor="labeled-input-1"
                                className="label-text is-required-field"
                              >
                                Email address/Login
                              </label>
                              <div className="custom-input theme-m size-medium">
                                <div className="input-wrap">
                                  <input
                                    id="labeled-input-1"
                                    type="hidden"
                                    className="input"
                                    placeholder="Enter your email address/login"
                                    aria-label="Email address/Login"
                                    aria-invalid="false"
                                    name="email"
                                    required=""
                                    alignment="column"
                                    value="rajrock38@gmail.com"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="labeled-input candidate-details__disclaimer">
                              <label
                                htmlFor="labeled-input-2"
                                className="label-text is-required-field"
                              >
                                <strong>Declaration Statement</strong>
                              </label>
                              <div className="ui-checklist">
                                <ul className="ui-checklist-list">
                                  <li className="ui-checklist-list-item">
                                    <div className="ui-checklist-item-wrap">
                                      <div className="ui-checkbox theme-m candidate-details__checkbox-disclaimer ui-checkbox--raised">
                                        <label className="label-wrap">
                                          <div className="checkbox-wrap">
                                            <input
                                              type="checkbox"
                                              className="checkbox-input"
                                              name="acknowledge"
                                              onChange={handleChangeCheckbox}
                                              alignment="column"
                                              value={status}
                                            />
                                            <span className="custom-holder"></span>
                                          </div>
                                          <div className="label">
                                            I will not consult/copy code from
                                            any source including a website,
                                            book, or friend/colleague to
                                            complete these tests, though may
                                            reference language documentation or
                                            use an IDE that has code completion
                                            features.
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <button
                              className="ui-btn ui-btn-normal ui-btn-submit ui-btn-primary candidate-details__submit"
                              onClick={validateLoginAndStart}
                            >
                              <div className="ui-content align-icon-right">
                                <span className="ui-text">
                                  Agree &amp; Start
                                </span>
                              </div>
                            </button>
                            {showError && (
                              <div className="errorTxt">
                                Sign in to start test
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </TakeQuiz>
      )}
      {showQuiz && <QuizSetupComponent startTime={showQuiz}  quizTopic={topic}/> }

    </div>
  );
}

const mapStateToProps = (state) => ({
  loginUserState: state.LoginReducer,
});

const QuizAppContainer = connect(mapStateToProps, {})(QuizStart);

export default QuizAppContainer;
