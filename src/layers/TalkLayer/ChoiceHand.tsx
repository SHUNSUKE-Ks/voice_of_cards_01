import { ChoiceCard, type Choice } from './ChoiceCard';
import './ChoiceHand.css';

interface ChoiceHandProps {
    choices: Choice[];
    onSelect: (choice: Choice) => void;
    isVisible: boolean;
}

export function ChoiceHand({ choices, onSelect, isVisible }: ChoiceHandProps) {
    if (!isVisible || choices.length === 0) {
        return null;
    }

    return (
        <div className="choice-hand">
            <div className="choice-hand__cards">
                {choices.map((choice, index) => (
                    <ChoiceCard
                        key={choice.id}
                        choice={choice}
                        index={index}
                        totalCards={choices.length}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}
