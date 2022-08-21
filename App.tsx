import { StatusBar } from 'expo-status-bar';

import RMCharacter from './components/RMCharacter';
import { ModalVisibilityProvider } from './components/ModalVisibilityContext';

const App = () => {
  return (
    <ModalVisibilityProvider>

      <RMCharacter />

      <StatusBar backgroundColor='#f5f5f5' style="dark" />

    </ModalVisibilityProvider>
  );
}

export default App;