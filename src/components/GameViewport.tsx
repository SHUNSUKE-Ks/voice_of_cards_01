import { useViewportScale } from '../hooks/useViewportScale';
import './GameViewport.css';

interface GameViewportProps {
    children: React.ReactNode;
}

export function GameViewport({ children }: GameViewportProps) {
    const scale = useViewportScale();

    return (
        <div className="game-viewport-container">
            <div
                className="game-viewport"
                style={{ transform: `scale(${scale})` }}
            >
                {children}
            </div>
        </div>
    );
}
