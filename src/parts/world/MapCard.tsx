import { motion } from 'framer-motion';
import './MapCard.css';

interface MapCardProps {
    terrainCardId: string;
    isRevealed: boolean;
    isTraversable: boolean;
}

const TERRAIN_COLORS: Record<string, string> = {
    tile_grass: '#4a7c23',
    tile_forest: '#2d5016',
    tile_water: '#1e5c8a',
    tile_road: '#8b7355',
    tile_town: '#c4a35a',
    tile_mountain: '#6b6b6b',
};

export function MapCard({ terrainCardId, isRevealed, isTraversable }: MapCardProps) {
    const bgColor = TERRAIN_COLORS[terrainCardId] || '#666';

    return (
        <div className="map-card-container">
            <motion.div
                className="map-card"
                initial={false}
                animate={{ rotateY: isRevealed ? 0 : 180 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front (Terrain) */}
                <div
                    className="map-card-face map-card-front"
                    style={{ backgroundColor: bgColor }}
                >
                    <span className="terrain-label">
                        {terrainCardId.replace('tile_', '').charAt(0).toUpperCase()}
                    </span>
                    {!isTraversable && <div className="blocked-overlay">✕</div>}
                </div>

                {/* Back (Fog) */}
                <div className="map-card-face map-card-back">
                    <div className="card-pattern">?</div>
                </div>
            </motion.div>
        </div>
    );
}
