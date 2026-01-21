import { useRef, useCallback } from 'react';
import { useDebugStore } from '../../debug/useDebugStore';
import './CharacterCard.css';

interface CharacterCardProps {
    characterId: string;
    position: 'left' | 'right-top' | 'right-bottom';
    isActive?: boolean;
}

// Character ID to image path mapping
const characterImageMap: Record<string, string> = {
    'hero': '/assets/cards/ch_hero_normal.png',
    'rina': '/assets/cards/ch_mage_normal.png',
    'warrior': '/assets/cards/ch_warrior_normal.png',
    'gm': '/assets/cards/ch_gm_normal.png',
};

export function CharacterCard({
    characterId,
    position,
    isActive = false
}: CharacterCardProps) {
    const {
        isDebugMode,
        isEditMode,
        leftCard,
        rightTopCard,
        rightBottomCard,
        selectedElement,
        selectElement,
        updatePosition
    } = useDebugStore();
    const imageSrc = characterImageMap[characterId] || '/assets/cards/ch_hero_normal.png';
    const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

    // Get position key from position prop
    const positionKey = position === 'left' ? 'leftCard'
        : position === 'right-top' ? 'rightTopCard'
            : 'rightBottomCard';

    // Get position from debug store
    const getPosition = () => {
        switch (position) {
            case 'left': return leftCard;
            case 'right-top': return rightTopCard;
            case 'right-bottom': return rightBottomCard;
        }
    };

    const pos = getPosition();

    // Drag handlers - パーセントベースで計算
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.stopPropagation();

        selectElement(positionKey);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            posX: pos.x,
            posY: pos.y,
        };

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!dragStartRef.current) return;

            // ウィンドウサイズに対するパーセント移動量を計算
            const deltaXPercent = ((moveEvent.clientX - dragStartRef.current.x) / window.innerWidth) * 100;
            const deltaYPercent = ((moveEvent.clientY - dragStartRef.current.y) / window.innerHeight) * 100;

            updatePosition(positionKey, {
                x: Math.max(0, Math.min(100, dragStartRef.current.posX + deltaXPercent)),
                y: Math.max(0, Math.min(100, dragStartRef.current.posY + deltaYPercent)),
            });
        };

        const handleMouseUp = () => {
            dragStartRef.current = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [isEditMode, pos.x, pos.y, positionKey, selectElement, updatePosition]);

    // パーセント基準 + 中央アンカー
    const style: React.CSSProperties = {
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        cursor: isEditMode ? 'move' : 'default',
    };

    const isSelected = selectedElement === positionKey;

    return (
        <div
            className={`character-card ${isActive ? 'character-card--active' : ''} ${isSelected ? 'character-card--selected' : ''}`}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <div className="character-card__frame">
                <img
                    src={imageSrc}
                    alt={characterId}
                    className="character-card__image"
                />
            </div>
            {isDebugMode && (
                <div className="character-card__debug-label">
                    {positionKey}: ({pos.x.toFixed(1)}%, {pos.y.toFixed(1)}%)
                </div>
            )}
        </div>
    );
}
