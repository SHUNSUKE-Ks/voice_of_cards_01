import { useCallback, useRef } from 'react';
import gsap from 'gsap';

// アニメーション設定
const SCATTER_DURATION = 0.8;
const ENTER_DURATION = 0.6;
const STAGGER_DELAY = 0.05;

export function useCityAnimation() {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Phase 1: 散開 - カードが画面外へ飛び散る
    const animateScatter = useCallback((cards: HTMLElement[], onComplete?: () => void) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            onComplete: onComplete,
        });

        tl.to(cards, {
            x: () => gsap.utils.random(-600, 600),
            y: () => gsap.utils.random(-500, 500),
            rotation: () => gsap.utils.random(-180, 180),
            opacity: 0,
            scale: 0.3,
            duration: SCATTER_DURATION,
            ease: 'power2.in',
            stagger: STAGGER_DELAY,
        });

        timelineRef.current = tl;
        return tl;
    }, []);

    // Phase 3: 登場 - 画面外からカードが飛んでくる
    const animateEnter = useCallback((cards: HTMLElement[], onComplete?: () => void) => {
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // 開始位置を画面外にセット
        gsap.set(cards, {
            x: () => gsap.utils.random([-800, 800]),
            y: () => gsap.utils.random([-600, 600]),
            rotation: () => gsap.utils.random(-90, 90),
            opacity: 0,
            scale: 0.3,
        });

        const tl = gsap.timeline({
            onComplete: onComplete,
        });

        tl.to(cards, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: ENTER_DURATION,
            ease: 'back.out(1.7)',
            stagger: {
                each: STAGGER_DELAY * 1.5,
                from: 'random',
            },
        });

        timelineRef.current = tl;
        return tl;
    }, []);

    // Phase 4: 整列 - グリッド配置へアニメーション
    const animateAlign = useCallback((
        cards: HTMLElement[],
        positions: { x: number; y: number }[],
        onComplete?: () => void
    ) => {
        const tl = gsap.timeline({
            onComplete: onComplete,
        });

        cards.forEach((card, i) => {
            const pos = positions[i] || { x: 0, y: 0 };
            tl.to(card, {
                x: pos.x,
                y: pos.y,
                rotation: 0,
                duration: 0.4,
                ease: 'back.out(1.2)',
            }, i * 0.03);
        });

        return tl;
    }, []);

    // カード登場（個別）
    const animateCardEnter = useCallback((card: HTMLElement, delay: number = 0) => {
        gsap.fromTo(card,
            {
                scale: 0,
                rotation: gsap.utils.random(-30, 30),
                opacity: 0,
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.5,
                delay,
                ease: 'back.out(1.7)',
            }
        );
    }, []);

    // ホバーエフェクト
    const animateHover = useCallback((card: HTMLElement, isHover: boolean) => {
        gsap.to(card, {
            scale: isHover ? 1.1 : 1,
            y: isHover ? -10 : 0,
            boxShadow: isHover
                ? '0 20px 40px rgba(0,0,0,0.4)'
                : '0 4px 12px rgba(0,0,0,0.3)',
            duration: 0.2,
            ease: 'power2.out',
        });
    }, []);

    // クリーンアップ
    const killAnimations = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.kill();
            timelineRef.current = null;
        }
    }, []);

    return {
        animateScatter,
        animateEnter,
        animateAlign,
        animateCardEnter,
        animateHover,
        killAnimations,
    };
}
