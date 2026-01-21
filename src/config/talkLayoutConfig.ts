/**
 * TalkLayer レイアウト設定
 * 
 * 位置はパーセント基準 (0-100%)、中央アンカー
 * サイズはピクセル固定
 * 
 * 将来的にアニメーション設定も追加予定
 */

// ===========================================
// カード位置設定
// ===========================================

export interface CardLayoutConfig {
    x: number;          // X位置 (%, 0=左端, 100=右端)
    y: number;          // Y位置 (%, 0=上端, 100=下端)
    rotation: number;   // 回転角度 (deg)
    width: number;      // 幅 (px)
    height: number;     // 高さ (px)
}

// ダイアログカード（中央）
export const DIALOG_CARD: CardLayoutConfig = {
    x: 50,
    y: 42,
    rotation: 0,
    width: 380,
    height: 320,
};

// 左キャラカード
export const LEFT_CARD: CardLayoutConfig = {
    x: 15,
    y: 48,
    rotation: -15,
    width: 280,
    height: 400,
};

// 右上キャラカード
export const RIGHT_TOP_CARD: CardLayoutConfig = {
    x: 82,
    y: 28,
    rotation: 10,
    width: 200,
    height: 300,
};

// 右下キャラカード
export const RIGHT_BOTTOM_CARD: CardLayoutConfig = {
    x: 85,
    y: 65,
    rotation: 5,
    width: 200,
    height: 300,
};

// ===========================================
// アニメーション設定（将来用）
// ===========================================

export interface CardAnimationConfig {
    duration: number;       // 秒
    ease: string;           // GSAP ease
    delay?: number;         // 遅延 (秒)
}

// カード登場アニメーション
export const CARD_ENTER_ANIMATION: CardAnimationConfig = {
    duration: 0.6,
    ease: 'back.out(1.7)',
    delay: 0,
};

// カード退場アニメーション
export const CARD_EXIT_ANIMATION: CardAnimationConfig = {
    duration: 0.4,
    ease: 'power2.in',
    delay: 0,
};

// 話者切替アニメーション
export const SPEAKER_SWITCH_ANIMATION: CardAnimationConfig = {
    duration: 0.3,
    ease: 'power2.out',
    delay: 0,
};

// ===========================================
// 効果音設定
// ===========================================

export const SE_CONFIG = {
    cardEnter: '/assets/se/page_mekuri01.mp3',
    volume: 0.5,
};
