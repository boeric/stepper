/* App.jsx */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stepper from './Stepper.jsx';

const stepperConfig = {
  nextStr: 'Next',
  backStr: 'Back',
  submitStr: 'Submit',
  pages: [{
    comment: 'Page 1',
    controls: [{
      type: 'alt-radio',
      name: 'likely-to-recommend',
      legend: 'How likely are you to recommend us to friend or colleague?',
    }],
  }, {
    comment: 'Page 2',
    controls: [{
      type: 'select',
      name: 'visit-objective',
      legend: 'What was your objective with your visit today?',
      options: [
        'Choose...',
        'Browse new arrivals',
        'Find specific style',
        'Compare products',
        'Contact customer service',
        'Return or exchance an item',
      ],
    }, {
      type: 'select',
      name: 'product-of-interest',
      legend: 'Which product category is of most interest to you?',
      options: [
        'Choose...',
        'Dress shoes',
        'Loafers',
        'Oxfords',
        'Running',
        'Sandals',
        'Sneakers',
      ],
    }],
  }, {
    comment: 'Page 3',
    controls: [{
      type: 'radio',
      name: 'easy-to-accomplish-goal',
      legend: 'How easy was it to accomplish that goal?',
      options: [
        'Very difficult',
        'Difficult',
        'Not Difficult nor Easy',
        'Easy',
        'Very Easy',
      ],
    }],
  }, {
    comment: 'Page 4',
    controls: [{
      type: 'textarea',
      name: 'feedback',
      legend: 'Please share your feedback',
      maxChars: 1000,
      placeholder: 'Your answer',
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

    // Bind 'this' to event handlers
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

    // Optionally, generate the response container (happens whne Stepper is done)
    const stepperResponseContainer = stepperResponse === null
      ? null
      : (
        <div className="response-wrapper">
          <div className="response-title">
            Response from Stepper:
          </div>
          <textarea
            className="response-content"
            rows="18"
            value={JSON.stringify(stepperResponse, null, 2)}
            readOnly
          ></textarea>
        </div>
      );

    // Render the app
    return (
      <div>
        <div>{title}</div>
        <div className="instructions">
          Click Feedback at the right to start the Stepper
        </div>
        {stepperResponseContainer}
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
              data={stepperConfig}
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
