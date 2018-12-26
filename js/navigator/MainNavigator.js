import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import Home    from '../screens/home';
import Details  from '../screens/details';

export default createStackNavigator ({
    Home: { screen: Home},
    Details: { screen: Details}
  });
  