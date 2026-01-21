import { useEffect, useCallback, useRef, useState } from 'react';
import { useMapStore } from '../core/stores/useMapStore';
import { useTalkStore } from '../core/stores/useTalkStore';
import { useQuestStore } from '../core/stores/useQuestStore';
import { MapGrid } from '../parts/world/MapGrid';
import testMapData from '../data/world/test_map.json';
import townData from '../data/world/town_01.json';
import dungeonData from '../data/world/dungeon_simple.json';
import './MapScreen.css';

// ダイアログ定義
const dialogs = {

    // Q001: 薬草採集
    q001Accept: [
        { id: '1', speaker: 'npc_villager', speakerName: '村人', content: 'おお、冒険者さん！' },
        { id: '2', speaker: 'npc_villager', speakerName: '村人', content: '薬草を1つ取ってきてほしいんだ。' },
        { id: '3', speaker: 'gm', speakerName: '語り手', content: '【クエスト受注】薬草採集' },
    ],
    q001Herb: [
        { id: '1', speaker: 'gm', speakerName: '語り手', content: '薬草を見つけた！' },
        { id: '2', speaker: 'gm', speakerName: '語り手', content: '【薬草】を手に入れた。' },
    ],
    q001Complete: [
        { id: '1', speaker: 'npc_villager', speakerName: '村人', content: '薬草を持ってきてくれたか！' },
        { id: '2', speaker: 'npc_villager', speakerName: '村人', content: 'ありがとう！これが報酬だ。' },
        { id: '3', speaker: 'gm', speakerName: '語り手', content: '【報酬】100G を手に入れた！' },
        { id: '4', speaker: 'gm', speakerName: '語り手', content: '【クエスト完了】薬草採集' },
    ],
    q001Done: [{ id: '1', speaker: 'npc_villager', speakerName: '村人', content: '薬草ありがとう！' }],

    // Q002: 魔物討伐
    q002Accept: [
        { id: '1', speaker: 'npc_mayor', speakerName: '村長', content: 'おお、冒険者か。話がある。' },
        { id: '2', speaker: 'npc_mayor', speakerName: '村長', content: 'ダンジョンに魔物が住み着いてな...' },
        { id: '3', speaker: 'npc_mayor', speakerName: '村長', content: '魔物を倒して、角を持ってきてくれ。' },
        { id: '4', speaker: 'gm', speakerName: '語り手', content: '【クエスト受注】魔物討伐' },
    ],
    q002Boss: [
        { id: '1', speaker: 'gm', speakerName: '語り手', content: '魔物が現れた！' },
        { id: '2', speaker: 'gm', speakerName: '語り手', content: '... 戦闘 ...' },
        { id: '3', speaker: 'gm', speakerName: '語り手', content: '魔物を倒した！' },
        { id: '4', speaker: 'gm', speakerName: '語り手', content: '【魔物の角】を手に入れた。' },
    ],
    q002Complete: [
        { id: '1', speaker: 'npc_mayor', speakerName: '村長', content: '魔物の角を持ってきたか！' },
        { id: '2', speaker: 'npc_mayor', speakerName: '村長', content: '町も安全だ。報酬を受け取ってくれ。' },
        { id: '3', speaker: 'gm', speakerName: '語り手', content: '【報酬】500G を手に入れた！' },
        { id: '4', speaker: 'gm', speakerName: '語り手', content: '【クエスト完了】魔物討伐' },
    ],
    q002Done: [{ id: '1', speaker: 'npc_mayor', speakerName: '村長', content: '町を守ってくれてありがとう。' }],
};

