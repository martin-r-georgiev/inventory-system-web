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
    let timeNow = new Date(2000, 1, 1);
    let formattedTime = timeNow.toLocaleTimeString();

    const {getByTestId} = render(<ChatMessage name="User" message="content" timestamp={timeNow}/>);
    expect(getByTestId('chat-message')).toHaveTextContent("User");
    expect(getByTestId('chat-message')).toHaveTextContent("content");
    expect(getByTestId('chat-message')).toHaveTextContent(formattedTime);
});

it("Matches snapshot", () => {
    const tree = renderer.create(<ChatMessage name="User" message="content" timestamp={Date(2000, 1, 1)}/>).toJSON();

    expect(tree).toMatchSnapshot();
});