import './App.css';
import FieldGame from './components/FieldGame';
import Header from './components/Header';
import GameProvider from './context/GameContext';

function App() {
  return (
    <GameProvider>
      <main className="container">
        <Header />
        <FieldGame />
      </main>
    </GameProvider>
  );
}

export default App;
