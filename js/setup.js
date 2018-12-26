'use strict';

import React    from "react";
import Startup  from './Startup';
import store    from './store/configureStore';

import {Provider}     from 'react-redux';
import configureStore from './store/configureStore';

if(typeof global.self === "undefined")
{
    global.self = global;
}

  export default class setup extends React.Component {
    state: {
      store: any
    };

    constructor() {
      super();
      this.state = {
        storeCreated: false,
        storeRehydrated: false,
        store: null
      };
    }

    componentDidMount() {
     this.setState({
      store : store,
      storeCreated: true,
     });
    }

    render() {
      if (!this.state.storeCreated) {
        return null;
      }
      return (
        <Provider store={store}>
          <Startup />
        </Provider>
      );
    }
  }



