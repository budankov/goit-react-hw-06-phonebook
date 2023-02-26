import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from '../redux/store';

import Phonebook from './Phonebook/Phonebook';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Phonebook />
      </PersistGate>
    </Provider>
  );
};

export default App;
