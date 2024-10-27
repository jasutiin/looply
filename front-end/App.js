import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './components/UserProvider';

import Navigation from './components/Navigation';

export default function App() {
  return (
    <UserProvider>
      <Navigation />
      <StatusBar style="light" />
    </UserProvider>
  );
}
