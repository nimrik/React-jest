import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            showError: false
        }
    }

    changeCounter = (state) => {
        if(state) {
            this.setState({ counter: this.state.counter + 1});
            this.setState({ showError: false});
        } else {
            if(this.state.counter <= 0) {
                return this.setState({ showError: true})
            } else {
                this.setState({ showError: false});
                this.setState({ counter: this.state.counter - 1});
            }
        }
    }

    render() {
        return (
            <div className="App" data-test="component-app">
                <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
                {this.state.showError && <h2 data-test="counter-error">The counter can't go below 0</h2>}
                <button
                    data-test="increment-button"
                    onClick={() => this.changeCounter(true)}
                >
                    increment counter
                </button>
                <button
                    data-test="decrement-button"
                    onClick={() => this.changeCounter(false)}
                >
                    decrement counter
                </button>
            </div>
        )
    }
}

export default App;
