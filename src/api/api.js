// @flow

import { API_BASE_URL, PLANETS_API } from './api-constants';
import { apiCall } from './api-utils';

// search api
export const getApiPlanetList = () =>
    apiCall(`${API_BASE_URL}${PLANETS_API}?format=json`);
