// @flow

// Store selectors help in 
// filtering states out of redux store

import type { Store } from './type-store'

export const getSearchedPlanet = (state: Store, planetName: string) =>
    state.planetStore.planets.filter(planet => {
        if (planet.name.indexOf(planetName) > -1)
            return planet;
    })

