import { useMapStore } from '../../core/stores/useMapStore';
import { MapCard } from './MapCard';
import { PlayerPawn } from './PlayerPawn';
import './MapGrid.css';

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

    return (
        <div
            className="map-grid"
            style={{
                gridTemplateColumns: `repeat(${grid.width}, 70px)`,
                gridTemplateRows: `repeat(${grid.height}, 100px)`,
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
