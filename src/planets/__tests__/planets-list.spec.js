import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import { PlanetList } from '../planets-list';

import {
    getStore,
} from '../../../__mocks__/static-data'

describe('PlanetList', () => {
    let wrapper;
    let tree;
    const store = getStore();
    const getPlanetList = jest.fn();

    beforeEach(() => {
        wrapper = renderer.create(
            <Provider store={store}>
                <PlanetList getPlanetList={getPlanetList} />
            </Provider>);

        tree = wrapper.toJSON()
    })

    it('should render PlanetList properly', () => {
        expect(tree).toMatchSnapshot();
    });

    it('should call getPlanetList on componentDidMount', () => {
        expect(getPlanetList).toHaveBeenCalled()
    })
});
