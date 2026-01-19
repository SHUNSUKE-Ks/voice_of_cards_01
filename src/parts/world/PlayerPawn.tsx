import { motion } from 'framer-motion';
import './PlayerPawn.css';

export function PlayerPawn() {
    return (
        <motion.div
            className="player-pawn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="pawn-body">
                <div className="pawn-head" />
                <div className="pawn-base" />
            </div>
        </motion.div>
    );
}
