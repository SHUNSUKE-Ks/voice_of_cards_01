import { useCallback, useRef } from 'react';
import { useCityAnimation } from './useCityAnimation';
import type { CityCardData } from '../../core/stores/useCityStore';
import './CityCard.css';

interface CityCardProps {
    card: CityCardData;
    index: number;
    onClick?: (card: CityCardData) => void;
}

export function CityCard({ card, index, onClick }: CityCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { animateHover, animateCardEnter } = useCityAnimation();

    // 登場アニメーション
    const handleRef = useCallback((el: HTMLDivElement | null) => {
        if (el) {
            animateCardEnter(el, index * 0.1);
        }
    }, [animateCardEnter, index]);

    const handleMouseEnter = () => {
        if (cardRef.current) {
            animateHover(cardRef.current, true);
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current) {
            animateHover(cardRef.current, false);
        }
    };

    const handleClick = () => {
        if (onClick) {
            onClick(card);
        }
    };

    return (
        <div
            ref={(el) => {
                (cardRef as any).current = el;
                handleRef(el);
            }}
            className={`city-card city-card--${card.type}`}
            style={{
                transform: `translate(${card.position.x}px, ${card.position.y}px)`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="city-card__icon">{card.icon}</div>
            <div className="city-card__label">{card.label}</div>
        </div>
    );
}
