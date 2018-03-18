// @flow

import type { CustomError, InitialTestAction } from '../common/type-common'

export type Planet = {
    climate: string,
    created: string,
    diameter: string,
    edited: string,
    films: Array<string>,
    gravity: string,
    id: number,
    name: string,
    orbital_period: string,
    order: number,
    population: string,
    residents: Array<string>,
    rotation_period: string,
    surface_water: string,
    terrain: string,
    text: string,
    type: string,
    url: string,
}

export type PlanetListProps = {
    planets: Array<Planet>,
    getPlanetList: () => void
}

export type PlanetListStates = {
    totalPlanets: Array<Planet>,
    planets: Array<Planet>,
    searchText: string,
    offset: number,
    total: number,
    currentCount: number,
    isLoading: boolean
}

export type PlanetStore = {
    isLoading: boolean,
    planets: Array<Planet>,
    error: CustomError,
}

export const GET_PLANET_LIST = 'GET_PLANET_LIST';
export type GetPlanetListAction = {
    type: typeof GET_PLANET_LIST,
}

export const GET_PLANET_LIST_SUCCESS = 'GET_PLANET_LIST_SUCCESS';
export type GetPlanetListSuccessAction = {
    type: typeof GET_PLANET_LIST_SUCCESS,
    data: Array<Planet>
}

export const GET_PLANET_LIST_FAIL = 'GET_PLANET_LIST_FAIL';
export type GetPlanetListFailAction = {
    type: typeof GET_PLANET_LIST_FAIL,
    error: CustomError
}

export type PlanetStoreAction =
    | GetPlanetListAction
    | GetPlanetListSuccessAction
    | GetPlanetListFailAction
    | InitialTestAction
