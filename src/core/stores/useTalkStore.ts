import { create } from 'zustand';

// 選択肢の型
export interface TalkChoice {
    id: string;
    label: string;
    nextDialogId?: string;
}

interface TalkDialog {
    id: string;
    speaker: string;
    speakerName: string;
    content: string;
    highlights?: string[];
    leftCard?: string;
    rightTopCard?: string;
    rightBottomCard?: string;
    animation?: 'enter' | 'shake' | 'fade';
    choices?: TalkChoice[]; // 選択肢（あれば）
}

interface TalkState {
    isVisible: boolean;
    dialogs: TalkDialog[];
    currentIndex: number;

    // Actions
    openTalk: (dialogs: TalkDialog[]) => void;
    closeTalk: () => void;
    nextDialog: () => boolean;
    prevDialog: () => boolean;
    getCurrentDialog: () => TalkDialog | null;
    selectChoice: (choice: TalkChoice) => void;
    hasChoices: () => boolean;
}

export const useTalkStore = create<TalkState>((set, get) => ({
    isVisible: false,
    dialogs: [],
    currentIndex: 0,

    openTalk: (dialogs) => {
        set({
            isVisible: true,
            dialogs,
            currentIndex: 0,
        });
    },

    closeTalk: () => {
        set({
            isVisible: false,
            dialogs: [],
            currentIndex: 0,
        });
    },

    nextDialog: () => {
        const { currentIndex, dialogs } = get();
        const currentDialog = dialogs[currentIndex];

        // 選択肢がある場合は自動進行しない
        if (currentDialog?.choices && currentDialog.choices.length > 0) {
            return true; // まだ会話は続いている
        }

        if (currentIndex < dialogs.length - 1) {
            set({ currentIndex: currentIndex + 1 });
            return true;
        }
        return false;
    },

    prevDialog: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
            set({ currentIndex: currentIndex - 1 });
            return true;
        }
        return false;
    },

    getCurrentDialog: () => {
        const { dialogs, currentIndex } = get();
        return dialogs[currentIndex] || null;
    },

    selectChoice: (choice) => {
        const { dialogs, currentIndex } = get();

        if (choice.nextDialogId) {
            // 指定されたダイアログIDに移動
            const nextIndex = dialogs.findIndex(d => d.id === choice.nextDialogId);
            if (nextIndex !== -1) {
                set({ currentIndex: nextIndex });
                return;
            }
        }

        // nextDialogIdがない場合は次へ進む
        if (currentIndex < dialogs.length - 1) {
            set({ currentIndex: currentIndex + 1 });
        } else {
            get().closeTalk();
        }
    },

    hasChoices: () => {
        const dialog = get().getCurrentDialog();
        return dialog?.choices !== undefined && dialog.choices.length > 0;
    },
}));

export type { TalkDialog };
