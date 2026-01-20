import { useMapStore } from '../../core/stores/useMapStore';
import { MapCard } from './MapCard';
import { PlayerPawn } from './PlayerPawn';
import './MapGrid.css';

const CARD_WIDTH = 80;
const CARD_HEIGHT = 100;
const CARD_GAP = 4;

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
    const offsetX = -playerPos.x * cellWidth;
    const offsetY = -playerPos.y * cellHeight;

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
                                x={x}
                                y={y}
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
