import { create } from 'zustand';
import type { MapJson, TileData, Position } from '../../types/map';

interface MapState {
    currentMapId: string | null;
    mapData: MapJson | null;
    playerPos: Position;
    revealedTiles: Set<string>;

    // Actions
    loadMap: (mapData: MapJson) => void;
    movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => boolean;
    revealTile: (x: number, y: number) => void;
    getTileAt: (x: number, y: number) => TileData | undefined;
    isRevealed: (x: number, y: number) => boolean;
}

const positionToKey = (x: number, y: number): string => `${x},${y}`;

export const useMapStore = create<MapState>((set, get) => ({
    currentMapId: null,
    mapData: null,
    playerPos: { x: 0, y: 0 },
    revealedTiles: new Set<string>(),

    loadMap: (mapData) => {
        const startPos = (mapData as any).startPosition || { x: 3, y: 3 };
        const revealedTiles = new Set<string>();

        // Reveal tiles around starting position
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealedTiles.add(positionToKey(startPos.x + dx, startPos.y + dy));
            }
        }

        set({
            currentMapId: mapData.mapId,
            mapData,
            playerPos: startPos,
            revealedTiles,
        });
    },

    movePlayer: (direction) => {
        const { playerPos, mapData, revealedTiles } = get();
        if (!mapData) return false;

        let newX = playerPos.x;
        let newY = playerPos.y;

        switch (direction) {
            case 'up': newY -= 1; break;
            case 'down': newY += 1; break;
            case 'left': newX -= 1; break;
            case 'right': newX += 1; break;
        }

        // Boundary check
        if (newX < 0 || newX >= mapData.grid.width || newY < 0 || newY >= mapData.grid.height) {
            return false;
        }

        // Find target tile
        const targetTile = mapData.tiles.find(t => t.x === newX && t.y === newY);
        if (!targetTile || !targetTile.isTraversable) {
            return false;
        }

        // Reveal adjacent tiles
        const newRevealed = new Set(revealedTiles);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                newRevealed.add(positionToKey(newX + dx, newY + dy));
            }
        }

        set({
            playerPos: { x: newX, y: newY },
            revealedTiles: newRevealed,
        });

        return true;
    },

    revealTile: (x, y) => {
        const { revealedTiles } = get();
        const newRevealed = new Set(revealedTiles);
        newRevealed.add(positionToKey(x, y));
        set({ revealedTiles: newRevealed });
    },

    getTileAt: (x, y) => {
        const { mapData } = get();
        return mapData?.tiles.find(t => t.x === x && t.y === y);
    },

    isRevealed: (x, y) => {
        const { revealedTiles } = get();
        return revealedTiles.has(positionToKey(x, y));
    },
}));
