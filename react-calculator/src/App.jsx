import React from 'react'
import DigitButton from './Components/DigitButton'
import OperationButton from './Components/OperationButton'
import ErrorBoundary from './Components/ErrorHandler/ErrorBoundary'
import {ACTIONS} from './Components/Utils'
import './Styles/App.less'

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = React.useReducer(reducer, {})

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (payload.digit === "0" && state.currentOperand === "0") return state; //Don't add zeros.
        if (payload.digit === "." && state.currentOperand && state.currentOperand.includes(".")) return state; //Don't add zeros.
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }
      case ACTIONS.CLEAR:
        return {};
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.previousOperand == null) {
          return state;
        }

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation
          }
        }

        if (state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
        }
      case ACTIONS.DELETE_DIGIT:
        if (state.currentOperand == null) return state;
        if (state.currentOperand.length === 1) return { ...state, currentOperand: null }
        return { ...state, currentOperand: state.currentOperand.slice(0, -1) }
      case ACTIONS.EVALUATE:
        if (state.operation == null && state.currentOperand == null && state.previousOperand == null) {
          return state
        }

        return {
          ...state,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
    }
  }

  function evaluate({ currentOperand, previousOperand, operation }) {

    const prev = parseFloat(previousOperand)
    const curr = parseFloat(currentOperand)

    if (isNaN(prev) || isNaN(curr)) return "";
    let computation = "";
    switch (operation) {
      case "+":
        computation = prev + curr
        break;
      case "-":
        computation = prev - curr
        break;
      case "/":
        computation = prev / curr
        break;
      case "*":
        computation = prev * curr
        break;
    }
    return computation.toString();
  }

  function numberWithCommas(x) {
    if (x != null) {
      if(x % 1 != 0) x = parseFloat(x).toFixed(3);
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }

  return (
    <div className="App">
      <ErrorBoundary>
        <h2>Calculator for InnoCV</h2>
        <h3>By <a href="https://www.linkedin.com/in/sebastian-paduano-4810b1136/"> Sebastian Paduano 🤓 🧮  </a> (2023)</h3>
        <div className="calculator-grid">
          <div className="output">
          <div className="previous-operand">{numberWithCommas(previousOperand)} {operation}</div>
          <div className="current-operand">{numberWithCommas(currentOperand)}</div>
          </div>
          <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="span-two">AC</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
          <OperationButton operation="/" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="span-two">=</button>
        </div>
        <h4>Built with Vite</h4>
      </ErrorBoundary>
    </div>
  )
}

export default App
