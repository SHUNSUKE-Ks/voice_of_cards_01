import { useCallback } from 'react';
import { useCityStore, type CityCardData } from '../../core/stores/useCityStore';
import { useGameStore } from '../../core/stores/useGameStore';
import { CityCard } from './CityCard';
import './CityLayer.css';

export function CityLayer() {
    const { isOpen, currentCity, closeCity } = useCityStore();
    const { navigateTo } = useGameStore();

    const handleCardClick = useCallback((card: CityCardData) => {
        console.log(`Clicked: ${card.label}`);

        if (card.type === 'exit') {
            closeCity();
            navigateTo('map');
        }
        // TODO: 各店舗のインタラクション
    }, [closeCity, navigateTo]);

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        // 背景クリックでは閉じない（カードクリックのみ）
        e.stopPropagation();
    }, []);

    if (!isOpen || !currentCity) {
        return null;
    }

    return (
        <div className="city-layer" onClick={handleOverlayClick}>
            <div className="city-layer__background" />

            <div className="city-layer__header">
                <h2 className="city-layer__title">{currentCity.name}</h2>
            </div>

            <div className="city-layer__cards">
                {currentCity.cards.map((card, index) => (
                    <CityCard
                        key={card.id}
                        card={card}
                        index={index}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            <div className="city-layer__hint">
                カードをクリックして選択
            </div>
        </div>
    );
}
