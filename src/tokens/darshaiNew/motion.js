/**
 * DARSHAI Motion & Interaction System Tokens
 *
 * Six-Layer Motion Architecture:
 * - L1: Micro (120–180ms) — immediate feedback on buttons, checkboxes, toggles
 * - L2: Component (160–220ms) — buttons, cards, tabs, accordions
 * - L3: Section Reveal (400–600ms) — fade + 24px slide on section entry
 * - L4: Scroll Choreography (scroll-driven) — pinned scenes, media transforms tied to scroll progress
 * - L5: Cinematic Scene (600–1000ms) — hero/flagship visual moments
 * - L6: Page Transition (200–350ms) — cross-page navigation fade/scale
 *
 * Easing rules:
 * - Entrance: cubic-bezier(0.22, 1, 0.36, 1) — Apple's easing
 * - Control: ease-out (faster release)
 * - Scroll-driven: linear or ease (consistent with scroll position)
 */
export const MOTION = {
    layers: {
        L1_MICRO: {
            name: "Micro",
            duration: 150,
            minDuration: 120,
            maxDuration: 180,
            description: "Immediate feedback on buttons, checkboxes, toggles",
        },
        L2_COMPONENT: {
            name: "Component",
            duration: 200,
            minDuration: 160,
            maxDuration: 220,
            description: "Buttons, cards, tabs, accordions",
        },
        L3_SECTION_REVEAL: {
            name: "Section Reveal",
            duration: 500,
            minDuration: 400,
            maxDuration: 600,
            description: "Fade + 24px slide on section entry",
        },
        L4_SCROLL_CHOREOGRAPHY: {
            name: "Scroll Choreography",
            description: "Pinned scenes, media transforms tied to scroll progress (0 → 1)",
        },
        L5_CINEMATIC_SCENE: {
            name: "Cinematic Scene",
            duration: 850,
            minDuration: 600,
            maxDuration: 1000,
            description: "Hero/flagship visual moments",
        },
        L6_PAGE_TRANSITION: {
            name: "Page Transition",
            duration: 280,
            minDuration: 200,
            maxDuration: 350,
            description: "Cross-page navigation fade/scale",
        },
    },
    duration: {
        micro: 150, // 120–180ms
        microMin: 120,
        microMax: 180,
        button: 180, // 160–220ms
        component: 200, // 160–220ms
        hover: 260, // 220–320ms
        tab: 260, // 220–320ms
        accordion: 300, // 250–350ms
        reveal: 500, // 400–600ms
        textReveal: 500, // 450–650ms
        imageReveal: 750, // 600–900ms
        heroEntrance: 850, // 700–1000ms
        cinematic: 850, // 600–1000ms
        cinematicMedia: 700, // 500–900ms
        page: 280, // 200–350ms
        staggerGap: 60, // 40–80ms
    },
    durationSeconds: {
        micro: 0.15,
        button: 0.18,
        component: 0.2,
        hover: 0.26,
        tab: 0.26,
        accordion: 0.3,
        reveal: 0.5,
        textReveal: 0.5,
        imageReveal: 0.75,
        heroEntrance: 0.85,
        cinematic: 0.85,
        cinematicMedia: 0.7,
        page: 0.28,
        staggerGap: 0.06,
    },
    easing: {
        // Apple entrance easing
        entrance: [0.22, 1, 0.36, 1],
        entranceCss: "cubic-bezier(0.22, 1, 0.36, 1)",
        // Faster release for controls & buttons
        control: "easeOut",
        controlCss: "ease-out",
        // Scroll driven
        scroll: "linear",
        scrollEase: "easeOut",
    },
    distance: {
        sectionSlideY: 24, // px
        textSlideY: 24, // px
        cardHoverY: -4, // px
        scaleExit: 0.98,
        scaleEntrance: 0.98,
        mediaHeroEntranceScale: 1.04,
    },
    scroll: {
        stickyStoryMinHeight: "120vh",
        stickyStoryDefaultHeight: "160vh",
        stickyStoryMaxHeight: "220vh",
        flagshipCinematicMinHeight: "180vh",
        flagshipCinematicDefaultHeight: "240vh",
        flagshipCinematicMaxHeight: "320vh",
        progressIndicatorThickness: 3, // px
    },
    cssTransition: {
        micro: "all 150ms ease-out",
        button: "all 180ms ease-out",
        component: "all 200ms ease-out",
        hover: "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        tab: "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        accordion: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        reveal: "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        page: "opacity 280ms ease-out, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
    },
};
export default MOTION;
