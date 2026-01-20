import { useEffect, useCallback } from 'react';
import { useScenarioStore } from '../core/stores/useScenarioStore';
import { useGameStore } from '../core/stores/useGameStore';
import demoScenarioData from '../data/novel/demo_scenario.json';
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
    'bg_tavern': '/assets/bg/bg_forest_day.png', // Placeholder - using forest for now
    'bg_deep_forest': '/assets/bg/bg_forest_day.png',
    'bg_deep_forest_boss': '/assets/bg/bg_forest_day.png',
    'bg_flower_garden': '/assets/bg/bg_forest_day.png',
};

export function ScenarioScreen() {
    const { navigateTo } = useGameStore();
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
        // Process first command
        setTimeout(() => {
            const cmd = useScenarioStore.getState().nextCommand();
            if (cmd) useScenarioStore.getState().processCommand(cmd);
        }, 100);
    }, [loadScenario]);

    // Handle click to advance text
    const handleClick = useCallback(() => {
        console.log('[DEBUG] handleClick triggered');
        console.log('[DEBUG] isWaitingForInput:', isWaitingForInput);
        console.log('[DEBUG] currentChoices:', currentChoices);

        if (!isWaitingForInput || currentChoices) {
            console.log('[DEBUG] Early return - not waiting or has choices');
            return;
        }

        const cmd = nextCommand();
        console.log('[DEBUG] nextCommand returned:', cmd);

        if (cmd) {
            console.log('[DEBUG] Processing command:', cmd.type);
            processCommand(cmd);

            // Check if scenario ended after processing
            setTimeout(() => {
                const state = useScenarioStore.getState();
                console.log('[DEBUG] After processing - sceneId:', state.currentSceneId);
                console.log('[DEBUG] After processing - commandIndex:', state.commandIndex);

                const scene = state.scenarioData?.scenes[state.currentSceneId];
                const sceneLength = scene?.length || 0;
                console.log('[DEBUG] Scene length:', sceneLength);
                console.log('[DEBUG] Is end?:', state.commandIndex >= sceneLength);
                console.log('[DEBUG] Has choices?:', !!state.currentChoices);

                if (!scene || state.commandIndex >= sceneLength) {
                    // End of scenario - navigate to map
                    if (!state.currentChoices) {
                        console.log('[DEBUG] *** NAVIGATING TO MAP ***');
                        navigateTo('map');
                    }
                }
            }, 50);
        } else {
            console.log('[DEBUG] No command - END OF SCENARIO - navigating to map');
            navigateTo('map');
        }
    }, [isWaitingForInput, currentChoices, nextCommand, processCommand, navigateTo]);

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
            {currentText && (
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
            {currentChoices && (
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
