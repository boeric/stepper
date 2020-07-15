/* App.jsx */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stepper from './Stepper.jsx';

const stepperData = {
  nextStr: 'Next',
  backStr: 'Back',
  submitStr: 'Submit',
  pages: [{
    comment: 'Page 1',
    controls: [{
      type: 'alt-radio',
      legend: 'How likely are you to recommend us to friend or colleague?',
      required: true,
      name: 'likely-to-recommend',
    }],
  }, {
    comment: 'Page 2',
    controls: [{
      type: 'select',
      options: [
        'Choose...',
        'Browse new arrivals',
        'Find specific style',
        'Compare products',
        'Contact customer service',
        'Return or exchance an item',
      ],
      legend: 'What was your objective with your visit today?',
      name: 'visit-objective',
    }, {
      type: 'select',
      options: [
        'Choose...',
        'Dress shoes',
        'Loafers',
        'Oxfords',
        'Running',
        'Sandals',
        'Sneakers',
      ],
      legend: 'Which product category is of most interest to you?',
      name: 'product-of-interest',
    }],
  }, {
    comment: 'Page 3',
    controls: [{
      type: 'radio',
      options: [
        'Very difficult',
        'Difficult',
        'Not Difficult nor Easy',
        'Easy',
        'Very Easy',
      ],
      legend: 'How easy was it to accomplish that goal?',
      name: 'easy-to-accomplish-goal',
    }],
  }, {
    comment: 'Page 4',
    controls: [{
      type: 'textarea',
      placeholder: 'Your answer',
      maxChars: 1000,
      legend: 'Please share your feedback',
      name: 'feedback',
    }],
  }],
};

export default class App extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      showStepper: false,
      stepperResponse: null,
    };

    // Bind this to event handler
    this.clickHandler = this.clickHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  clickHandler() {
    const { showStepper } = this.state;
    this.setState({
      showStepper: !showStepper,
      stepperResponse: null,
    });
  }

  closeHandler(response = {}) {
    const stepperResponse = Object.keys(response).map((key) => ({ [key]: response[key] }));

    this.setState({
      showStepper: false,
      stepperResponse,
    });
  }

  render() {
    const { title } = this.props;
    const { showStepper, stepperResponse } = this.state;

    const stepperResponseDiv = stepperResponse === null
      ? null
      : (
        <div className="response-wrapper">
          <div className="response-title">
            Response from stepper:
          </div>
          <textarea
            className="response-content"
            rows="18"
            value={JSON.stringify(stepperResponse, null, 2)}
            readOnly
          ></textarea>
        </div>
      );

    return (
      <div>
        <div>{title}</div>
        <div className="instructions">
          Click Feedback at the right to start the Stepper
        </div>
        {stepperResponseDiv}
        <div className="feedback-button-container">
          <button
            className="feedback-button"
            onClick={this.clickHandler}
          >
            FEEDBACK
          </button>
        </div>
        { showStepper
          ? (
            <Stepper
              data={stepperData}
              onClose={this.closeHandler}
            />
          )
          : null
        }
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
};
