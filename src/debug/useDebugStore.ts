import { create } from 'zustand';
import {
    DIALOG_CARD,
    LEFT_CARD,
    RIGHT_TOP_CARD,
    RIGHT_BOTTOM_CARD,
    type CardLayoutConfig
} from '../config/talkLayoutConfig';

interface DebugState {
    isDebugMode: boolean;
    isEditMode: boolean;
    selectedElement: string | null;
    isDragging: boolean;

    // カード位置（コンフィグから初期化）
    dialogCard: CardLayoutConfig;
    leftCard: CardLayoutConfig;
    rightTopCard: CardLayoutConfig;
    rightBottomCard: CardLayoutConfig;

    // Actions
    toggleDebugMode: () => void;
    toggleEditMode: () => void;
    selectElement: (id: string | null) => void;
    setDragging: (isDragging: boolean) => void;
    updatePosition: (id: string, pos: Partial<CardLayoutConfig>) => void;
    resetPositions: () => void;
    exportPositions: () => string;
}

export const useDebugStore = create<DebugState>((set, get) => ({
    isDebugMode: false,
    isEditMode: false,
    selectedElement: null,
    isDragging: false,

    // コンフィグファイルからの初期位置
    dialogCard: { ...DIALOG_CARD },
    leftCard: { ...LEFT_CARD },
    rightTopCard: { ...RIGHT_TOP_CARD },
    rightBottomCard: { ...RIGHT_BOTTOM_CARD },

    toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),

    toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

    selectElement: (id) => set({ selectedElement: id }),

    setDragging: (isDragging) => set({ isDragging }),

    updatePosition: (id, pos) => {
        const validKeys = ['dialogCard', 'leftCard', 'rightTopCard', 'rightBottomCard'];
        if (validKeys.includes(id)) {
            set((state) => ({
                [id]: { ...(state as any)[id], ...pos },
            }));
        }
    },

    resetPositions: () => set({
        dialogCard: { ...DIALOG_CARD },
        leftCard: { ...LEFT_CARD },
        rightTopCard: { ...RIGHT_TOP_CARD },
        rightBottomCard: { ...RIGHT_BOTTOM_CARD },
    }),

    exportPositions: () => {
        const state = get();
        const positions = {
            dialogCard: state.dialogCard,
            leftCard: state.leftCard,
            rightTopCard: state.rightTopCard,
            rightBottomCard: state.rightBottomCard,
        };
        return JSON.stringify(positions, null, 2);
    },
}));
