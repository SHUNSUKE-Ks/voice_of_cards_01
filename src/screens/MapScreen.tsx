import { useEffect, useCallback, useRef } from 'react';
import { useMapStore } from '../core/stores/useMapStore';
import { useTalkStore } from '../core/stores/useTalkStore';
import { MapGrid } from '../parts/world/MapGrid';
import testMapData from '../data/world/test_map.json';
import townData from '../data/world/town_01.json';
import './MapScreen.css';

// 町に入った時のダイアログ
const townEnterDialogs = [
    {
        id: 'town_enter_1',
        speaker: 'gm',
        speakerName: '語り手',
        content: '町に入りました。',
        leftCard: null,
        rightTopCard: 'gm',
    },
];

// 町から出た時のダイアログ
const townExitDialogs = [
    {
        id: 'town_exit_1',
        speaker: 'gm',
        speakerName: '語り手',
        content: 'ワールドマップに戻りました。',
        leftCard: null,
        rightTopCard: 'gm',
    },
];

export function MapScreen() {
    const { loadMap, movePlayer, mapData, currentMapId, getTileAt, playerPos } = useMapStore();
    const { openTalk, isVisible: isTalkVisible } = useTalkStore();

    // 最後にトリガーしたタイルのキー（同じタイルで再トリガー防止）
    const lastTriggerTileRef = useRef<string>('');
    // 遷移処理中フラグ
    const isTransitioningRef = useRef(false);

    // Load map on mount
    useEffect(() => {
        if (!mapData) {
            loadMap(testMapData as any);
        }
    }, [loadMap, mapData]);

    // プレイヤー位置を監視してイベントトリガー
    useEffect(() => {
        // Talk表示中または遷移中は何もしない
        if (isTalkVisible || !mapData || isTransitioningRef.current) return;

        const currentTileKey = `${currentMapId}_${playerPos.x}_${playerPos.y}`;

        // 同じタイルで既にトリガー済みなら何もしない
        if (lastTriggerTileRef.current === currentTileKey) return;

        const currentTile = getTileAt(playerPos.x, playerPos.y);
        if (!currentTile) return;

        // tile_town に乗ったら町へ遷移（ワールドマップ時のみ）
        if (currentTile.terrainCardId === 'tile_town' && currentMapId === 'test_map_01') {
            console.log('🏘️ Town tile detected! Entering town...');
            lastTriggerTileRef.current = currentTileKey;
            isTransitioningRef.current = true;
            openTalk(townEnterDialogs as any);
            // ダイアログ後に町へ遷移
            setTimeout(() => {
                loadMap(townData as any);
                isTransitioningRef.current = false;
                lastTriggerTileRef.current = '';
            }, 100);
        }

        // tile_town_exit に乗ったらワールドへ戻る（町マップ時のみ）
        if (currentTile.terrainCardId === 'tile_town_exit' && currentMapId === 'town_01') {
            console.log('🚪 Exit tile detected! Returning to world...');
            lastTriggerTileRef.current = currentTileKey;
            isTransitioningRef.current = true;
            openTalk(townExitDialogs as any);
            // ダイアログ後にワールドへ戻る
            setTimeout(() => {
                loadMap(testMapData as any);
                isTransitioningRef.current = false;
                lastTriggerTileRef.current = '';
            }, 100);
        }
    }, [playerPos, mapData, isTalkVisible, getTileAt, openTalk, currentMapId, loadMap]);

    // Keyboard controls
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isTalkVisible || isTransitioningRef.current) return;

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                movePlayer('up');
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                movePlayer('down');
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                movePlayer('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                movePlayer('right');
                break;
            // T キーでマップ切り替え（演出なし）
            case 't':
            case 'T':
                if (currentMapId === 'test_map_01') {
                    loadMap(townData as any);
                    lastTriggerTileRef.current = '';
                } else {
                    loadMap(testMapData as any);
                    lastTriggerTileRef.current = '';
                }
                break;
        }
    }, [movePlayer, isTalkVisible, loadMap, currentMapId]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="map-screen">
            <div className="map-header">
                <h2 className="map-title">{mapData?.name || 'Map'}</h2>
                <p className="map-hint">
                    WASD: Move | T: Switch Map
                    {currentMapId === 'test_map_01' && ' | Town at (7,4)'}
                </p>
            </div>
            <div className="map-container">
                <MapGrid />
            </div>
        </div>
    );
}
