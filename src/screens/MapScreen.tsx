import { useEffect, useCallback } from 'react';
import { useMapStore } from '../core/stores/useMapStore';
import { MapGrid } from '../parts/world/MapGrid';
import testMapData from '../data/world/test_map.json';
import './MapScreen.css';

export function MapScreen() {
    const { loadMap, movePlayer, mapData } = useMapStore();

    // Load map on mount
    useEffect(() => {
        loadMap(testMapData as any);
    }, [loadMap]);

    // Keyboard controls
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
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
        }
    }, [movePlayer]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="map-screen">
            <div className="map-header">
                <h2 className="map-title">{mapData?.name || 'Map'}</h2>
                <p className="map-hint">Use Arrow Keys or WASD to move</p>
            </div>
            <div className="map-container">
                <MapGrid />
            </div>
        </div>
    );
}