export function MapScreen() {
    const { loadMap, movePlayer, mapData, currentMapId, getTileAt, playerPos } = useMapStore();
    const { openTalk, isVisible: isTalkVisible } = useTalkStore();
    const { q001Status, q002Status, acceptQuest, collectHerb, defeatBoss, completeQuest, inventory } = useQuestStore();

    // フェード状態
    const [fadeState, setFadeState] = useState<'' | 'fade-out' | 'fade-in'>('');

    const lastTriggerTileRef = useRef<string>('');
    const isTransitioningRef = useRef(false);
    // スポーン直後フラグ（最初の移動までイベント無効）
    const justSpawnedRef = useRef(true);
    // ワールドマップでの最後の位置を記憶（戻り先）
    const lastWorldPosRef = useRef<{ x: number, y: number }>({ x: 7, y: 7 });

    useEffect(() => {
        if (!mapData) loadMap(testMapData as any);
    }, [loadMap, mapData]);

    useEffect(() => {
        if (isTalkVisible || !mapData || isTransitioningRef.current) return;

        // スポーン直後はイベントをスキップ
        if (justSpawnedRef.current) return;

        const tileKey = `${currentMapId}_${playerPos.x}_${playerPos.y}`;
        if (lastTriggerTileRef.current === tileKey) return;

        const tile = getTileAt(playerPos.x, playerPos.y);
        if (!tile) return;

        const tileId = tile.terrainCardId;

        // デバッグ: タイル情報を表示
        console.log(`📍 Position: (${playerPos.x}, ${playerPos.y}) | Tile: ${tileId} | Map: ${currentMapId}`);

        // === マップ遷移（フェード演出） ===
        if (tileId === 'tile_town' && currentMapId === 'test_map_01') {
            lastTriggerTileRef.current = tileKey;
            isTransitioningRef.current = true;
            lastWorldPosRef.current = { x: playerPos.x, y: playerPos.y };
            // フェードアウト -> マップ切替 -> フェードイン
            setFadeState('fade-out');
            setTimeout(() => {
                loadMap(townData as any);
                justSpawnedRef.current = true;
                setFadeState('fade-in');
                setTimeout(() => { setFadeState(''); isTransitioningRef.current = false; lastTriggerTileRef.current = ''; }, 400);
            }, 400);
            return;
        }
        if (tileId === 'tile_town_exit') {
            lastTriggerTileRef.current = tileKey;
            isTransitioningRef.current = true;
            setFadeState('fade-out');
            setTimeout(() => {
                loadMap(testMapData as any, lastWorldPosRef.current);
                justSpawnedRef.current = true;
                setFadeState('fade-in');
                setTimeout(() => { setFadeState(''); isTransitioningRef.current = false; lastTriggerTileRef.current = ''; }, 400);
            }, 400);
            return;
        }
        if (tileId === 'tile_dungeon' && currentMapId === 'test_map_01') {
            lastTriggerTileRef.current = tileKey;
            isTransitioningRef.current = true;
            lastWorldPosRef.current = { x: playerPos.x, y: playerPos.y };
            setFadeState('fade-out');
            setTimeout(() => {
                loadMap(dungeonData as any);
                justSpawnedRef.current = true;
                setFadeState('fade-in');
                setTimeout(() => { setFadeState(''); isTransitioningRef.current = false; lastTriggerTileRef.current = ''; }, 400);
            }, 400);
            return;
        }

        // === Q001: 村人NPC ===
        if (tileId === 'tile_npc_villager') {
            lastTriggerTileRef.current = tileKey;
            if (q001Status === 'not_started') {
                openTalk(dialogs.q001Accept as any);
                acceptQuest('Q001');
            } else if (q001Status === 'ready_to_complete') {
                openTalk(dialogs.q001Complete as any);
                completeQuest('Q001');
            } else if (q001Status === 'completed') {
                openTalk(dialogs.q001Done as any);
            }
            return;
        }

        // === Q001: 薬草（ランダムドロップ） ===
        // 草地・森を踏んだとき30%で薬草発見
        if ((tileId === 'tile_grass' || tileId === 'tile_forest') && q001Status === 'accepted') {
            const dropChance = Math.random();
            if (dropChance < 0.3) { // 30%の確率
                lastTriggerTileRef.current = tileKey;
                console.log('🌿 薬草発見！');
                openTalk([
                    { id: '1', speaker: 'gm', speakerName: '語り手', content: '何か落ちている...' },
                    { id: '2', speaker: 'gm', speakerName: '語り手', content: '薬草を見つけた！' },
                    { id: '3', speaker: 'gm', speakerName: '語り手', content: '【薬草】を手に入れた。' },
                ] as any);
                collectHerb();
                return;
            }
        }

        // === Q002: 村長の家 ===
        if (tileId === 'tile_house_mayor' && currentMapId === 'town_01') {
            lastTriggerTileRef.current = tileKey;
            if (q002Status === 'not_started') {
                openTalk(dialogs.q002Accept as any);
                acceptQuest('Q002');
            } else if (q002Status === 'ready_to_complete') {
                openTalk(dialogs.q002Complete as any);
                completeQuest('Q002');
            } else if (q002Status === 'completed') {
                openTalk(dialogs.q002Done as any);
            }
            return;
        }

        // === Q002: ボス ===
        if (tileId === 'tile_boss' && q002Status === 'accepted') {
            lastTriggerTileRef.current = tileKey;
            openTalk(dialogs.q002Boss as any);
            defeatBoss();
            return;
        }

    }, [playerPos, mapData, isTalkVisible, getTileAt, openTalk, currentMapId, loadMap, q001Status, q002Status, acceptQuest, collectHerb, defeatBoss, completeQuest]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isTalkVisible || isTransitioningRef.current) return;

        // 移動キーが押されたらスポーン直後フラグを解除
        const isMovementKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 'a', 'A', 's', 'S', 'd', 'D'].includes(e.key);
        if (isMovementKey) {
            justSpawnedRef.current = false;
        }

        switch (e.key) {
            case 'ArrowUp': case 'w': case 'W': movePlayer('up'); break;
            case 'ArrowDown': case 's': case 'S': movePlayer('down'); break;
            case 'ArrowLeft': case 'a': case 'A': movePlayer('left'); break;
            case 'ArrowRight': case 'd': case 'D': movePlayer('right'); break;
            case 't': case 'T':
                if (currentMapId === 'test_map_01') loadMap(townData as any);
                else loadMap(testMapData as any);
                lastTriggerTileRef.current = '';
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
                    WASD: Move | Gold: {inventory.gold}G
                    {q001Status !== 'completed' && ' | Q1:薬草'}
                    {q002Status !== 'completed' && ' | Q2:討伐'}
                </p>
            </div>
            <div className="map-container">
                <MapGrid />
            </div>
            {/* フェードオーバーレイ */}
            {fadeState && <div className={`fade-overlay ${fadeState}`} />}
        </div>
    );
}
