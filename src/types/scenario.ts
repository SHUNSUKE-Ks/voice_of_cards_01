// シナリオコマンドタイプ
export type ScenarioCommandType =
    | 'text'
    | 'show_card'
    | 'hide_card'
    | 'bg'
    | 'choice'
    | 'jump'
    | 'battle'
    | 'talk'
    | 'event';

// カード位置
export type CardPosition = 'left' | 'center' | 'right' | 'right-top' | 'right-bottom';

// イベントタイプ
export type EventType = 'battle' | 'treasure' | 'quest' | 'info';

// 基本コマンドインターフェース
export interface ScenarioCommand {
    type: ScenarioCommandType;
    [key: string]: any;
}

// テキスト表示
export interface CmdText extends ScenarioCommand {
    type: 'text';
    speaker: string;
    content: string;
}

// カード表示
export interface CmdShowCard extends ScenarioCommand {
    type: 'show_card';
    cardId: string;
    position: CardPosition;
    anim?: string;
}

// カード非表示
export interface CmdHideCard extends ScenarioCommand {
    type: 'hide_card';
    cardId: string;
}

// 背景変更
export interface CmdBg extends ScenarioCommand {
    type: 'bg';
    value: string;
}

// 選択肢
export interface CmdChoice extends ScenarioCommand {
    type: 'choice';
    options: {
        label: string;
        nextScene: string;
        action?: string;
    }[];
}

// シーンジャンプ
export interface CmdJump extends ScenarioCommand {
    type: 'jump';
    nextScene: string;
}

// バトル開始
export interface CmdBattle extends ScenarioCommand {
    type: 'battle';
    enemyId: string;
    nextScene: string;
}

// ===========================================
// TalkLayer統合型
// ===========================================

// TalkLayer形式の選択肢
export interface TalkChoice {
    id: string;
    label: string;
    nextDialogId?: string;
}

// TalkLayer形式のダイアログ
export interface TalkDialog {
    id: string;
    speaker: string;
    speakerName: string;
    content: string;
    highlights?: string[];
    leftCard?: string;
    rightTopCard?: string;
    rightBottomCard?: string;
    animation?: 'enter' | 'shake' | 'fade';
    choices?: TalkChoice[];
}

// Talk コマンド (TalkLayer形式の会話シーケンス)
export interface CmdTalk extends ScenarioCommand {
    type: 'talk';
    dialogs: TalkDialog[];
    nextScene?: string;
}

// Event コマンド (イベントカード表示)
export interface CmdEvent extends ScenarioCommand {
    type: 'event';
    eventType: EventType;
    title: string;
    subtitle?: string;
    icon?: string;
    autoCloseDelay?: number;
}

// ===========================================
// シナリオデータ
// ===========================================

export interface ScenarioData {
    scenarioId: string;
    scenes: {
        [sceneId: string]: ScenarioCommand[];
    };
}
