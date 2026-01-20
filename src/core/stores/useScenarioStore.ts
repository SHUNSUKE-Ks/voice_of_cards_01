import { create } from 'zustand';
import type { ScenarioData, ScenarioCommand } from '../../types/scenario';

interface DisplayedCard {
    cardId: string;
    position: 'left' | 'center' | 'right';
}

interface ScenarioState {
    // Data
    scenarioData: ScenarioData | null;
    currentSceneId: string;
    commandIndex: number;

    // Display state
    displayedCards: DisplayedCard[];
    background: string;
    currentText: { speaker: string; content: string } | null;
    currentChoices: { label: string; nextScene: string; action?: string }[] | null;
    isWaitingForInput: boolean;

    // Actions
    loadScenario: (data: ScenarioData) => void;
    startScene: (sceneId: string) => void;
    nextCommand: () => ScenarioCommand | null;
    processCommand: (cmd: ScenarioCommand) => void;
    selectChoice: (index: number) => void;
    showCard: (cardId: string, position: 'left' | 'center' | 'right') => void;
    hideCard: (cardId: string) => void;
    setBackground: (bg: string) => void;
    reset: () => void;
}

const initialState = {
    scenarioData: null,
    currentSceneId: 'start',
    commandIndex: 0,
    displayedCards: [],
    background: '',
    currentText: null,
    currentChoices: null,
    isWaitingForInput: false,
};

export const useScenarioStore = create<ScenarioState>((set, get) => ({
    ...initialState,

    loadScenario: (data) => {
        set({
            scenarioData: data,
            currentSceneId: 'start',
            commandIndex: 0,
            displayedCards: [],
            background: '',
            currentText: null,
            currentChoices: null,
            isWaitingForInput: false,
        });
    },

    startScene: (sceneId) => {
        set({
            currentSceneId: sceneId,
            commandIndex: 0,
            currentChoices: null,
            isWaitingForInput: false,
        });
    },

    nextCommand: () => {
        const { scenarioData, currentSceneId, commandIndex } = get();
        if (!scenarioData) return null;

        const scene = scenarioData.scenes[currentSceneId];
        if (!scene || commandIndex >= scene.length) return null;

        return scene[commandIndex];
    },

    processCommand: (cmd) => {
        const state = get();

        switch (cmd.type) {
            case 'text':
                set({
                    currentText: { speaker: cmd.speaker, content: cmd.content },
                    isWaitingForInput: true,
                    commandIndex: state.commandIndex + 1,
                });
                break;

            case 'show_card':
                state.showCard(cmd.cardId, cmd.position);
                set({ commandIndex: state.commandIndex + 1 });
                // Auto-advance for non-blocking commands
                setTimeout(() => {
                    const next = get().nextCommand();
                    if (next) {
                        get().processCommand(next);
                    }
                }, 0);
                break;

            case 'hide_card':
                state.hideCard(cmd.cardId);
                set({ commandIndex: state.commandIndex + 1 });
                setTimeout(() => {
                    const next = get().nextCommand();
                    if (next) {
                        get().processCommand(next);
                    }
                }, 0);
                break;

            case 'bg':
                state.setBackground(cmd.value);
                set({ commandIndex: state.commandIndex + 1 });
                setTimeout(() => {
                    const next = get().nextCommand();
                    if (next) {
                        get().processCommand(next);
                    }
                }, 0);
                break;

            case 'choice':
                set({
                    currentChoices: cmd.options,
                    isWaitingForInput: true,
                    commandIndex: state.commandIndex + 1,
                });
                break;

            case 'jump':
                state.startScene(cmd.nextScene);
                // Process first command of new scene
                setTimeout(() => {
                    const next = get().nextCommand();
                    if (next) get().processCommand(next);
                }, 0);
                break;

            case 'battle':
                // For now, just jump to next scene after battle
                // TODO: Integrate with battle system
                console.log('Battle triggered:', cmd.enemyId);
                state.startScene(cmd.nextScene);
                setTimeout(() => {
                    const next = get().nextCommand();
                    if (next) get().processCommand(next);
                }, 0);
                break;
        }
    },

    selectChoice: (index) => {
        const { currentChoices } = get();
        if (!currentChoices || !currentChoices[index]) return;

        const choice = currentChoices[index];
        set({ currentChoices: null, isWaitingForInput: false });

        get().startScene(choice.nextScene);
        setTimeout(() => {
            const next = get().nextCommand();
            if (next) get().processCommand(next);
        }, 0);
    },

    showCard: (cardId, position) => {
        set((state) => ({
            displayedCards: [
                ...state.displayedCards.filter(c => c.position !== position),
                { cardId, position }
            ]
        }));
    },

    hideCard: (cardId) => {
        set((state) => ({
            displayedCards: state.displayedCards.filter(c => c.cardId !== cardId)
        }));
    },

    setBackground: (bg) => {
        set({ background: bg });
    },

    reset: () => {
        set(initialState);
    },
}));
