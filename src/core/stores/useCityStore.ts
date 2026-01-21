import { create } from 'zustand';

// シティカードの種類
export interface CityCardData {
    id: string;
    type: 'weapon' | 'armor' | 'inn' | 'tavern' | 'shop' | 'church' | 'exit' | 'mayor';
    label: string;
    icon: string;
    position: { x: number; y: number };
}

// シティデータ
export interface CityData {
    id: string;
    name: string;
    cards: CityCardData[];
}

interface CityState {
    isOpen: boolean;
    currentCity: CityData | null;
    isAnimating: boolean;

    // Actions
    openCity: (city: CityData) => void;
    closeCity: () => void;
    setAnimating: (isAnimating: boolean) => void;
}

// デフォルトのシティデータ
export const DEMO_CITY: CityData = {
    id: 'city_01',
    name: '始まりの街',
    cards: [
        { id: 'c1', type: 'weapon', label: '武器屋', icon: '⚔️', position: { x: -300, y: -150 } },
        { id: 'c2', type: 'inn', label: '宿屋', icon: '🏨', position: { x: 0, y: -150 } },
        { id: 'c3', type: 'tavern', label: '酒場', icon: '🍺', position: { x: 300, y: -150 } },
        { id: 'c4', type: 'mayor', label: '町長の家', icon: '🏛️', position: { x: 0, y: 0 } },
        { id: 'c5', type: 'shop', label: '道具屋', icon: '🎒', position: { x: -300, y: 150 } },
        { id: 'c6', type: 'church', label: '教会', icon: '⛪', position: { x: 0, y: 150 } },
        { id: 'c7', type: 'exit', label: '出口', icon: '🚪', position: { x: 300, y: 150 } },
    ],
};

export const useCityStore = create<CityState>((set) => ({
    isOpen: false,
    currentCity: null,
    isAnimating: false,

    openCity: (city) => {
        set({ isOpen: true, currentCity: city, isAnimating: true });
    },

    closeCity: () => {
        set({ isOpen: false, currentCity: null, isAnimating: false });
    },

    setAnimating: (isAnimating) => {
        set({ isAnimating });
    },
}));
