import React from 'react';

import Router from '../../../router';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';
import {NavigationContainer} from '@react-navigation/native';

  const App = () => {    
          return (
          <Provider store={store}>
            <NavigationContainer>
              <Router />  
            </NavigationContainer>
          </Provider>
  );
};

export default App;
