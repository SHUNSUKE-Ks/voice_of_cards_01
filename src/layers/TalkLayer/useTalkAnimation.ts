import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const CARD_SE_PATH = '/assets/se/page_mekuri01.mp3';

export function useTalkAnimation() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Play card sound effect
    const playCardSound = useCallback(() => {
        try {
            if (!audioRef.current) {
                audioRef.current = new Audio(CARD_SE_PATH);
                audioRef.current.volume = 0.5;
            }
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
                // Ignore autoplay errors
            });
        } catch (e) {
            console.warn('Failed to play card sound:', e);
        }
    }, []);

    // Animate card entering from side
    const animateCardEnter = useCallback((
        element: HTMLElement | null,
        position: 'left' | 'right-top' | 'right-bottom',
        withSound: boolean = true
    ) => {
        if (!element) return;

        if (withSound) {
            playCardSound();
        }

        const isLeft = position === 'left';
        const startX = isLeft ? -150 : 150;
        const startRotation = isLeft ? -25 : (position === 'right-top' ? 15 : 10);

        gsap.fromTo(element,
            {
                x: startX,
                y: 100,
                opacity: 0,
                rotation: startRotation,
                scale: 0.7,
            },
            {
                x: 0,
                y: 0,
                opacity: 1,
                rotation: isLeft ? -12 : (position === 'right-top' ? 8 : 5),
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            }
        );
    }, [playCardSound]);

    // Animate card exit
    const animateCardExit = useCallback((
        element: HTMLElement | null,
        position: 'left' | 'right-top' | 'right-bottom'
    ) => {
        if (!element) return;

        const isLeft = position === 'left';
        const endX = isLeft ? -150 : 150;

        gsap.to(element, {
            x: endX,
            y: 80,
            opacity: 0,
            scale: 0.7,
            duration: 0.4,
            ease: 'power2.in',
        });
    }, []);

    // Set card as active speaker
    const setCardActive = useCallback((element: HTMLElement | null, isActive: boolean) => {
        if (!element) return;

        gsap.to(element, {
            scale: isActive ? 1.05 : 0.9,
            filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
            duration: 0.3,
            ease: 'power2.out',
        });
    }, []);

    // Animate dialog card update
    const animateDialogUpdate = useCallback((element: HTMLElement | null) => {
        if (!element) return;

        gsap.fromTo(element,
            { y: 0 },
            {
                y: -15,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            }
        );
    }, []);

    // Animate dialog card entrance
    const animateDialogEnter = useCallback((element: HTMLElement | null) => {
        if (!element) return;

        playCardSound();

        gsap.fromTo(element,
            {
                y: 100,
                opacity: 0,
                scale: 0.8,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.4)',
            }
        );
    }, [playCardSound]);

    return {
        playCardSound,
        animateCardEnter,
        animateCardExit,
        setCardActive,
        animateDialogUpdate,
        animateDialogEnter,
    };
}
