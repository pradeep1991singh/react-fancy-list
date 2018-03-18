// @flow

import type { Store } from '../src/store/type-store'

export const PLANETS =
    [{
        "name": "Alderaan",
        "rotation_period": "24",
        "orbital_period": "364",
        "diameter": "12500",
        "climate": "temperate",
        "gravity": "1 standard",
        "terrain": "grasslands, mountains",
        "surface_water": "40",
        "population": "2000000000",
        "residents": ["https://swapi.co/api/people/5/", "https://swapi.co/api/people/68/", "https://swapi.co/api/people/81/"],
        "films": ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"],
        "created": "2014-12-10T11:35:48.479000Z",
        "edited": "2014-12-20T20:58:18.420000Z",
        "url": "https://swapi.co/api/planets/2/",
        "id": 0,
        "order": 0,
        "text": "Alderaan - 2000000000",
        "type": "odd"
    }, {
        "name": "Yavin IV",
        "rotation_period": "24",
        "orbital_period": "4818",   
        "diameter": "10200",
        "climate": "temperate, tropical",
        "gravity": "1 standard",
        "terrain": "jungle, rainforests",
        "surface_water": "8",
        "population": "1000",
        "residents": [],
        "films": ["https://swapi.co/api/films/1/"],
        "created": "2014-12-10T11:37:19.144000Z",
        "edited": "2014-12-20T20:58:18.421000Z",
        "url": "https://swapi.co/api/planets/3/",
        "id": 1,
        "order": 1,
        "text": "Yavin IV - 1000",
        "type": "even"
    }]


export function getStore(store?: Store) {
    return {
        getState() {
            return {
                planetStore: {
                    planets: PLANETS
                },

                dispatch() {
                    // $FlowFixMe 
                    return jest.fn()
                },
                subscribe() {
                    // $FlowFixMe 
                    return jest.fn()
                },
            }
        }
    }
}
