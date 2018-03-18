import React from 'react';
import renderer from 'react-test-renderer';
import DragDropItem from '../drag-drop-item';

import {
    PLANETS,
} from '../../../../__mocks__/static-data'

describe('DragDropList', () => {
    let wrapper;
    let tree;
    const swapCards = jest.fn();

    beforeEach(() => {

        console.log(PLANETS[0])

        wrapper = renderer.create(
            <DragDropItem {...PLANETS[0]} swapCards={swapCards} />
        );

        tree = wrapper.toJSON()
    })

    // TODO:PS: $FixMe
    xit('should render DragDropList properly', () => {
        expect(tree).toMatchSnapshot();
    });
});
