import { cubicOut } from 'svelte/easing';

export type FlyDirection = 'right' | 'left';

const customFly = (
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = cubicOut,
		x,
		y,
		opacity,
		comingIn
	}: {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
		x?: number | string;
		y?: number | string;
		opacity?: number;
		comingIn?: boolean;
	}
) => {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	const od = target_opacity * (1 - (opacity || 0));

	let xValue: number;
	let xUnit = 'px';
	if (typeof x === 'string') {
		const xMatch = x.match(/([-\d.]+)(\D+)/);
		if (xMatch === null) {
			xValue = 0;
			xUnit = 'px';
		} else {
			xValue = Number(xMatch[1]);
			xUnit = xMatch[2];
		}
	} else {
		xValue = x || 0;
	}

	let yValue: number;
	let yUnit = 'px';
	if (typeof y === 'string') {
		const yMatch = y.match(/([-\d.]+)(\D+)/);
		if (yMatch === null) {
			yValue = 0;
			yUnit = 'px';
		} else {
			yValue = Number(yMatch[1]);
			yUnit = yMatch[2];
		}
	} else {
		yValue = y || 0;
	}

	return {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u};
			position: ${comingIn ? 'absolute' : ''};`
	};
};

export const flyIn = (node: Element, direction: FlyDirection) => {
	return customFly(node, {
		x: direction === 'right' ? 50 : -50,
		duration: 500,
		comingIn: true
	});
};

export const flyOut = (node: Element, direction: FlyDirection) => {
	return customFly(node, {
		x: direction === 'right' ? -50 : 50,
		duration: 500
	});
};
