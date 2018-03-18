import React from 'react';
import renderer from 'react-test-renderer';
import DragDropList from '../drag-drop-list';

import {
    PLANETS,
} from '../../../../__mocks__/static-data'

describe('DragDropList', () => {
    let wrapper;
    let tree;

    beforeEach(() => {
        wrapper = renderer.create(
            <DragDropList items={PLANETS} />
        );

        tree = wrapper.toJSON()
    })

    it('should render DragDropList properly', () => {
        expect(tree).toMatchSnapshot();
    });
});
