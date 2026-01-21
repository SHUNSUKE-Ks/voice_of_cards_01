import { useEffect, useCallback } from 'react';
import { useScenarioStore } from '../core/stores/useScenarioStore';
import { useGameStore } from '../core/stores/useGameStore';
import { useTalkStore } from '../core/stores/useTalkStore';
import demoScenarioData from '../data/novel/demo_scenario.json';
import demoTalkData from '../data/talk/demo_talk.json';
import type { ScenarioData } from '../types/scenario';
import './ScenarioScreen.css';

// Card ID to image path mapping
const cardImageMap: Record<string, string> = {
    'hero': '/assets/cards/ch_hero_normal.png',
    'partner_rina': '/assets/cards/ch_mage_normal.png',
    'warrior': '/assets/cards/ch_warrior_normal.png',
    'gm': '/assets/cards/ch_gm_normal.png',
    'job_sword': '/assets/cards/job_warrior_silhouette.png',
    'job_magic': '/assets/cards/job_mage_silhouette.png',
    'monster_boss': '/assets/cards/en_dragon.png',
    'monster_slime': '/assets/cards/en_slime.png',
};

// Background ID to image path mapping
const bgImageMap: Record<string, string> = {
    'bg_tavern': '/assets/bg/bg_forest_day.png',
    'bg_deep_forest': '/assets/bg/bg_forest_day.png',
    'bg_deep_forest_boss': '/assets/bg/bg_forest_day.png',
    'bg_flower_garden': '/assets/bg/bg_forest_day.png',
};

export function ScenarioScreen() {
    const { navigateTo } = useGameStore();
    const { openTalk, isVisible: isTalkVisible } = useTalkStore();
    const {
        loadScenario,
        nextCommand,
        processCommand,
        selectChoice,
        currentText,
        currentChoices,
        displayedCards,
        background,
        isWaitingForInput,
    } = useScenarioStore();

    // Load scenario on mount
    useEffect(() => {
        loadScenario(demoScenarioData as ScenarioData);
        setTimeout(() => {
            const cmd = useScenarioStore.getState().nextCommand();
            if (cmd) useScenarioStore.getState().processCommand(cmd);
        }, 100);
    }, [loadScenario]);

    // シナリオ終了後 → Talk シーン → マップへ遷移
    const handleScenarioEnd = useCallback(() => {
        // Talk シーンを開始
        openTalk(demoTalkData.dialogs);
    }, [openTalk]);

    // Talk終了後にマップへ遷移
    useEffect(() => {
        // Talk が閉じられたらマップへ
        const unsubscribe = useTalkStore.subscribe((state, prevState) => {
            if (prevState.isVisible && !state.isVisible) {
                navigateTo('map');
            }
        });
        return () => unsubscribe();
    }, [navigateTo]);

    // Handle click to advance text
    const handleClick = useCallback(() => {
        if (isTalkVisible) return; // Talk表示中は進行しない

        if (!isWaitingForInput || currentChoices) {
            return;
        }

        const cmd = nextCommand();

        if (cmd) {
            processCommand(cmd);

            setTimeout(() => {
                const state = useScenarioStore.getState();
                const scene = state.scenarioData?.scenes[state.currentSceneId];
                const sceneLength = scene?.length || 0;

                if (!scene || state.commandIndex >= sceneLength) {
                    if (!state.currentChoices) {
                        // シナリオ終了 → Talk シーンへ
                        handleScenarioEnd();
                    }
                }
            }, 50);
        } else {
            // シナリオ終了 → Talk シーンへ
            handleScenarioEnd();
        }
    }, [isTalkVisible, isWaitingForInput, currentChoices, nextCommand, processCommand, handleScenarioEnd]);

    // Handle choice selection
    const handleChoice = useCallback((index: number) => {
        selectChoice(index);
    }, [selectChoice]);

    // Get background image URL
    const bgUrl = background ? bgImageMap[background] || '' : '';

    return (
        <div
            className="scenario-screen"
            style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : undefined }}
            onClick={handleClick}
        >
            {/* Character cards display area */}
            <div className="scenario-stage">
                {displayedCards.map((card) => (
                    <div
                        key={card.cardId}
                        className={`scenario-card scenario-card--${card.position}`}
                    >
                        <img
                            src={cardImageMap[card.cardId] || '/assets/cards/ch_hero_normal.png'}
                            alt={card.cardId}
                            className="scenario-card-image"
                        />
                    </div>
                ))}
            </div>

            {/* Text window */}
            {currentText && !isTalkVisible && (
                <div className="scenario-text-window">
                    {currentText.speaker && (
                        <div className="scenario-speaker">{currentText.speaker}</div>
                    )}
                    <div className="scenario-content">{currentText.content}</div>
                    {!currentChoices && (
                        <div className="scenario-indicator">▼</div>
                    )}
                </div>
            )}

            {/* Choice buttons */}
            {currentChoices && !isTalkVisible && (
                <div className="scenario-choices">
                    {currentChoices.map((choice, index) => (
                        <button
                            key={index}
                            className="scenario-choice-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleChoice(index);
                            }}
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
