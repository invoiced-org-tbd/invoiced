import type { Transition, Variants } from 'framer-motion';

const easeOut: Transition['ease'] = 'easeOut';

export const landingTransition: Transition = {
	duration: 0.3,
	ease: easeOut,
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const staggerContainer = (stagger = 0.08): Variants => ({
	hidden: {},
	visible: {
		transition: { staggerChildren: stagger, delayChildren: 0.05 },
	},
});

export const staggerItem: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.98 },
	visible: { opacity: 1, scale: 1 },
};

export const getMotionProps = (prefersReducedMotion: boolean) => ({
	initial: prefersReducedMotion ? false : ('hidden' as const),
	animate: prefersReducedMotion ? undefined : ('visible' as const),
	whileInView: prefersReducedMotion ? undefined : ('visible' as const),
	viewport: prefersReducedMotion
		? undefined
		: { once: true, margin: '-80px' as const },
	transition: prefersReducedMotion ? { duration: 0 } : landingTransition,
});
