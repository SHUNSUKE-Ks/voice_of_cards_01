import { useGameStore } from './core/stores/useGameStore';
import { MapScreen } from './screens/MapScreen';
import './App.css';

function TitleScreen() {
  const { navigateTo } = useGameStore();

  return (
    <div className="title-screen">
      <h1 className="game-title">Voice of Cards</h1>
      <p className="subtitle">カードで紡ぐ冒険の物語</p>
      <div className="menu-buttons">
        <button
          className="menu-button"
          onClick={() => navigateTo('map')}
        >
          New Game
        </button>
        <button className="menu-button" disabled>
          Continue
        </button>
        <button className="menu-button" disabled>
          Collection
        </button>
      </div>
    </div>
  );
}

function App() {
  const { currentScreen } = useGameStore();

  switch (currentScreen) {
    case 'map':
      return <MapScreen />;
    case 'title':
    default:
      return <TitleScreen />;
  }
}

export default App;
