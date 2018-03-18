// @flow

import { put, takeLatest, call } from 'redux-saga/effects'
import {
	GET_PLANET_LIST,
	GET_PLANET_LIST_SUCCESS,
	GET_PLANET_LIST_FAIL,
} from './type-planets';
import { getApiPlanetList } from '../api';

import type {
	Planet,
		PlanetStore,
		GetPlanetListAction,
		GetPlanetListSuccessAction,
		GetPlanetListFailAction,
		PlanetStoreAction
} from './type-planets';

import type { CustomError } from '../common/type-common';

export const initialState: PlanetStore = {
	isLoading: false,
	planets: [],
	error: {
		code: '',
		message: ''
	},
};

export const getPlanetList = (): GetPlanetListAction => ({
	type: GET_PLANET_LIST,
})

export const getPlanetListSuccess = (data: Array<Planet>): GetPlanetListSuccessAction => ({
	type: GET_PLANET_LIST_SUCCESS,
	data
});

export const getPlanetListFail = (error: CustomError): GetPlanetListFailAction => ({
	type: GET_PLANET_LIST_FAIL,
	error
});

export function* getPlanetListSaga(action: GetPlanetListAction): Generator<*, *, *> {
	try {
		const data = yield call(getApiPlanetList);
		const results = data.results.map((d, i) => {
			const type = (i + 1) % 2 === 0 ? 'even' : 'odd';
			d = { ...d, id: i, order: i, text: `${d.name} - ${d.population}`, type }
			return d;
		})
		yield put(getPlanetListSuccess(results));
	} catch (e) {
		yield put(getPlanetListFail(e));
	}
}

export function* watchGetPlanetList(): Generator<*, *, *> {
	yield takeLatest(GET_PLANET_LIST, getPlanetListSaga);
}

export default function searchReducer(
	state: PlanetStore = initialState,
	action: PlanetStoreAction
) {
	switch (action.type) {
		case GET_PLANET_LIST:
			return {
				...state,
				isLoading: true
			};

		case GET_PLANET_LIST_SUCCESS:
			return {
				...state,
				isLoading: false,
				planets: action.data
			};

		case GET_PLANET_LIST_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.error
			};

		default:
			return state;
	}
}
