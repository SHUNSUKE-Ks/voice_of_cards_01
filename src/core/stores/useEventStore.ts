import { create } from 'zustand';

// イベントカードのデータ型
export interface EventCardData {
    type: 'battle' | 'treasure' | 'quest' | 'info';
    title: string;
    subtitle?: string;
    icon?: string;
    onComplete?: () => void;
    autoCloseDelay?: number;
}

interface EventState {
    currentEvent: EventCardData | null;

    // Actions
    showEvent: (event: EventCardData) => void;
    closeEvent: () => void;
    showBattleEvent: (enemyName?: string, onComplete?: () => void) => void;
}

export const useEventStore = create<EventState>((set) => ({
    currentEvent: null,

    showEvent: (event) => {
        set({ currentEvent: event });
    },

    closeEvent: () => {
        set({ currentEvent: null });
    },

    // バトル開始イベントのショートカット
    showBattleEvent: (enemyName, onComplete) => {
        set({
            currentEvent: {
                type: 'battle',
                title: '敵が現れた！',
                subtitle: enemyName,
                icon: '⚔️',
                onComplete,
                autoCloseDelay: 0, // 手動クローズ
            },
        });
    },
}));
