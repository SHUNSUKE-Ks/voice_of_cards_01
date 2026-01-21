import { useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { useMapStore } from '../../core/stores/useMapStore';
import { useCardTransition } from '../../core/hooks/useCardTransition';
import { MapCard } from './MapCard';
import { PlayerPawn } from './PlayerPawn';
import './MapGrid.css';

// 固定ビューポートサイズ
const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

const CARD_WIDTH = 160;
const CARD_HEIGHT = 200;
const CARD_GAP = 8;

export function MapGrid() {
    const {
        mapData,
        playerPos,
        isRevealed,
        isTransitioning,
        transitionPhase,
        setTransitionPhase,
        completeTransition,
    } = useMapStore();

    const { animateMapExit, animateTownEnter } = useCardTransition();

    // カード要素のref配列
    const cardRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());
    const gridRef = useRef<HTMLDivElement>(null);

    // Exit完了後にEnterフェーズへ移行
    const handleExitComplete = useCallback(() => {
        setTransitionPhase('ENTERING');
        completeTransition(); // マップデータ切替
    }, [setTransitionPhase, completeTransition]);

    // Exitアニメーション実行
    useEffect(() => {
        if (transitionPhase === 'EXITING') {
            const cards = Array.from(cardRefsMap.current.values());
            if (cards.length > 0) {
                animateMapExit(cards, handleExitComplete);
            } else {
                handleExitComplete();
            }
        }
    }, [transitionPhase, animateMapExit, handleExitComplete]);

    // Enterアニメーション実行（DOM更新後）
    useLayoutEffect(() => {
        if (transitionPhase === 'ENTERING') {
            // DOMが更新された後にEnterアニメーション
            requestAnimationFrame(() => {
                const cards = Array.from(cardRefsMap.current.values());
                if (cards.length > 0) {
                    animateTownEnter(cards, () => {
                        setTransitionPhase('IDLE');
                    });
                } else {
                    setTransitionPhase('IDLE');
                }
            });
        }
    }, [transitionPhase, mapData, animateTownEnter, setTransitionPhase]);

    // カードrefを登録
    const setCardRef = useCallback((key: string, el: HTMLDivElement | null) => {
        if (el) {
            cardRefsMap.current.set(key, el);
        } else {
            cardRefsMap.current.delete(key);
        }
    }, []);

    if (!mapData) {
        return <div className="map-loading">Loading map...</div>;
    }

    const { grid, tiles } = mapData;

    // Create 2D grid from tiles array
    const tileGrid: (typeof tiles[0] | null)[][] = Array.from(
        { length: grid.height },
        () => Array(grid.width).fill(null)
    );

    tiles.forEach(tile => {
        if (tile.y >= 0 && tile.y < grid.height && tile.x >= 0 && tile.x < grid.width) {
            tileGrid[tile.y][tile.x] = tile;
        }
    });

    // Calculate offset to center camera on player
    const cellWidth = CARD_WIDTH + CARD_GAP;
    const cellHeight = CARD_HEIGHT + CARD_GAP;

    const playerPixelX = playerPos.x * cellWidth + CARD_WIDTH / 2;
    const playerPixelY = playerPos.y * cellHeight + CARD_HEIGHT / 2;

    const offsetX = VIEWPORT_WIDTH / 2 - playerPixelX;
    const offsetY = VIEWPORT_HEIGHT / 2 - playerPixelY;

    return (
        <div
            ref={gridRef}
            className={`map-grid ${isTransitioning ? 'map-grid--transitioning' : ''}`}
            style={{
                gridTemplateColumns: `repeat(${grid.width}, ${CARD_WIDTH}px)`,
                gridTemplateRows: `repeat(${grid.height}, ${CARD_HEIGHT}px)`,
                gap: `${CARD_GAP}px`,
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                transition: isTransitioning ? 'none' : 'transform 0.3s ease-out',
            }}
        >
            {tileGrid.map((row, y) =>
                row.map((tile, x) => {
                    const key = `${x}-${y}`;
                    return (
                        <div
                            key={key}
                            className="map-cell"
                            ref={(el) => { if (tile) setCardRef(key, el); }}
                        >
                            {tile ? (
                                <MapCard
                                    terrainCardId={tile.terrainCardId}
                                    isRevealed={isRevealed(x, y)}
                                    isTraversable={tile.isTraversable}
                                />
                            ) : (
                                <div className="empty-tile" />
                            )}
                            {playerPos.x === x && playerPos.y === y && <PlayerPawn />}
                        </div>
                    );
                })
            )}
        </div>
    );
}
