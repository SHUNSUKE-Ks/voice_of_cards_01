import { useMapStore } from '../../core/stores/useMapStore';
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
    const { mapData, playerPos, isRevealed } = useMapStore();

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

    // Player position in pixels (center of player's cell)
    const playerPixelX = playerPos.x * cellWidth + CARD_WIDTH / 2;
    const playerPixelY = playerPos.y * cellHeight + CARD_HEIGHT / 2;

    // 固定ビューポートの中央 (960, 540) からのオフセット
    const offsetX = VIEWPORT_WIDTH / 2 - playerPixelX;
    const offsetY = VIEWPORT_HEIGHT / 2 - playerPixelY;

    return (
        <div
            className="map-grid"
            style={{
                gridTemplateColumns: `repeat(${grid.width}, ${CARD_WIDTH}px)`,
                gridTemplateRows: `repeat(${grid.height}, ${CARD_HEIGHT}px)`,
                gap: `${CARD_GAP}px`,
                transform: `translate(${offsetX}px, ${offsetY}px)`,
                transition: 'transform 0.3s ease-out',
            }}
        >
            {tileGrid.map((row, y) =>
                row.map((tile, x) => (
                    <div key={`${x}-${y}`} className="map-cell">
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
                ))
            )}
        </div>
    );
}
