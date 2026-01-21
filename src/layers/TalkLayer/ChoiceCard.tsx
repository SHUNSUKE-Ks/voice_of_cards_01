import { useCallback } from 'react';
import './ChoiceCard.css';

export interface Choice {
    id: string;
    label: string;
    nextDialogId?: string;
}

interface ChoiceCardProps {
    choice: Choice;
    index: number;
    totalCards: number;
    onSelect: (choice: Choice) => void;
}

export function ChoiceCard({ choice, index, totalCards, onSelect }: ChoiceCardProps) {
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(choice);
    }, [choice, onSelect]);

    // 手札の扇形配置を計算
    const fanAngle = 5; // 各カードの傾き
    const centerIndex = (totalCards - 1) / 2;
    const offsetFromCenter = index - centerIndex;
    const rotation = offsetFromCenter * fanAngle;
    const translateY = Math.abs(offsetFromCenter) * 10; // 中央が上に

    const style: React.CSSProperties = {
        transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
        zIndex: index,
    };

    return (
        <div
            className="choice-card"
            style={style}
            onClick={handleClick}
        >
            <div className="choice-card__inner">
                <span className="choice-card__label">{choice.label}</span>
            </div>
        </div>
    );
}
