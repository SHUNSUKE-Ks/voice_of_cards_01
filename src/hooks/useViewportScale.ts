import { useState, useEffect, useCallback } from 'react';

const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;

export function useViewportScale() {
    const [scale, setScale] = useState(1);

    const calculateScale = useCallback(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate the scale to fit the game viewport in the window
        const scaleX = windowWidth / GAME_WIDTH;
        const scaleY = windowHeight / GAME_HEIGHT;

        // Use the smaller scale to maintain aspect ratio
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
    }, []);

    useEffect(() => {
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, [calculateScale]);

    return scale;
}
