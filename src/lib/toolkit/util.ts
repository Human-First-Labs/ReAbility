export const clickOutside = (element: Node, callbackFunction: () => void) => {
	const onClick: (this: HTMLElement, ev: MouseEvent) => unknown = (event) => {
		if (!element.contains(event.target as Node)) {
			callbackFunction();
		}
	};

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: () => void) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
};
