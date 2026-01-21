import { useRef, useCallback } from 'react';
import { useDebugStore } from '../../debug/useDebugStore';
import './DialogCard.css';

interface DialogCardProps {
    speakerName: string;
    content: string;
    highlights?: string[];
}

export function DialogCard({ speakerName, content, highlights = [] }: DialogCardProps) {
    const {
        isDebugMode,
        isEditMode,
        dialogCard,
        selectedElement,
        selectElement,
        updatePosition
    } = useDebugStore();

    const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

    // Apply highlighting to matching words
    const renderContent = () => {
        if (highlights.length === 0) {
            return content;
        }

        let result = content;
        highlights.forEach(word => {
            result = result.replace(
                new RegExp(`(${word})`, 'g'),
                '<span class="dialog-highlight">$1</span>'
            );
        });

        return <span dangerouslySetInnerHTML={{ __html: result }} />;
    };

    // Drag handlers - パーセントベースで計算
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.stopPropagation();

        selectElement('dialogCard');
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            posX: dialogCard.x,
            posY: dialogCard.y,
        };

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!dragStartRef.current) return;

            // ウィンドウサイズに対するパーセント移動量を計算
            const deltaXPercent = ((moveEvent.clientX - dragStartRef.current.x) / window.innerWidth) * 100;
            const deltaYPercent = ((moveEvent.clientY - dragStartRef.current.y) / window.innerHeight) * 100;

            updatePosition('dialogCard', {
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
    }, [isEditMode, dialogCard.x, dialogCard.y, selectElement, updatePosition]);

    // パーセント基準 + 中央アンカー
    const style: React.CSSProperties = {
        position: 'absolute',
        left: `${dialogCard.x}%`,
        top: `${dialogCard.y}%`,
        transform: `translate(-50%, -50%) rotate(${dialogCard.rotation}deg)`,
        width: `${dialogCard.width}px`,
        minHeight: `${dialogCard.height}px`,
        cursor: isEditMode ? 'move' : 'default',
    };

    const isSelected = selectedElement === 'dialogCard';

    return (
        <div
            className={`dialog-card ${isSelected ? 'dialog-card--selected' : ''}`}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <div className="dialog-card__header">
                <span className="dialog-card__speaker">{speakerName}</span>
            </div>
            <div className="dialog-card__body">
                <p className="dialog-card__content">
                    {renderContent()}
                </p>
            </div>
            <div className="dialog-card__footer">
                <span className="dialog-card__indicator">▼</span>
            </div>
            {isDebugMode && (
                <div className="dialog-card__debug-label">
                    dialog: ({dialogCard.x.toFixed(1)}%, {dialogCard.y.toFixed(1)}%)
                </div>
            )}
        </div>
    );
}
