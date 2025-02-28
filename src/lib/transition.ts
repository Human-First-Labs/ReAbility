import { fly } from 'svelte/transition';

export type FlyDirection = 'right' | 'left';

export const flyIn = (node: Element, direction: FlyDirection) => {
	return fly(node, {
		x: direction === 'right' ? 50 : -50,
		duration: 500
	});
};

export const flyOut = (node: Element, direction: FlyDirection) => {
	return fly(node, {
		x: direction === 'right' ? -50 : 50,
		duration: 500
	});
};
