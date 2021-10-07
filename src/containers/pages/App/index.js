import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Router from '../../../router';
import { Text } from 'react-native';

const App = () => {

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
