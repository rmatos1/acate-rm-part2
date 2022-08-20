import { StatusBar } from 'expo-status-bar';

import RMCharacter from './components/RMCharacter';

const App = () => {
  return (
    <>

      <RMCharacter />

      <StatusBar backgroundColor='#f5f5f5' style="dark" />

    </>
  );
}

export default App;