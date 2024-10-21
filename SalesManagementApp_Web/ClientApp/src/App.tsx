import { RelayEnvironmentProvider } from 'react-relay';
import './App.css';
import React, { Suspense } from 'react';
import relayEnvironment from './relayEnvironment';
import PageWithTabs from './components/BasePage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import Loading from './modules/LoadingSpinner';


function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback={<Loading />}>
        <PageWithTabs />
        </Suspense>
      </LocalizationProvider>
    </RelayEnvironmentProvider>

  );
}

export default App;