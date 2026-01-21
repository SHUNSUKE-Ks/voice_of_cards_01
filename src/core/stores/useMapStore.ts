import { create } from 'zustand';
import type { MapJson, TileData, Position } from '../../types/map';

// 遷移フェーズ
export type TransitionPhase = 'IDLE' | 'EXITING' | 'ENTERING';

interface MapState {
    currentMapId: string | null;
    mapData: MapJson | null;
    playerPos: Position;
    revealedTiles: Set<string>;

    // 遷移状態
    isTransitioning: boolean;
    transitionPhase: TransitionPhase;
    pendingMapData: MapJson | null; // 遷移先マップデータ

    // Actions
    loadMap: (mapData: MapJson) => void;
    movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => boolean;
    revealTile: (x: number, y: number) => void;
    getTileAt: (x: number, y: number) => TileData | undefined;
    isRevealed: (x: number, y: number) => boolean;

    // 遷移アクション
    startTransition: (targetMapData: MapJson) => void;
    setTransitionPhase: (phase: TransitionPhase) => void;
    completeTransition: () => void;
    cancelTransition: () => void;
}

const positionToKey = (x: number, y: number): string => `${x},${y}`;

export const useMapStore = create<MapState>((set, get) => ({
    currentMapId: null,
    mapData: null,
    playerPos: { x: 0, y: 0 },
    revealedTiles: new Set<string>(),

    // 遷移状態初期値
    isTransitioning: false,
    transitionPhase: 'IDLE',
    pendingMapData: null,

    loadMap: (mapData) => {
        const startPos = (mapData as any).startPosition || (mapData as any).playerStartPos || { x: 3, y: 3 };
        const revealedTiles = new Set<string>();
        const isTown = (mapData as any).type === 'TOWN' || (mapData as any).initialFace === 'UP';

        // 町の場合は全タイル表示、それ以外は周囲のみ
        if (isTown) {
            mapData.tiles.forEach(tile => {
                revealedTiles.add(positionToKey(tile.x, tile.y));
            });
        } else {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    revealedTiles.add(positionToKey(startPos.x + dx, startPos.y + dy));
                }
            }
        }

        set({
            currentMapId: (mapData as any).id || mapData.mapId,
            mapData,
            playerPos: startPos,
            revealedTiles,
        });
    },

    movePlayer: (direction) => {
        const { playerPos, mapData, revealedTiles, isTransitioning } = get();
        if (!mapData || isTransitioning) return false;

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

    // 遷移開始
    startTransition: (targetMapData) => {
        set({
            isTransitioning: true,
            transitionPhase: 'EXITING',
            pendingMapData: targetMapData,
        });
    },

    // 遷移フェーズ更新
    setTransitionPhase: (phase) => {
        set({ transitionPhase: phase });
    },

    // 遷移完了（マップ切替）
    completeTransition: () => {
        const { pendingMapData } = get();
        if (pendingMapData) {
            get().loadMap(pendingMapData);
        }
        set({
            isTransitioning: false,
            transitionPhase: 'IDLE',
            pendingMapData: null,
        });
    },

    // 遷移キャンセル
    cancelTransition: () => {
        set({
            isTransitioning: false,
            transitionPhase: 'IDLE',
            pendingMapData: null,
        });
    },
}));
