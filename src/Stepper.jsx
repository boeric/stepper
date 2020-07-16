/* Stepper.jsx */

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import logo from './logo.png';

export default class Stepper extends Component {
  constructor(props) {
    super(props);

    // Process input
    const { data } = props;
    const { pages = [] } = data;

    // Validate data (for now, only validate the pages array size)
    // TODO: complete input validation
    const error = pages.length === 0;

    // Create object to hold state of user controls
    const controlState = pages.reduce((ac, cv) => {
      const { controls = [] } = cv;
      controls.forEach((d) => {
        const { name } = d;
        // eslint-disable-next-line no-param-reassign
        ac[name] = null;
      });

      return ac;
    }, {});

    // Create div elem to hold content of modal
    const innerContainer = document.createElement('div');

    // Get the modal container
    const outerContainer = document.getElementById('modal-container');

    // Set initial state
    this.state = {
      controlState,
      currentPage: 0,
      error,
      innerContainer,
      outerContainer,
      totalPages: pages.length,
    };

    // Bind 'this' to event handlers
    this.cancelHandler = this.cancelHandler.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  // Append the inner container (modal) to the outer container
  componentDidMount() {
    const { innerContainer, outerContainer } = this.state;

    outerContainer.appendChild(innerContainer);
  }

  // Remove the inner container (modal) from the outer container
  componentWillUnmount() {
    const { innerContainer, outerContainer } = this.state;

    outerContainer.removeChild(innerContainer);
  }

  // Go to previous page
  prevPage() {
    const { currentPage } = this.state;
    const newPage = Math.max(currentPage - 1, 0);

    this.setState({ currentPage: newPage });
  }

  // Go to next page
  nextPage() {
    const { pages } = this.props.data;
    const { currentPage } = this.state;
    const newPage = Math.min(currentPage + 1, pages.length - 1);

    this.setState({ currentPage: newPage });
  }

  // Exit the Stepper and provide the state of the user controls to the parent
  submitHandler() {
    const { onClose } = this.props;
    const { controlState } = this.state;

    onClose(controlState);
  }

  // Exit the Stepper, and provide nothing to the parent (as the user is cancelling the Stepper)
  cancelHandler() {
    const { onClose } = this.props;

    onClose();
  }

  // Generate markup for a radio button control group
  generateRadioMarkup(d) {
    const { controlState } = this.state;
    const { legend, name, options = [] } = d;

    // Create radio buttons
    const radioButtons = options.map((option, i) => {
      // Determine selected state of this radio button
      const selected = controlState[name] === option;

      // Return the radio button
      return (
        <div key={i}>
          <input
            type="radio"
            name={name}
            key={i} // Ok to use array index as key here as the array is static
            checked={selected}
            onChange={() => {
              controlState[name] = option;
              this.setState({ controlState });
            }}
          ></input>
          <label>
            {option}
          </label>
        </div>
      );
    });

    // Return the radio button container
    return (
      <div>
        <div className="legend">
          {legend}
        </div>
        <div className="radio-button-container">
          {radioButtons}
        </div>
      </div>
    );
  }

  // Generate markup for a pseuo radio button control (made up of regular buttons)
  generateAltRadioMarkup(d) {
    const { controlState } = this.state;
    const { legend, name } = d;

    // Generate 11 elem array with values 0 - 10 (Would be a one-liner in d3 - d3.range...
    const range = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 10; i++) {
      range.push(i);
    }

    // Generate 11 buttons
    // TODO: allow any number of buttons, within reason...
    const altRadioButtons = range.map((option) => {
      // Determine selected state of this button
      const selected = option === controlState[name]
        ? 'alt-radio-button-selected'
        : '';

      // Set the css class for this button
      const classNames = `alt-radio-button ${selected}`;

      // Return the button
      return (
        <button
          className={classNames}
          key={option} // Ok to use array index as key here as the array is static
          onClick={() => {
            controlState[name] = option;
            this.setState({ controlState });
          }}
        >
          {option}
        </button>
      );
    });

    // Return the button container
    return (
      <div>
        <div className="legend">
          {legend}
        </div>
        <div className="alt-radio-button-container">
          {altRadioButtons}
        </div>
        <div className="alt-radio-button-explain-container">
          <span className="alt-radio-button-explain">Not at all likely</span>
          <span className="alt-radio-button-explain">Extremely likely</span>
        </div>
      </div>
    );
  }

