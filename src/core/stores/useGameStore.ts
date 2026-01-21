import { create } from 'zustand';

export type ScreenId = 'title' | 'talk' | 'city' | 'map' | 'battle' | 'scenario' | 'menu' | 'shop' | 'collection';

interface GameState {
    currentScreen: ScreenId;
    previousScreen: ScreenId | null;

    // Actions
    navigateTo: (screen: ScreenId) => void;
    goBack: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    currentScreen: 'title',
    previousScreen: null,

    navigateTo: (screen) => set((state) => ({
        previousScreen: state.currentScreen,
        currentScreen: screen,
    })),

    goBack: () => {
        const { previousScreen } = get();
        if (previousScreen) {
            set({ currentScreen: previousScreen, previousScreen: null });
        }
    },
}));
