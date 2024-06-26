import React from 'react';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "../src/components/routes"
import { Provider } from 'react-redux';
import { store, persistor } from './components/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { app } from './firebase.config';

function App() {
  return (
    <div className="App">
      <Provider store={store} app={app}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
