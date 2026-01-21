import { useEffect } from 'react';
import { useGameStore } from './core/stores/useGameStore';
import { useTalkStore } from './core/stores/useTalkStore';
import { useEventStore } from './core/stores/useEventStore';
import { MapScreen } from './screens/MapScreen';
import { TalkLayer } from './layers/TalkLayer/TalkLayer';
import { EventCard } from './layers/TalkLayer/EventCard';
import { GameViewport } from './components/GameViewport';
import { DebugPanel } from './debug/DebugPanel';
import demoTalkData from './data/talk/demo_talk.json';
import './App.css';

function TitleScreen() {
  const { navigateTo } = useGameStore();
  const { openTalk } = useTalkStore();
  const { showBattleEvent } = useEventStore();

  // New Game: TalkLayer で会話を開始 → 終了後マップへ
  const handleNewGame = () => {
    openTalk(demoTalkData.dialogs);
    navigateTo('talk');
  };

  const handleTestBattle = () => {
    showBattleEvent('スライム vs ゴブリン', () => {
      console.log('Battle event closed!');
    });
  };

  // Test Map: 直接マップへ
  const handleTestMap = () => {
    navigateTo('map');
  };

  return (
    <div className="title-screen">
      <h1 className="game-title">Voice of Cards</h1>
      <p className="subtitle">カードで紡ぐ冒険の物語</p>
      <div className="menu-buttons">
        <button
          className="menu-button"
          onClick={handleNewGame}
        >
          New Game
        </button>
        <button className="menu-button" disabled>
          Continue
        </button>
        <button className="menu-button" disabled>
          Collection
        </button>
        <button
          className="menu-button"
          onClick={handleTestBattle}
        >
          Test Battle
        </button>
        <button
          className="menu-button"
          onClick={handleTestMap}
        >
          Test Map
        </button>
      </div>
    </div>
  );
}

// 会話画面（TalkLayer表示用の背景）
function TalkScreen() {
  const { isVisible } = useTalkStore();
  const { navigateTo } = useGameStore();

  // Talk終了後にマップへ遷移
  useEffect(() => {
    const unsubscribe = useTalkStore.subscribe((state, prevState) => {
      if (prevState.isVisible && !state.isVisible) {
        navigateTo('map');
      }
    });
    return () => unsubscribe();
  }, [navigateTo]);

  return (
    <div className="talk-screen">
      {!isVisible && <div className="loading">Loading...</div>}
    </div>
  );
}

function App() {
  const { currentScreen } = useGameStore();
  const { currentEvent, closeEvent } = useEventStore();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'talk':
        return <TalkScreen />;
      case 'map':
        return <MapScreen />;
      case 'title':
      default:
        return <TitleScreen />;
    }
  };

  return (
    <>
      <GameViewport>
        {renderScreen()}
        <TalkLayer />
        <EventCard event={currentEvent} onClose={closeEvent} />
      </GameViewport>
      <DebugPanel />
    </>
  );
}

export default App;
