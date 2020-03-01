import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { render } from '@testing-library/react';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
* Factory function to create a ShallowWrapper for the App component.
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {object} state - Initial state for setup.
* @returns {ShallowWrapper}
*/

const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />);
    if(state) wrapper.setState(state);
    return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 * */

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test('renders without errors', () => {
    // console.log(wrapper.debug())
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
    // expect(wrapper).toBeTruthy();
});

test('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper,"counter-display");
    expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0)
});


describe("Increment", () => {
    test('renders increment button', () => {
        const wrapper = setup();
        const button = findByTestAttr(wrapper,"increment-button");
        expect(button.length).toBe(1);
    });

    test('clicking button increments counter on display', () => {
        const counter = 7;
        const wrapper = setup(null, { counter });

        // find button and click
        const button = findByTestAttr(wrapper, 'increment-button');
        button.simulate('click');

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper,"counter-display");
        expect(counterDisplay.text()).toContain(counter + 1)

    });
});

describe("Decrement", () => {
    test('renders decrement button', () => {
        const wrapper = setup();
        const counterDecrement = findByTestAttr(wrapper, 'decrement-button');
        expect(counterDecrement.length).toBe(1);
    });

    test('clicking decrement button decrements the counter on display when state is greater than 0', () => {
        const state = {
            counter: 7,
            showError: false
        };
        const wrapper = setup(null, state);

        // find and click on decrement button
        const decrementButton = findByTestAttr(wrapper, 'decrement-button');
        decrementButton.simulate('click');

        // find display and test value
        const counterDisplay = findByTestAttr(wrapper,"counter-display");
        expect(counterDisplay.text()).toContain(state.counter - 1);
    });

    test('error does not show when not needed', () => {
        // find error if below 0
        const wrapper = setup();
        const counterError = findByTestAttr(wrapper, 'counter-error');
        expect(counterError.length).toBe(0);
    });

    describe('counter is 0 and decrement is clicked', () => {
        let wrapper;
        beforeEach(() => {
            // no need to set counter value here; default value of 0 is good
            wrapper = setup();

            // find button and click
            const button = findByTestAttr(wrapper, 'decrement-button');
            button.simulate('click');
            wrapper.update();
        });

        test('error shows', () => {
            // check the length of the error message
            const counterError = findByTestAttr(wrapper, 'counter-error');
            expect(counterError.length).toBe(1);
        });
        test('counter still displays 0', () => {
            const counterDisplay = findByTestAttr(wrapper, 'counter-display');
            expect(counterDisplay.text()).toContain(0);
        });
        test('clicking increment clears the error', () => {
            // find and click the increment button
            const button = findByTestAttr(wrapper, 'increment-button');
            button.simulate('click');

            // check the class of the error message
            // check the length of the error message
            const counterError = findByTestAttr(wrapper, 'counter-error');
            expect(counterError.length).toBe(0);
        });
    });
})