  // Generate markup for a text area control
  generateTextareaMarkup(d) {
    const { controlState } = this.state;
    const { legend, maxChars, name } = d;
    const value = controlState[name] || '';
    const remainingChars = maxChars - value.length;

    // Return the textarea container
    return (
      <div>
        <div className="legend">
          {legend}
        </div>
        <div>
          <textarea
            className="comments"
            onChange={(evt) => {
              const { value: textAreaValue } = evt.target;

              controlState[name] = textAreaValue;
              this.setState({ controlState });
            }}
            placeholder="Your answer"
            rows={5}
            value={value}
          >
          </textarea>
        </div>
        <div className="comments-characters-left">
          <div>
            {`${remainingChars} characters left`}
          </div>
        </div>
      </div>
    );
  }

  // Generate markup for a select control
  generateSelectMarkup(d) {
    const { controlState } = this.state;
    const { legend, name, options } = d;
    const value = controlState[name] || options[0];

    // Generate option elements
    const optionElems = options.map((option, i) => (
      <option
        key={i} // Ok to use array index as key here as the array is static
        value={option}
      >
        {option}
      </option>
    ));

    // Return the select container
    return (
      <div>
        <div className="legend">
          {legend}
        </div>
        <div>
          <select
            onChange={(evt) => {
              const { value: selectValue } = evt.target;
              controlState[name] = selectValue;
              this.setState({ controlState });
            }}
            value={value}
          >
            {optionElems}
          </select>
        </div>
      </div>
    );
  }

  // Generate markup for the current Stepper page
  // Please note: Multiple controls can be placed on the same Stepper page
  generateMarkup(pageNumber) {
    const { data } = this.props;
    const {
      pages,
      nextStr,
      backStr,
      submitStr,
    } = data;
    const page = pages[pageNumber];
    const { controls } = page;
    const { currentPage } = this.state;

    // Generate input controls for this Stepper page
    const inputs = controls.reduce((ac, cv) => {
      const { type, name } = cv;
      let markup = null;

      switch (type) {
        case 'radio':
          markup = this.generateRadioMarkup(cv);
          break;
        case 'alt-radio':
          markup = this.generateAltRadioMarkup(cv);
          break;
        case 'textarea':
          markup = this.generateTextareaMarkup(cv);
          break;
        case 'select':
          markup = this.generateSelectMarkup(cv);
          break;
        default:
          // eslint-disable-next-line no-console
          console.error(`Invalid type ${type}`);
      }

      // Add this control to inputs
      ac.push((
        <div key={name}>
          { markup }
        </div>
      ));

      return ac;
    }, []);

    // Wrap the input controls in a container
    const inputContainer = (
      <div>
        {inputs}
      </div>
    );

    // Contains the 'X' at the upper right of the Stepper
    const cancelButtonContainer = (
      <div className="cancel-button-container">
        <button
          onClick={this.cancelHandler}
          className="cancel-button"
        >
          X
        </button>
      </div>
    );

    // Contains the logo
    const logoContainer = (
      <div className="logo-container">
        <img
          src={logo}
          className="logo"
          alt="Logo..."
        ></img>
      </div>
    );

    // Generate the back step button
    const backButton = currentPage === 0
      ? null
      : (
        <button className="step-button" onClick={this.prevPage}>
          {backStr}
        </button>
      );

    // Determine the next button and the appearande of the button
    // If this is the last page
    //  - change next button text to the value of submitStr
    //  - change the click handler
    //  - change its visual appearance (to green bg, with current css)
    const lastPage = pageNumber === pages.length - 1;
    const nextButtonText = lastPage ? submitStr : nextStr;
    const nextButtonClickHandler = lastPage ? this.submitHandler : this.nextPage;
    const nextButtonClassName = `step-button ${lastPage ? 'submit-button' : null}`;

    // Generate the next step button
    const nextButton = (
      <button
        className={nextButtonClassName}
        onClick={nextButtonClickHandler}
      >
        {nextButtonText}
      </button>
    );

    // Wrap the step buttons in a container
    const stepButtonContainer = (
      <div className="step-button-container">
        {backButton}
        {nextButton}
      </div>
    );

    // Create container to hold page info
    const pageIndicatorContainer = (
      <div className="page-indicator-container">
        <span>
          {`Page ${currentPage + 1} of ${pages.length} `}
        </span>
      </div>
    );

    // Return this Stepper page
    return (
      <div>
        <div className="modal-background"></div>
        <div className="modal">
          {cancelButtonContainer}
          {logoContainer}
          {inputContainer}
          {stepButtonContainer}
          {pageIndicatorContainer}
        </div>
      </div>
    );
  }

  render() {
    const { currentPage, innerContainer } = this.state;
    // Use React's createPortal to create this Stepper page
    return createPortal(this.generateMarkup(currentPage), innerContainer);
  }
}

Stepper.propTypes = {
  data: PropTypes.object.isRequired, // TODO: More rigorous  prop type testing should be performed
  onClose: PropTypes.func.isRequired,
};
