// @flow

import { SERVER_ERROR_CODE } from './api-constants';
import type { ApiData } from './type-api'

export const options = (
  method: string = 'GET',
  body: ?{ [string]: any } = null
) => {
  let data: ApiData = {
    method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    data.body = JSON.stringify(body);
  }

  return data;
};

export const apiCall = (url: string) =>
  fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res
          .json()
          .then(response => ({
            payload: response
          }))
          .catch(error => ({
            error
          }));
      } else {
        // Fail if status code is above 300
        return res.text().then(response => ({
          error: response
        }));
      }
    })
    .then((response: any) => {
      if (response.payload && !response.error) {
        return response.payload
      } else {
        // if response contains error, that means we got error
        let errorResponse = {
          message: response.error,
          code: SERVER_ERROR_CODE
        };
        throw new Error(JSON.stringify(errorResponse));
      }
    })

    .catch(error => {
      // we don't want to throw JavaScript with simple message
      let errorResponse = {
        message: error.message,
        code: SERVER_ERROR_CODE
      };
      throw new Error(JSON.stringify(errorResponse));
    });
