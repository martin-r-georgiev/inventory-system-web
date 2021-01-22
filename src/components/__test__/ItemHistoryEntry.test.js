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
    let timeDate = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    let formattedTime = timeDate.toUTCString();

    const {getByTestId} = render(<ItemHistoryEntry timestamp={timeDate} quantity="40" trend="up"/>);

    expect(getByTestId('item-entry-body')).toHaveTextContent(formattedTime.toString());
    expect(getByTestId('item-entry-body')).toHaveTextContent("40");
});

it("Matches snapshot", () => {
    let timeDate = new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0));
    const tree = renderer.create(<ItemHistoryEntry timestamp={timeDate} quantity="40" trend="up"/>).toJSON();

    expect(tree).toMatchSnapshot();
});