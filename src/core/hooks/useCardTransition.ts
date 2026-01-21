import { useCallback, useRef } from 'react';
import gsap from 'gsap';

/**
 * マップ⇔町 カード遷移アニメーション
 * 
 * - animateMapExit: 現在のカードを画面外へ拡散（ダイナミック版）
 * - animateMapExitSimple: シンプル版（保存用）
 * - animateTownEnter: 新しいカードを画面外から集合
 */
export function useCardTransition() {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Phase 1: Exit - シンプル版（保存用）
     * カードが画面中心から放射状に飛び去る
     */
    const animateMapExitSimple = useCallback((
        cardElements: HTMLElement[],
        onComplete?: () => void
    ) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        tl.to(cardElements, {
            duration: 0.6,
            x: (_i, target) => {
                const rect = target.getBoundingClientRect();
                const centerX = window.innerWidth / 2;
                return rect.left < centerX ? -1000 : 1000;
            },
            y: (_i, target) => {
                const rect = target.getBoundingClientRect();
                const centerY = window.innerHeight / 2;
                return rect.top < centerY ? -1000 : 1000;
            },
            opacity: 0,
            rotation: () => Math.random() * 90 - 45,
            stagger: {
                amount: 0.3,
                grid: 'auto',
                from: 'center',
            },
            ease: 'power2.in',
        });

        timelineRef.current = tl;
        return tl;
    }, []);

    /**
     * Phase 1: Exit - ダイナミック版（強化版）
     * カードがランダムな方向へ激しく飛び散る + 大回転
     */
    const animateMapExit = useCallback((
        cardElements: HTMLElement[],
        onComplete?: () => void
    ) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        // 各カードをランダムな方向へ吹き飛ばす
        tl.to(cardElements, {
            duration: 0.8,
            x: () => (Math.random() - 0.5) * 2400, // ±1200px
            y: () => (Math.random() - 0.5) * 1800, // ±900px  
            rotation: () => (Math.random() - 0.5) * 720, // ±360度 (1~2回転)
            scale: () => Math.random() * 0.5 + 0.2, // 0.2~0.7に縮小
            opacity: 0,
            stagger: {
                amount: 0.4,
                grid: 'auto',
                from: 'random', // ランダムな順序
            },
            ease: 'power3.in', // より急加速
        });

        timelineRef.current = tl;
        return tl;
    }, []);

    /**
     * Phase 2: Enter (集合/配布)
     * カードが画面外からランダムに飛んできて整列
     */
    const animateTownEnter = useCallback((
        cardElements: HTMLElement[],
        onComplete?: () => void
    ) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            },
        });

        // 4方向（上下左右）からランダムに飛んでくる
        tl.from(cardElements, {
            duration: 0.7,
            x: () => {
                const directions = [-1400, 1400, 0, 0];
                return directions[Math.floor(Math.random() * 4)];
            },
            y: () => {
                const directions = [0, 0, -1000, 1000];
                return directions[Math.floor(Math.random() * 4)];
            },
            rotation: () => (Math.random() - 0.5) * 180,
            opacity: 0,
            scale: 1.3,
            stagger: {
                amount: 0.5,
                grid: 'auto',
                from: 'edges', // 端から順に
            },
            ease: 'back.out(1.4)', // カードを叩きつけるような動き
            clearProps: 'all',
        });

        timelineRef.current = tl;
        return tl;
    }, []);

    /**
     * 全体をシーケンス実行（Exit → 切替 → Enter）
     */
    const executeTransition = useCallback((
        exitCards: HTMLElement[],
        enterCards: HTMLElement[],
        onExitComplete: () => void,
        onEnterComplete?: () => void
    ) => {
        animateMapExit(exitCards, () => {
            onExitComplete();
            setTimeout(() => {
                animateTownEnter(enterCards, onEnterComplete);
            }, 50);
        });
    }, [animateMapExit, animateTownEnter]);

    /**
     * クリーンアップ
     */
    const killTransition = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }
    }, []);

    return {
        animateMapExit,
        animateMapExitSimple, // 保存版
        animateTownEnter,
        executeTransition,
        killTransition,
    };
}
