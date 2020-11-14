import React, { Component } from "react";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

const FooterStyle = styled.div`
  height: 68px;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 0 rgba(12, 13, 14, 0.1), 0 1px 6px rgba(59, 64, 69, 0.1);
  color: #848d95;
  padding: 2em;
  font-size: 14px;
  .fa{
    margin-left:16px;
    color: #787878;
    font-size:20px;
  }
`;

export default class FooterComponent extends Component {
  getProfileDetails = () => {};
  render() {
    return (
      <FooterStyle>
        <Row>
          <Col md={6} className="text-left">
            <p>Site Developed & Maintained by Rajdeep Chandra</p>
          </Col>
          <Col md={6} className="text-right">
            <span>Contact me at: </span>
            <a href="https://www.github.com/Rajdeep" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-github" aria-hidden="true"></i>{" "}
            </a>
            <a href="https://www.linkedin.com/in/rajdeepcoder/" rel="noopener noreferrer" target="_blank">
              {" "}
              <i className="fa fa-linkedin" aria-hidden="true"></i>{" "}
            </a>
            <a href="https://twitter.com/rajrock38" rel="noopener noreferrer" target="_blank">
              {" "}
              <i className="fa fa-twitter" aria-hidden="true"></i>{" "}
            </a>
          </Col>
        </Row>
      </FooterStyle>
    );
  }
}
