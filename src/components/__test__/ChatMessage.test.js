import React from 'react';
import ReactDOM from 'react-dom';
import { itTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

import ChatMessage from '../ChatMessage';

afterEach(cleanup);

it("Renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<ChatMessage/>, div);
});

it("Renders ChatMessage component correctly", () => {
    let timeDate = new Date(Date.UTC(2000, 1, 1));
    timeDate.setHours(0,0,0,0);
    let formattedTime = timeDate.toLocaleTimeString();

    const {getByTestId} = render(<ChatMessage name="User" message="content" timestamp={timeDate}/>);
    expect(getByTestId('chat-message')).toHaveTextContent("User");
    expect(getByTestId('chat-message')).toHaveTextContent("content");
    expect(getByTestId('chat-message')).toHaveTextContent(formattedTime);
});

it("Matches snapshot", () => {
    let timeDate = new Date(Date.UTC(2000, 1, 1));
    timeDate.setHours(0,0,0,0);
    const tree = renderer.create(<ChatMessage name="User" message="content" timestamp={timeDate}/>).toJSON();

    expect(tree).toMatchSnapshot();
});