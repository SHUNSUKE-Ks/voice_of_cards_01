import { create } from 'zustand';

export type QuestStatus = 'not_started' | 'accepted' | 'in_progress' | 'ready_to_complete' | 'completed';

interface QuestState {
    // Q001: 薬草採集
    q001Status: QuestStatus;
    q001Step: number;

    // Q002: 魔物討伐
    q002Status: QuestStatus;
    q002Step: number;

    // インベントリ
    inventory: {
        herb: number;
        monsterHorn: number;
        gold: number;
    };

    // アクション
    acceptQuest: (questId: 'Q001' | 'Q002') => void;
    collectHerb: () => void;
    defeatBoss: () => void;
    completeQuest: (questId: 'Q001' | 'Q002') => void;
    getQuestStep: (questId: 'Q001' | 'Q002') => number;
    hasItem: (itemId: 'herb' | 'monsterHorn') => boolean;
}

export const useQuestStore = create<QuestState>((set, get) => ({
    q001Status: 'not_started',
    q001Step: 1,
    q002Status: 'not_started',
    q002Step: 1,

    inventory: {
        herb: 0,
        monsterHorn: 0,
        gold: 0,
    },

    acceptQuest: (questId) => {
        if (questId === 'Q001') {
            set({ q001Status: 'accepted', q001Step: 2 });
        } else if (questId === 'Q002') {
            set({ q002Status: 'accepted', q002Step: 2 });
        }
    },

    collectHerb: () => {
        const state = get();
        if (state.q001Status === 'accepted') {
            set({
                q001Status: 'ready_to_complete',
                q001Step: 3,
                inventory: { ...state.inventory, herb: state.inventory.herb + 1 }
            });
        }
    },

    defeatBoss: () => {
        const state = get();
        if (state.q002Status === 'accepted') {
            set({
                q002Status: 'ready_to_complete',
                q002Step: 3,
                inventory: { ...state.inventory, monsterHorn: state.inventory.monsterHorn + 1 }
            });
        }
    },

    completeQuest: (questId) => {
        const state = get();
        if (questId === 'Q001' && state.q001Status === 'ready_to_complete' && state.inventory.herb > 0) {
            set({
                q001Status: 'completed',
                q001Step: 4,
                inventory: {
                    ...state.inventory,
                    herb: state.inventory.herb - 1,
                    gold: state.inventory.gold + 100
                }
            });
        } else if (questId === 'Q002' && state.q002Status === 'ready_to_complete' && state.inventory.monsterHorn > 0) {
            set({
                q002Status: 'completed',
                q002Step: 4,
                inventory: {
                    ...state.inventory,
                    monsterHorn: state.inventory.monsterHorn - 1,
                    gold: state.inventory.gold + 500
                }
            });
        }
    },

    getQuestStep: (questId) => {
        const state = get();
        return questId === 'Q001' ? state.q001Step : state.q002Step;
    },

    hasItem: (itemId) => {
        const state = get();
        if (itemId === 'herb') return state.inventory.herb > 0;
        if (itemId === 'monsterHorn') return state.inventory.monsterHorn > 0;
        return false;
    },
}));
