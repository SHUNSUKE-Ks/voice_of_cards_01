import { useEffect, useCallback } from 'react';
import { useDebugStore } from './useDebugStore';
import './DebugPanel.css';

export function DebugPanel() {
    const {
        isDebugMode,
        isEditMode,
        toggleDebugMode,
        toggleEditMode,
        selectedElement,
        selectElement,
        dialogCard,
        leftCard,
        rightTopCard,
        rightBottomCard,
        updatePosition,
        exportPositions
    } = useDebugStore();

    // 矢印キーで選択中のカードを移動
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isEditMode || !selectedElement) return;

        const step = e.shiftKey ? 5 : 1; // Shift押下で大きく移動
        let deltaX = 0;
        let deltaY = 0;

        switch (e.key) {
            case 'ArrowUp': deltaY = -step; break;
            case 'ArrowDown': deltaY = step; break;
            case 'ArrowLeft': deltaX = -step; break;
            case 'ArrowRight': deltaX = step; break;
            default: return;
        }

        e.preventDefault();

        const current = { dialogCard, leftCard, rightTopCard, rightBottomCard }[selectedElement];
        if (current) {
            updatePosition(selectedElement, {
                x: Math.max(0, Math.min(100, current.x + deltaX)),
                y: Math.max(0, Math.min(100, current.y + deltaY)),
            });
        }
    }, [isEditMode, selectedElement, dialogCard, leftCard, rightTopCard, rightBottomCard, updatePosition]);

    useEffect(() => {
        if (isEditMode) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isEditMode, handleKeyDown]);

    if (!isDebugMode) {
        return (
            <button className="debug-toggle" onClick={toggleDebugMode}>
                🔧 Debug
            </button>
        );
    }

    const positions = [
        { id: 'dialogCard', label: 'ダイアログカード', pos: dialogCard },
        { id: 'leftCard', label: '左キャラカード', pos: leftCard },
        { id: 'rightTopCard', label: '右上キャラカード', pos: rightTopCard },
        { id: 'rightBottomCard', label: '右下キャラカード', pos: rightBottomCard },
    ];

    const handleCopy = () => {
        const json = exportPositions();
        navigator.clipboard.writeText(json);
        alert('座標をクリップボードにコピーしました！');
    };

    const handleSelectCard = (id: string) => {
        selectElement(id);
    };

    return (
        <div className="debug-panel">
            <div className="debug-panel__header">
                <h3>🔧 Debug</h3>
                <div className="debug-panel__header-buttons">
                    <button
                        className={`debug-edit-toggle ${isEditMode ? 'active' : ''}`}
                        onClick={toggleEditMode}
                        title="ドラッグ編集モード"
                    >
                        ✋ {isEditMode ? 'ON' : 'OFF'}
                    </button>
                    <button onClick={toggleDebugMode}>✕</button>
                </div>
            </div>

            {isEditMode && (
                <div className="debug-panel__edit-hint">
                    🖱️ クリックで選択 → 矢印キーで移動 (Shift+矢印: 5倍)
                </div>
            )}

            <div className="debug-panel__content">
                {positions.map(({ id, label, pos }) => (
                    <div
                        key={id}
                        className={`debug-panel__item ${selectedElement === id ? 'selected' : ''}`}
                        onClick={() => handleSelectCard(id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="debug-panel__item-header">
                            <strong>{label}</strong>
                            {selectedElement === id && <span className="debug-panel__selected-badge">✓</span>}
                        </div>
                        <div className="debug-panel__controls">
                            <label>
                                X%:
                                <input
                                    type="number"
                                    value={pos.x.toFixed(1)}
                                    step="0.5"
                                    onChange={(e) => updatePosition(id, { x: Number(e.target.value) })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </label>
                            <label>
                                Y%:
                                <input
                                    type="number"
                                    value={pos.y.toFixed(1)}
                                    step="0.5"
                                    onChange={(e) => updatePosition(id, { y: Number(e.target.value) })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </label>
                            <label>
                                回転:
                                <input
                                    type="number"
                                    value={pos.rotation}
                                    onChange={(e) => updatePosition(id, { rotation: Number(e.target.value) })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </label>
                            <label>
                                W:
                                <input
                                    type="number"
                                    value={pos.width}
                                    onChange={(e) => updatePosition(id, { width: Number(e.target.value) })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </label>
                            <label>
                                H:
                                <input
                                    type="number"
                                    value={pos.height}
                                    onChange={(e) => updatePosition(id, { height: Number(e.target.value) })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="debug-panel__footer">
                <button onClick={handleCopy}>📋 座標をコピー</button>
            </div>
        </div>
    );
}
