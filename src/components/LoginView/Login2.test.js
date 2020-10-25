import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import mockStore from '../../utils/store-mocker';

import Login from './Login2'


it('should display user name', async () => {
  const store = mockStore({
    logReducer: {
      username:'jane.doe', 
      loggedIn:false
    }
  });

  const { getByText } = render(
    <Provider store={store}><Login /></Provider>
  );

  getByText('Password:');
});