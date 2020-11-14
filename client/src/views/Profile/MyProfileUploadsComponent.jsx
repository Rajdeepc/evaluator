import React, { Component } from "react";
import { Col, Row, Card, Tabs, Tab } from "react-bootstrap";
import { NavBarConnect } from "../../components/NavBar/SSOLogin";
import styled from "styled-components";
import "./profile.css";

const MyProfileWrapper = styled.div`
  width: 100%;
  padding: 1em 2em;
  background: #f0f0f0;
  min-height: calc(100vh - 40px);
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: rgba(0, 0, 0, 0.84);
    background-color: transparent;
    border-color: transparent;
}
.nav-tabs .nav-link {
  color: rgba(0, 0, 0, 0.54);
}
h4 {
  margin-bottom:20px;
}
`;

const DateStyle = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const TabContentWrapper = styled.div`
  padding: 1em 0em;
  .card {
    border:1px solid;
    margin-bottom: 2em;
      .card-body {
        min-height: 200px;
        max-height: 200px;
        overflow-y: auto;
        height: auto;
      }
  }
`

export default class MyProfileUploadsComponent extends Component {
  constructor(props) {
    super(props);
    console.log("");
    this.state = {
      key: "1",
      approvedData:[]
    };
    this.email_id = ''
  }

  componentWillMount() {
    const { email_id } = this.props.match.params;
    console.log("email_id" + email_id);
    this.email_id = email_id;
  }

  componentDidMount() {
    this.props.getDataByUploadedStatus(this.state.key, this.email_id);
   
  }

  handleSelect = key => {
    this.setState({
      key: key
    }, () => {
      this.props.getDataByUploadedStatus(this.state.key, this.email_id)
    });
  };




  getProfileDetails = () => {
    
  }


  renderItems = (dataArray) => {
    return (
      <TabContentWrapper>
        { dataArray.length ?
      <Row>
      { dataArray.map(item => {
        return (
          <Col md={4} key={item._id}>
          <Card border={item.uploadStatus === 'Approved' ? 'success' : 'info'}>
            <Card.Header> <b>{item.topic_name}</b></Card.Header>
            <Card.Body>
              <Card.Title>Title:{item.subtopic_title}</Card.Title>
              <Row>
                <Col>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.subtopic_content
                  }}
                />
                </Col>
              </Row>
                
                <Row>
                  <Col>
                    <DateStyle>Uploaded At: {item.updated_date}</DateStyle>
                  </Col>
                </Row>
  
               
            </Card.Body>
      
                <Card.Footer className="text-muted"><b>Status:</b>{" "}
                    <b
                      style={{
                        color: item.uploadStatus === "Approved" ? "green" : "yellow"
                      }}
                    >
                      {item.uploadStatus}
                    </b></Card.Footer>
          </Card>
          </Col>
        )
      })
    }
    </Row>
    : <div>No data</div>}
   </TabContentWrapper>
    )
    
  };

  TotalContributions = () => {
    let starsCount = this.props.ProfileReducerState.approvedData.length * 2;
    let contri = this.props.ProfileReducerState.approvedData.length;
    let total = 0;
    for(let i = 0; i< this.props.ProfileReducerState.approvedData.length; i++){
      total += this.props.ProfileReducerState.approvedData[i].likes_count
    }
    return (
      <Card>
        <Card.Body>
            <Row>
              <Col md={2}>
                {" "}
                Total Contributions:
                {contri}
              </Col>
              <Col md={1}>
                {" "}
                <i className="fa fa-heart-o fa-lg" aria-hidden="true" />
                {total}
              </Col>
              <Col md={1}>
                {" "}
                <i className="fa fa-star fa-lg" aria-hidden="true" />
                {starsCount}
              </Col>
              <Col md={2}> Rank: {starsCount < 10 ? 'Participant' : 'Master'}</Col>
            </Row>
          
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    );
  };
  render() {
    return (
      <div>
        <NavBarConnect
          {...this.props}
          getGoogleResponseToParent={this.getProfileDetails}
        />
        <MyProfileWrapper>
          
          <br />
          <h4>My Achievements</h4>
          {this.TotalContributions()}
          <br />
          <br />
          <h4>My Uploads</h4>

          <Row>
            <Col>
              <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="controlled-tab-example"
              >
                <Tab eventKey={1} title="Approved">
                  {/* {this.renderItems()} */}
                  { this.renderItems(this.props.ProfileReducerState.approvedData)}
                </Tab>
                <Tab eventKey={2} title="In Review">
                  {/* {this.renderItems()} */}
                  { this.renderItems(this.props.ProfileReducerState.dataByStatus)}
                </Tab>
                <Tab eventKey={3} title="Rejected">
                  {/* {this.renderItems()} */}
                  { this.renderItems(this.props.ProfileReducerState.dataByStatus)}
                </Tab>
              </Tabs>
            </Col>
            {/* {this.props.ProfileReducerState.myProfileData.map(item => {
              return (
                <Col md={4}>
                  
                </Col>
              );
            })} */}
          </Row>
        </MyProfileWrapper>
      </div>
    );
  }
}
