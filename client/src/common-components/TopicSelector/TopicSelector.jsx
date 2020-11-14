import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { topics } from "../../utils/constants";
/** logos */

export default class FilterByTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredState: this.props.filteredState,
      valueOfFilter: "HTML",
      arrayToBindIntpTopic: [],
      subTopicData: [],
      selectedTopic: "frontend",
      selectedCategory: "",
    };
  }

  showSubTopcPanel = (value) => {
    this.setState({
      selectedCategory: value,
    },() => {
      this.props.selectedValues({
        selectedCategory: this.state.selectedCategory,
        selectedTopic: this.state.selectedTopic
      });
    });
  };

  componentDidMount() {
    this.getCategoryData(this.state.selectedTopic);
  }

  getCategoryData = (value) => {
    const subTopicData = topics.find((item) => item.value === value);
    this.setState(
      {
        selectedTopic: value,
        subTopicData: subTopicData && subTopicData.branches,
      },
      () => {
        this.setState(
          {
            selectedCategory: this.state.subTopicData[0].value,
          },
          () => {
            this.props.selectedValues({
              selectedCategory: this.state.selectedCategory,
              selectedTopic: this.state.selectedTopic,
            });
          }
        );
      }
    );
  };

  render() {
    const { selectedTopic, selectedCategory } = this.state;
    return (
      <Form inline>
        <Form.Control
          as="select"
          className="mb-2 mr-sm-2"
          defaultValue={selectedTopic}
          custom
          onChange={(event) => this.getCategoryData(event.target.value)}
        >
          {topics.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control
          as="select"
          className="mb-2 mr-sm-2"
          custom
          defaultValue={selectedCategory}
          onChange={(event) => this.showSubTopcPanel(event.target.value)}
        >
          {this.state.subTopicData.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </Form.Control>
      </Form>
    );
  }
}
