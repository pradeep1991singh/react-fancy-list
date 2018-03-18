import { put, call } from 'redux-saga/effects'

import planetsStoreReducer, {
    initialState,
    getPlanetList,
    getPlanetListSaga,
    getPlanetListSuccess,
    getPlanetListFail,
} from '../planets-store'
import { getApiPlanetList } from '../../api';
import {
    PLANETS,
} from '../../../__mocks__/static-data'


describe('PlanetsStore', () => {
    it('should send get planet list request properly', () => {
        const gen = getPlanetListSaga(getPlanetList());
        expect(gen.next().value).toEqual(call(getApiPlanetList))
        const data = {
            results: PLANETS
        }
        expect(gen.next(data).value).toEqual(put(getPlanetListSuccess(data.results)))
        expect(gen.next().done).toBe(true)
    })
})
