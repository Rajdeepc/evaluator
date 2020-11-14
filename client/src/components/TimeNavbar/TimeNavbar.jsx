import React from "react";
import PropTypes from 'prop-types';
import { Navbar, Nav } from "react-bootstrap";
import Timer from '../Timer/Timer'

export default function TimeNavbar({startTime,...props}) {

    const getTimeEnded = (value) => {
        props.timeEnded(value)
    }
  return (
    <Navbar className="justify-content-between whitebg" sticky="top">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <span className="timeremaining">Time Remaining </span>
          <Timer startTime={startTime} timeEnded={getTimeEnded} endTime={props.endTime}></Timer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


TimeNavbar.propTypes = {
    time: PropTypes.string
}
