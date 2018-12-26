import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home    from './screens/home';

const RootStack = createStackNavigator({
  Home: { screen: Home},
});

const Main = createAppContainer(RootStack);

export default Main;



