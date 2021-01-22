import React from 'react';
import ReactDOM from 'react-dom';
import { itTSAnyKeyword } from '@babel/types';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import renderer from 'react-test-renderer';

import ItemHistoryEntry from '../ItemHistoryEntry';

afterEach(cleanup);

it("Renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<ItemHistoryEntry/>, div);
});

it("Renders ItemHistoryEntry component correctly", () => {
    let timeNow = new Date(2000, 1, 1);
    let formattedTime = timeNow.toUTCString();

    const {getByTestId} = render(<ItemHistoryEntry timestamp={timeNow} quantity="40" trend="up"/>);

    expect(getByTestId('item-entry-body')).toHaveTextContent(formattedTime.toString());
    expect(getByTestId('item-entry-body')).toHaveTextContent("40");
});

it("Matches snapshot", () => {
    const tree = renderer.create(<ItemHistoryEntry timestamp={Date(2000, 1, 1)} quantity="40" trend="up"/>).toJSON();

    expect(tree).toMatchSnapshot();
});