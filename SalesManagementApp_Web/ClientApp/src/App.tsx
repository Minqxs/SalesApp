import { RelayEnvironmentProvider } from 'react-relay';
import './App.css';
import React from 'react';
import relayEnvironment from './relayEnvironment';
import PageWithTabs from './components/BasePage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'


function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PageWithTabs />
      </LocalizationProvider>
    </RelayEnvironmentProvider>

  );
}

export default App;