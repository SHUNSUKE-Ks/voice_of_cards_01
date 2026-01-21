import { useEffect, useRef, useCallback } from 'react';
import { useTalkStore, type TalkChoice } from '../../core/stores/useTalkStore';
import { useDebugStore } from '../../debug/useDebugStore';
import { CharacterCard } from './CharacterCard';
import { DialogCard } from './DialogCard';
import { ChoiceHand } from './ChoiceHand';
import { useTalkAnimation } from './useTalkAnimation';
import './TalkLayer.css';

export function TalkLayer() {
    const {
        isVisible,
        dialogs,
        currentIndex,
        nextDialog,
        closeTalk,
        getCurrentDialog,
        selectChoice,
        hasChoices
    } = useTalkStore();

    const { isEditMode } = useDebugStore();

    const {
        animateCardEnter,
        animateDialogEnter,
        animateDialogUpdate,
        setCardActive
    } = useTalkAnimation();

    const leftCardRef = useRef<HTMLDivElement>(null);
    const rightTopCardRef = useRef<HTMLDivElement>(null);
    const rightBottomCardRef = useRef<HTMLDivElement>(null);
    const dialogCardRef = useRef<HTMLDivElement>(null);
    const prevDialogRef = useRef<typeof dialogs[0] | null>(null);

    const currentDialog = getCurrentDialog();
    const showChoices = hasChoices();

    // Initial animation when layer opens
    useEffect(() => {
        if (isVisible && currentDialog) {
            if (currentDialog.leftCard && leftCardRef.current) {
                animateCardEnter(leftCardRef.current, 'left', true);
            }
            if (currentDialog.rightTopCard && rightTopCardRef.current) {
                setTimeout(() => {
                    animateCardEnter(rightTopCardRef.current, 'right-top', true);
                }, 150);
            }
            if (currentDialog.rightBottomCard && rightBottomCardRef.current) {
                setTimeout(() => {
                    animateCardEnter(rightBottomCardRef.current, 'right-bottom', true);
                }, 300);
            }
            if (dialogCardRef.current) {
                setTimeout(() => {
                    animateDialogEnter(dialogCardRef.current);
                }, 200);
            }
        }
    }, [isVisible]);

    // Update animation when dialog changes
    useEffect(() => {
        if (currentDialog && prevDialogRef.current !== currentDialog) {
            if (dialogCardRef.current) {
                animateDialogUpdate(dialogCardRef.current);
            }

            const speakerId = currentDialog.speaker;
            if (leftCardRef.current) {
                setCardActive(leftCardRef.current, currentDialog.leftCard === speakerId);
            }
            if (rightTopCardRef.current) {
                setCardActive(rightTopCardRef.current, currentDialog.rightTopCard === speakerId);
            }
            if (rightBottomCardRef.current) {
                setCardActive(rightBottomCardRef.current, currentDialog.rightBottomCard === speakerId);
            }

            prevDialogRef.current = currentDialog;
        }
    }, [currentDialog, animateDialogUpdate, setCardActive]);

    // Handle click to advance - 編集モード/選択肢表示時は進行しない
    const handleClick = useCallback(() => {
        if (isEditMode || showChoices) {
            return;
        }
        const hasMore = nextDialog();
        if (!hasMore) {
            closeTalk();
        }
    }, [isEditMode, showChoices, nextDialog, closeTalk]);

    // Handle choice selection
    const handleChoiceSelect = useCallback((choice: TalkChoice) => {
        selectChoice(choice);
    }, [selectChoice]);

    // Keyboard controls
    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isEditMode || showChoices) return;

            if (e.key === ' ' || e.key === 'Enter') {
                handleClick();
            } else if (e.key === 'Escape') {
                closeTalk();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, isEditMode, showChoices, handleClick, closeTalk]);

    if (!isVisible || !currentDialog) {
        return null;
    }

    return (
        <div className="talk-layer" onClick={handleClick}>
            <div className="talk-layer__overlay" />

            {currentDialog.leftCard && (
                <CharacterCard
                    characterId={currentDialog.leftCard}
                    position="left"
                    isActive={currentDialog.speaker === currentDialog.leftCard}
                />
            )}

            {currentDialog.rightTopCard && (
                <CharacterCard
                    characterId={currentDialog.rightTopCard}
                    position="right-top"
                    isActive={currentDialog.speaker === currentDialog.rightTopCard}
                />
            )}

            {currentDialog.rightBottomCard && (
                <CharacterCard
                    characterId={currentDialog.rightBottomCard}
                    position="right-bottom"
                    isActive={currentDialog.speaker === currentDialog.rightBottomCard}
                />
            )}

            <DialogCard
                speakerName={currentDialog.speakerName}
                content={currentDialog.content}
                highlights={currentDialog.highlights}
            />

            {/* 選択肢カード */}
            <ChoiceHand
                choices={currentDialog.choices || []}
                onSelect={handleChoiceSelect}
                isVisible={showChoices}
            />

            <div className="talk-layer__controls">
                {isEditMode ? (
                    <span className="talk-layer__hint talk-layer__hint--edit">🔧 編集モード</span>
                ) : showChoices ? (
                    <span className="talk-layer__hint talk-layer__hint--choice">選択肢を選んでください</span>
                ) : (
                    <span className="talk-layer__hint">Click or Press Space to continue</span>
                )}
                <span className="talk-layer__progress">{currentIndex + 1} / {dialogs.length}</span>
            </div>
        </div>
    );
}
