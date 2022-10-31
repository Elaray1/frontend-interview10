import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { EmailVerificationHistory } from '../components';

import './global.css';

function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider position="top-right">
        <EmailVerificationHistory />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
