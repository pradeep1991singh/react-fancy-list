// @flow 

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import PlanetList from './planets/planets-list';
import './app.css';

class App extends Component<void, void> {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <PlanetList />
        </div>
      </Provider>
    );
  }
}

export default App;
