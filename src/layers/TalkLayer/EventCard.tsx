import { useEffect, useState } from 'react';
import type { EventCardData } from '../../core/stores/useEventStore';
import './EventCard.css';

interface EventCardProps {
    event: EventCardData | null;
    onClose: () => void;
}

const iconMap: Record<string, string> = {
    battle: '⚔️',
    treasure: '💎',
    quest: '📜',
    info: 'ℹ️',
};

export function EventCard({ event, onClose }: EventCardProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (event) {
            // 登場アニメーション
            setIsVisible(true);

            // 自動クローズ
            if (event.autoCloseDelay && event.autoCloseDelay > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, event.autoCloseDelay);
                return () => clearTimeout(timer);
            }
        } else {
            setIsVisible(false);
        }
    }, [event]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            if (event?.onComplete) {
                event.onComplete();
            }
            onClose();
        }, 300); // 退場アニメーション時間
    };

    const handleClick = () => {
        if (!event?.autoCloseDelay) {
            handleClose();
        }
    };

    if (!event) return null;

    const icon = event.icon || iconMap[event.type] || '❗';

    return (
        <div
            className={`event-card-overlay ${isVisible ? 'visible' : ''}`}
            onClick={handleClick}
        >
            <div className={`event-card event-card--${event.type}`}>
                <div className="event-card__rays" />
                <div className="event-card__content">
                    <div className="event-card__icon">{icon}</div>
                    <h2 className="event-card__title">{event.title}</h2>
                    {event.subtitle && (
                        <p className="event-card__subtitle">{event.subtitle}</p>
                    )}
                </div>
            </div>
            <div className="event-card__hint">Click to continue</div>
        </div>
    );
}
