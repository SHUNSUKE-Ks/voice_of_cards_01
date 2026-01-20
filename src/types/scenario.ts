export type ScenarioCommandType =
    | 'text'
    | 'show_card'
    | 'hide_card'
    | 'bg'
    | 'choice'
    | 'jump'
    | 'battle';

export interface ScenarioCommand {
    type: ScenarioCommandType;
    [key: string]: any;
}

export interface CmdText extends ScenarioCommand {
    type: 'text';
    speaker: string;
    content: string;
}

export interface CmdShowCard extends ScenarioCommand {
    type: 'show_card';
    cardId: string;
    position: 'left' | 'center' | 'right';
    anim?: string;
}

export interface CmdHideCard extends ScenarioCommand {
    type: 'hide_card';
    cardId: string;
}

export interface CmdBg extends ScenarioCommand {
    type: 'bg';
    value: string;
}

export interface CmdChoice extends ScenarioCommand {
    type: 'choice';
    options: {
        label: string;
        nextScene: string;
        action?: string; // For flags etc
    }[];
}

export interface CmdJump extends ScenarioCommand {
    type: 'jump';
    nextScene: string;
}

export interface CmdBattle extends ScenarioCommand {
    type: 'battle';
    enemyId: string;
    nextScene: string;
}

export interface ScenarioData {
    scenarioId: string;
    scenes: {
        [sceneId: string]: ScenarioCommand[];
    };
}
